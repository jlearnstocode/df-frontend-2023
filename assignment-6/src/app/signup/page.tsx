'use client';

import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Phudu } from 'next/font/google';
import { ThreeCircles } from 'react-loader-spinner';
import { useAuth } from '../../context/AuthContext';
import { SignupRequest } from '../../@types/auth';

const phudu = Phudu({ subsets: ['vietnamese'], weight: '700' });

const SignupSchema = z
  .object({
    fullName: z.string().min(3, 'Name must longer than 3 character(s)'),
    email: z.string().email('Email is not valid!'),
    password: z.string().min(8, 'Email must longer than 8 character(s)'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

type SignupSchemaType = z.infer<typeof SignupSchema>;

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = async (
    data: SignupRequest,
  ) => {
    const info = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      avatar: data.avatar ?? '',
    };

    try {
      await signup(info);
      router.push(`/login`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="text-center bg-gray-200 border-2 border-solid border-gray-300 rounded h-full m-auto w-96 px-5 py-10 ">
      <h1 className={`${phudu.className} text-red-800 text-3xl mb-6 font-bold`}>
        Bookstore
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="fullName" className="flex items-baseline flex-col mb-4">
          <p className="font-semibold">Full Name (*)</p>
          <input
            disabled={isSubmitting}
            type="fullName"
            className="mt-1 w-full"
            placeholder="Enter your full name..."
            {...register('fullName')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.fullName && <span>{errors.fullName.message}</span>}
          </span>
        </label>

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

        <label
          htmlFor="confirmPassword"
          className="flex items-baseline flex-col mb-4"
        >
          <p className="font-semibold">Confirm Password (*)</p>

          <input
            disabled={isSubmitting}
            type="password"
            className="mt-1 w-full"
            placeholder="Enter your password..."
            {...register('confirmPassword')}
          />
          <span className="text-red-500 text-xs font-semibold h-3 mt-2">
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </span>
        </label>

        <div className="pt-5 flex justify-evenly">
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
              Sign up
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
