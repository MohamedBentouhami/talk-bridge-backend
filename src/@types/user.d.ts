import { Languages } from "./languages.enum";

export type UserCreationData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birth_date: string;
    native_language: Languages;
    learning_language: Languages;
    bio: string;
}