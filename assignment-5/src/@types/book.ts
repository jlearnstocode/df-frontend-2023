export interface BookType {
  id: number;
  name: string;
  author: string;
  topic: string;
}

export interface BookInitialStateType {
  state: { bookData: BookType[] };
  searchBook: (text: string) => void;
  deleteBook: (id: number) => void;
  addBook: (book: BookType) => void;
  editBook: (book: BookType) => void;
}
