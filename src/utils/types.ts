import { QueryClient } from '@tanstack/react-query';

export interface RouterContext {
  queryClient: QueryClient;
}

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
}
