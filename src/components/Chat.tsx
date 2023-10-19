import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { Send } from "@mui/icons-material";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { FC, useEffect, useRef, useState } from "react";
import { db, storage } from "../firebase";
import { getCurrentTime } from "../utils";
import { useAuth } from "./hooks/useAuth";
import { IMessage } from "../types";

const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false); // Добавлено состояние для отслеживания загрузки
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray); // Устанавливаем выбранные файлы в состояние
    }
  };

  const addPostHandler = async () => {
    console.log("ok");

    try {
      if (selectedFiles.length === 0) {
        const docRef = await addDoc(collection(db, "messages"), {
          author: user,
          date: getCurrentTime(),
          text: message,
          images: [],
        });
      } else {
        setUploading(true); // Начало загрузки
        const promises = selectedFiles.map(async (file) => {
          const storageRef = ref(storage, `messages/${user?.id}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const downloadURLs = await Promise.all(promises);
        console.log(downloadURLs);

        const docRef = await addDoc(collection(db, "messages"), {
          author: user,
          date: getCurrentTime(),
          text: message,
          images: downloadURLs,
        });
        setUploading(false); // Загрузка завершена
      }
    } catch (error: any) {
      error.message && setError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = await getDocs(collection(db, "messages"));

      query.forEach((doc: any) => {
        setMessages((prev) => [doc.data(), ...prev]);
      });
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: "60vh", overflowY: "scroll" }}>
            {/* Список сообщений */}
            <div>
              {messages.map((message) => (
                <>
                  <Button onClick={() => {}} sx={{ color: "black" }}>
                    <Avatar src={message.author.avatar}></Avatar>
                    <Typography variant="h6" sx={{ ml: 4 }}>
                      {message.author.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 2 }}>
                      {message.date}
                    </Typography>
                  </Button>
                  <Typography variant="subtitle1">{message.text}</Typography>
                </>
              ))}
            </div>
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Напишите сообщение"
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  fullWidth
                  onClick={() => {
                    addPostHandler();
                    setMessage("");
                  }}
                >
                  Отправить
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: "60vh", overflowY: "scroll" }}>
          
            <div>
              <div>Имя пользователя</div>
              <div>Имя пользователя</div>
            
            </div>
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Chat;
