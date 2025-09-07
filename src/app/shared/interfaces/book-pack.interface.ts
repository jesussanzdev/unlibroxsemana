import { Book } from "./book.interface";

export interface BookPack {
  id: string;
  title: string;
  image?: string;
  shortDescription: string;
  description: string;
  books: Book[];
}