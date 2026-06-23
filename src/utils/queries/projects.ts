import { getUserProjects } from '../api/projects';
import { queryOptions } from '@tanstack/react-query';

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ['projects'],
    queryFn: () => getUserProjects(),
  });
