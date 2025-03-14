import { useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { logOut as logOutServerFn } from '@/utils/api/auth';
import { Button } from '@ui';

export const Header = () => {
  const router = useRouter();
  const logOutFn = useServerFn(logOutServerFn);

  const logOut = async () => {
    await logOutFn();
    router.invalidate();
  };

  return (
    <div className="flex">
      <Button className="ml-auto" onClick={logOut}>
        Log out
      </Button>
    </div>
  );
};
