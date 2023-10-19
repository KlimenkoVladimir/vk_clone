import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { FC, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useAuth } from "./hooks/useAuth";
import { getCurrentTime } from "../utils";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { updateProfile } from "firebase/auth";

// interface SetPostsProps {
//   setPosts: TypeSetState<IPost[]>;
// }

const AddPost: FC = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [textContent, setTextContent] = useState("");
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
        const docRef = await addDoc(collection(db, "posts"), {
          author: user,
          date: getCurrentTime(),
          text: textContent,
          images: [],
        });
      } else {
        setUploading(true); // Начало загрузки
        const promises = selectedFiles.map(async (file) => {
          const storageRef = ref(storage, `posts/${user?.id}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        });

        const downloadURLs = await Promise.all(promises);
        console.log(downloadURLs);

        const docRef = await addDoc(collection(db, "posts"), {
          author: user,
          date: getCurrentTime(),
          text: textContent,
          images: downloadURLs,
        });
        setUploading(false); // Загрузка завершена
      }
    } catch (error: any) {
      error.message && setError(error.message);
    }

    // setPosts((prev) => [
    //   {
    //     author: {
    //       id: "1",
    //       name: "Vladimir",
    //       email: "facke@email",
    //       avatar:
    //         "https://parfum-asmodeus.ru/wp-content/uploads/a/1/7/a179b5d0cee30059a54aad7fe3c892ca.jpeg",
    //     },
    //     data: "5 минут назад",
    //     text: textContent,
    //     images: [],
    //   },

    //   ...prev,
    // ]);
  };
  return (
    <Box sx={{ mx: 10, bgcolor: "white", borderRadius: "5px" }}>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        onClick={() => setIsInputActive(true)}
        onChange={(e) => setTextContent(e.target.value)}
        value={textContent}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addPostHandler();
            setTextContent("");
            setIsInputActive(false);
          }
        }}
        // onBlur={() => {
        //   setTimeout(() => {
        //     setIsInputActive(false);
        //   }, 200);
        // }}
        fullWidth
        label="Что у вас нового?"
        id="fullWidth"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isInputActive && (
                <>
                  <label htmlFor="avatar-input">
                    <input
                      id="avatar-input"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </label>

                  <Button
                    onClick={() => {
                      addPostHandler();
                      setTextContent("");
                      // setIsInputActive(false);
                    }}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Опубликовать
                  </Button>
                </>
              )}
            </InputAdornment>
          ),
        }}
      />
      {uploading && <LinearProgress sx={{ mt: 2 }} />}{" "}
      {/* Индикатор загрузки */}
    </Box>
  );
};

export default AddPost;
