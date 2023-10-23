import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { Send } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { FC, useEffect, useRef, useState } from "react";
import { db, storage } from "../firebase";
import { IMessage } from "../types";
import { getCurrentTime } from "../utils";
import { useAuth } from "./hooks/useAuth";

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
      const q = query(collection(db, "messages"), orderBy("date"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setMessages((prev: any) => [...prev, change.doc.data()]);
          }
        });
      });

      return () => unsubscribe(); // Отписка при размонтировании компонента
    };

    fetchData();
  }, []);

  return (
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
    </Grid>
  );
};

export default Chat;
