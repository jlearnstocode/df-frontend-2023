import { z } from 'zod';
import useSWR, { mutate } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookType } from '../@types/book';
import { useBook } from '../context/BookContext';
import { ModalFooter } from './ModalFooter';
import client from '../lib/api';
import { delay } from '../lib/helper';

const BookSchema = z.object({
  name: z.string().min(5, 'Name must contain at least 5 character(s)'),
  author: z
    .string()
    .min(5, 'Author must contain at least 5 character(s)')
    .regex(/^[A-Za-z ]+$/, 'Author must only contain letters and spaces'),
  topicId: z.string().min(1, 'Please choose a topic'),
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
  const { data } = useSWR('get-topics', () => client.getTopics(), {
    revalidateOnFocus: false,
  });

  const bookTopicList = data?.data;

  const defaultValues = useMemo(() => {
    let value = {
      name: '',
      author: '',
      topicId: '',
    };

    if (selectedBook?.topic && mode === 'EDIT_BOOK') {
      value = {
        ...value,
        ...selectedBook,
        topicId: selectedBook?.topic?.id.toString(),
      };
    }

    return value;
  }, [mode, selectedBook]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookSchemaType>({
    defaultValues,
    resolver: zodResolver(BookSchema),
  });

  const { editBook, addBook } = useBook();

  const onSubmit: SubmitHandler<BookSchemaType> = (data: {
    name: string;
    author: string;
    topicId: string;
  }) => {
    if (mode === 'ADD_BOOK') {
      addBook({ ...data, topicId: Number(data.topicId) });
    }

    if (selectedBook && mode === 'EDIT_BOOK') {
      editBook({
        ...data,
        id: selectedBook?.id,
        topicId: Number(data.topicId),
      });
    }
    setIsShowModal(false);
    reset({ name: '', author: '', topicId: '' });

    delay(100).then(() => {
      mutate('get-books');
    });
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
        <label htmlFor="topicId" className="flex items-baseline flex-col mb-4">
          Topic
          <select
            disabled={isSubmitting}
            className="mt-1 w-full"
            {...register('topicId')}
          >
            {bookTopicList?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.topicId && <span>{errors.topicId.message}</span>}
          </span>
        </label>
      </div>

      <ModalFooter
        disabled={Boolean(isSubmitting)}
        actionText={mode === 'EDIT_BOOK' ? 'Update' : 'Add'}
        buttonType="submit"
        setIsShowModal={setIsShowModal}
      />
    </form>
  );
}
