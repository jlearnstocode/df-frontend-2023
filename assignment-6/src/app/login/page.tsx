'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { LoginRequest } from '../../@types/auth';
import { useAuth } from '../../context/AuthContext';
import { ThreeCircles } from 'react-loader-spinner';

const LoginSchema = z.object({
  email: z.string().email('Email is not valid!'),
  password: z.string().min(8, 'Email must longer than 8 character(s)'),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const { login, getme } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (
    data: LoginRequest,
  ) => {
    const info = {
      email: data.email,
      password: data.password,
    };

    try {
      await login(info);
      await getme();
      router.push(`/`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="text-center bg-gray-200 border-2 border-solid border-gray-300 rounded h-full m-auto w-96 px-5 py-10 ">
      <h1 className="text-red-500 text-3xl mb-6 font-bold">Bookstore</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="email" className="flex items-baseline flex-col mb-4">
          <p className="font-semibold">Email (*)</p>
          <input
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            type="password"
            className="mt-1 w-full"
            placeholder="Enter your password..."
            {...register('password')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.password && <span>{errors.password.message}</span>}
          </span>
        </label>

        <div className="pb-5 flex justify-evenly">
          {isSubmitting ? (
            <button
              disabled
              type="submit"
              className="bg-red-400 w-full flex items-center justify-center"
            >
              <ThreeCircles
                height="22"
                width="22"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </button>
          ) : (
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-300 w-full"
            >
              Login
            </button>
          )}
        </div>

        <div className="w-full flex justify-center items-center">
          <a href="/signup" className="underline">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
