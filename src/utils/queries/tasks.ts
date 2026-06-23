import { addTask, deleteTask, editTask, fetchTasks } from '../api/tasks';
import { Todo } from '../types';
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(),
  });

export const useAddTaskMutation = () =>
  useMutation({
    mutationFn: (newTask: Pick<Todo, 'text' | 'projectId' | 'description'>) =>
      addTask({ data: newTask }),
    onMutate: async (newTask, { client }) => {
      await client.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = client.getQueryData(['tasks']);
      client.setQueryData(['tasks'], (prev: Todo[] = []) => [
        ...prev,
        { id: 'new-task', completed: false, ...newTask },
      ]);

      return { previousTasks };
    },
    onError: (err, newTodo, onMutateResult, { client }) => {
      client.setQueryData(['tasks'], onMutateResult?.previousTasks);
    },
    onSettled: (data, error, variables, onMutateResult, { client }) => {
      client.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

export const useDeleteTaskMutation = () =>
  useMutation({
    mutationFn: (taskId: string) => deleteTask({ data: taskId }),
    onMutate: async (taskId, { client }) => {
      await client.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = client.getQueryData(['tasks']);
      client.setQueryData(['tasks'], (prev: Todo[] = []) =>
        prev.filter((task) => task.id !== taskId),
      );

      return { previousTasks };
    },
    onError: (err, newTodo, onMutateResult, { client }) => {
      client.setQueryData(['tasks'], onMutateResult?.previousTasks);
    },
    onSettled: (data, error, variables, onMutateResult, { client }) => {
      client.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

export const useEditTaskMutation = () =>
  useMutation({
    mutationFn: ({ taskId, newTask }: { taskId: string; newTask: Partial<Todo> }) =>
      editTask({ data: { id: taskId, ...newTask } }),
    onMutate: async ({ taskId }, { client }) => {
      await client.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = client.getQueryData(['tasks']);
      client.setQueryData(['tasks'], (prev: Todo[] = []) =>
        prev.filter((task) => task.id !== taskId),
      );

      return { previousTasks };
    },
    onError: (err, newTask, onMutateResult, { client }) => {
      client.setQueryData(['tasks'], onMutateResult?.previousTasks);
    },
    onSettled: (data, error, variables, onMutateResult, { client }) => {
      client.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });
