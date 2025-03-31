import { z } from "zod";
import { UserCreationData } from "../@types/user";
import { Languages } from "../@types/languages.enum";

export const userCreationValidation: z.ZodType<UserCreationData> = z.object({
    first_name: z
        .string({
            required_error: "First name is required"
        })
        .max(50, "The length must be maximum 50")
        .trim(),
    last_name: z.string({
        required_error: "Last name is required"
    })
        .max(50, "The length must be maximum 50")
        .trim(),
    email: z.string({
        required_error: "Email is required"
    })
        .email('Email format invalid')
        .trim(),
    password: z.string({
        required_error: "password is required"
    })
        // TODO validation password
        .trim(),
    birth_date: z.string({
        required_error: "birthday is required"

    })
        .date("Invalid format of date"),
    native_language: z.nativeEnum(Languages),
    learning_language: z.nativeEnum(Languages),
    bio: z.string({
        required_error: "birthday is required"

    }),
})