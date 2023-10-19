import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface IPost {
  author: IUser;
  date: string;
  text?: string;
  hashtags?: string[];
  images: string[];
}

export interface IMessage {
  author: IUser;
  date: string;
  text?: string;
  images: string[];
}

export interface ISideBar {
  title: string;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

export interface Icols {
  columns: number;
  index: number[];
}
