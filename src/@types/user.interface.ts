import { Languages } from "./languages.enum";

export interface IUser {
    _id: string
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthday: string;
    native_language: Languages;
    learning_language: Languages;
    bio: string;
    profile_pict: string;
    createdAt?: Date;
    updatedAt?: Date;
  }