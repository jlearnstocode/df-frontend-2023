'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  email: z.string().email('Email is not valid!'),
  password: z.string().min(8, 'Email must longer than 8 character(s)'),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="text-center bg-gray-200 border-2 border-solid border-gray-300 rounded h-full m-auto w-96 px-5 py-10 ">
      <h1 className="text-red-500 text-3xl mb-6 font-bold">Bookstore</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="email" className="flex items-baseline flex-col mb-4">
          <p className="font-semibold">Email (*)</p>
          <input
            type="email"
            className="mt-1 w-full"
            placeholder="Enter your email..."
            {...register('email')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.email && <span>{errors.email.message}</span>}
          </span>
        </label>

        <label htmlFor="password" className="flex items-baseline flex-col mb-4">
          <p className="font-semibold">Password (*)</p>

          <input
            type="password"
            className="mt-1 w-full"
            placeholder="Enter your password..."
            {...register('password')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.password && <span>{errors.password.message}</span>}
          </span>
        </label>

        <div className="pt-5 flex justify-evenly">
          <button type="submit" className="bg-red-400 hover:bg-red-300 w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
