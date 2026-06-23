import { getProfile } from '../api/profile';
import { queryOptions } from '@tanstack/react-query';

export const profileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
