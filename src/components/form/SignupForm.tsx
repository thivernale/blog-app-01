import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { authService, UserRegistration } from '../../appwrite/auth';
import { Input } from '../Input';
import { Button } from '../Button';
import { login } from '../../store/authSlice';
import { Logo } from '../Logo';
import { useState } from 'react';

export function SignupForm() {
  const dispatch = useDispatch<Dispatch<ReturnType<typeof login>>>();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserRegistration>({});
  const [error, setError] = useState('');

  const submit: SubmitHandler<UserRegistration> = async (data) => {
    setError('');
    try {
      if (await authService.createAccount({ ...data })) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate(`/`);
        }
      }
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-lg border border-black/10 bg-gray-100 p-10 dark:bg-gray-600">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl leading-tight font-bold">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base">
          Already have an account?{' '}
          <Link
            to={'/login'}
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="">
            <Input
              label="Full Name"
              placeholder="Full Name"
              className="mb-4"
              {...register('name', { required: true })}
            />
            <Input
              label="Email Address"
              placeholder="Email Address"
              type="email"
              className="mb-4"
              {...register('email', { required: true })}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              className="mb-4"
              {...register('password', { required: true })}
            />
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
