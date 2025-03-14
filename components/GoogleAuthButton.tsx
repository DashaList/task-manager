import { FC } from 'react';
import { GoogleIcon } from '@/assets/icons';

interface GoogleAuthButtonProps {
  onClick: () => void;
}

export const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-center gap-3 rounded-[4px] border border-gray-300 bg-white px-4 py-2.5 text-[14px] font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
  >
    <GoogleIcon />
    Continue with Google
  </button>
);
