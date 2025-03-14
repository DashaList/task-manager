import { FC } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { signIn as signInServerFn } from '@/utils/api/auth';

export const SignIn: FC = () => {
  const signIn = useServerFn(signInServerFn);

  return (
    <div className="max-w-2xl mx-auto p-8 pt-16">
      <h1 className="text-[32px] font-bold text-gray-900 mb-20">Sign In</h1>
      <GoogleAuthButton onClick={signIn} />
    </div>
  );
};
