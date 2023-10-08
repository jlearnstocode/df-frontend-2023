import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BookType } from '../@types/book';

interface AddBookFormProps {
  setNewBook: Dispatch<SetStateAction<BookType>>;
}

export function AddBookForm({ setNewBook }: AddBookFormProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const key = event.target.getAttribute('id')?.toString();
    const { value } = event.target;

    if (!key) return;

    setNewBook((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div>
        <label htmlFor="name" className="flex items-baseline flex-col mb-4">
          Name
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1"
            placeholder="book name..."
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="author" className="flex items-baseline flex-col mb-4">
          Author
          <input
            type="text"
            id="author"
            name="author"
            required
            className="mt-1"
            placeholder="book author..."
            onChange={(event) => handleChange(event)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="topic" className="flex items-baseline flex-col mb-4">
          Topic
          <select
            name="topic"
            id="topic"
            required
            className="mt-1 w-full"
            onChange={(event) => handleChange(event)}
          >
            <option value="Code refactoring">Code refactoring</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
          </select>
        </label>
      </div>
    </>
  );
}
