import { Request } from "express";
import { UserCreationData } from "./user";

declare module "express" {
  export interface Request {
    user?: UserCreationData; 
  }
}
