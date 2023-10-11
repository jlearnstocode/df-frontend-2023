import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookType } from '../@types/book';
import { useBook, useBookState } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';

const BookSchema = z.object({
  name: z.string().min(5, 'Name must contain at least 5 character(s)'),
  author: z
    .string()
    .min(5, 'Author must contain at least 5 character(s)')
    .regex(/^[A-Za-z ]+$/, 'Author must only contain letters and spaces'),
  topic: z.string(),
});

type BookSchemaType = z.infer<typeof BookSchema>;

interface BookFormProps {
  mode: string;
  selectedBook?: BookType;
  setIsShowModal: (v: boolean) => void;

}

export function BookForm({
  mode,
  selectedBook,
  setIsShowModal,
}: BookFormProps) {
  const { bookData } = useBookState();

  const bookTopicList = useMemo(() => bookData.map((i) => i.topic), [bookData]);
  const newId = useMemo(() => (bookData?.length || 0) + 1, [bookData]);

  const defaultValues = useMemo(() => {
    let value = {
      name: '',
      author: '',
      topic: 'Code refactoring',
    } as BookType;

    if (mode === 'EDIT_BOOK') {
      value = { ...value, ...selectedBook };
    }

    return value;
  }, [mode, selectedBook]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookSchemaType>({
    defaultValues,
    resolver: zodResolver(BookSchema),
  });

  const { editBook, addBook } = useBook();

  const onSubmit: SubmitHandler<BookSchemaType> = (data) => {
    if (mode === 'EDIT_BOOK') {
      editBook({ ...data, id: selectedBook?.id || 0 });
    }
    if (mode === 'ADD_BOOK') {
      addBook({ ...data, id: newId });
    }
    setIsShowModal(false);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <label htmlFor="name" className="flex items-baseline flex-col mb-4">
          Name
          <input
            type="text"
            className="mt-1"
            placeholder="book name..."
            {...register('name')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.name && <span>{errors.name.message}</span>}
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="author" className="flex items-baseline flex-col mb-4">
          Author
          <input
            type="text"
            className="mt-1"
            placeholder="book author..."
            {...register('author')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.author && <span>{errors.author.message}</span>}
          </span>
        </label>
      </div>

      <div>
        <label htmlFor="topic" className="flex items-baseline flex-col mb-4">
          Topic
          <select className="mt-1 w-full" {...register('topic')}>
            {bookTopicList?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.topic && <span>{errors.topic.message}</span>}
          </span>
        </label>
      </div>
      
      <ModalFooter
        actionText={mode === 'EDIT_BOOK' ? 'Update' : 'Add'}
        buttonType="submit"
        setIsShowModal={setIsShowModal}
      />
    </form>
  );
}
