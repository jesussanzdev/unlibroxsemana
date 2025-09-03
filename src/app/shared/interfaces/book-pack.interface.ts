import { Book } from "./book.interface";

export interface BookPack {
  id: string;
  title: string;
  description: string;
  books: Book[];
}