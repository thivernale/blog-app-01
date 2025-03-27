import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authService, UserCredentials } from '../../appwrite/auth';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';
import { Input } from '../Input';
import { Button } from '../Button';
import { Logo } from '../Logo';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserCredentials>({});
  const [error, setError] = useState('');

  const submit: SubmitHandler<UserCredentials> = async (data) => {
    setError('');
    try {
      if (await authService.login(data)) {
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
            <Logo width="100px" />
          </span>
        </div>
        <h2 className="text-center text-2xl leading-tight font-bold">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base">
          Don&#39;t have an account?{' '}
          <Link
            to={'/signup'}
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(submit)} className="mt-8">
          <div className="">
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
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
