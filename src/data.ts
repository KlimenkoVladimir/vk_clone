import * as Icons from "@mui/icons-material";
import { IPost, ISideBar, Icols } from "./types";

export const sideBar: ISideBar[] = [
  {
    title: "Моя страница",
    link: "/",
    icon: Icons.Home,
  },
  {
    title: "Новости",
    link: "/news",
    icon: Icons.Newspaper,
  },
  {
    title: "Сообщения",
    link: "/messages",
    icon: Icons.Email,
  },
  {
    title: "Друзья",
    link: "/friends",
    icon: Icons.Person,
  },

  {
    title: "Сообщества",
    link: "/messages",
    icon: Icons.People,
  },
  {
    title: "Фотографии",
    link: "/",
    icon: Icons.Photo,
  },
  {
    title: "Музыка",
    link: "/",
    icon: Icons.LibraryMusic,
  },
];

export const firstPost: IPost = {
  author: {
    id: "1",
    name: "Vladimir",
    email: "facke@email",
    avatar:
      "https://parfum-asmodeus.ru/wp-content/uploads/a/1/7/a179b5d0cee30059a54aad7fe3c892ca.jpeg",
  },
  data: "5 минут назад",
  text: "Это первый пост в приложении. Он про Японию",
  hashtags: ["#react", "#frontend"],
  images: [
    "https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663432147_8-mykaleidoscope-ru-p-dostoprimechatelnosti-yaponii-fudziyama-pi-8.jpg",
    "https://webpulse.imgsmail.ru/imgpreview?mb=webpulse&key=pulse_cabinet-image-cc1b1357-a8ce-494b-b57a-e0e3ecceecad",
    "https://i.mycdn.me/i?r=AzEPZsRbOZEKgBhR0XGMT1RkmZEXkMbapSVAlF74OQB1ZqaKTM5SRkZCeTgDn6uOyic",
  ],
};

export const cols: Icols[] = [
  { columns: 1, index: [1] },
  { columns: 2, index: [1, 1] },
  { columns: 2, index: [2, 1, 1] },
  { columns: 2, index: [1, 1, 1, 1] },
  { columns: 3, index: [2, 1, 1, 1, 1] },
  { columns: 6, index: [1, 1, 1, 1, 1, 1] },
  { columns: 7, index: [3, 1, 1, 1, 1, 1, 1] },
  { columns: 8, index: [2, 1, 1, 1, 1, 1, 1, 1] },
  { columns: 9, index: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
];
