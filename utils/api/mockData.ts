import { Todo } from '@/utils/types';

export const useMocks = () => import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true';

export const mockUser = {
  id: '00000000-0000-4000-8000-000000000001',
  email: 'dev@example.com',
};

const mockProjectId = '00000000-0000-4000-8000-000000000002';

export const mockProfile = {
  id: mockUser.id,
  createdAt: '2026-01-01T00:00:00.000Z',
  defaultProjectId: mockProjectId,
};

export const mockProjects = [
  {
    id: mockProjectId,
    createdAt: '2026-01-01T00:00:00.000Z',
    name: 'Inbox',
    ownerId: mockUser.id,
  },
];

let mockTasks: Todo[] = [
  {
    id: 'mock-task-1',
    text: 'Try the mocked task manager',
    completed: false,
  },
  {
    id: 'mock-task-2',
    text: 'Toggle this task without touching the database',
    completed: true,
  },
];

export const getMockTasks = () => mockTasks;

export const addMockTask = (text: string) => {
  mockTasks = [
    ...mockTasks,
    {
      id: `mock-task-${Date.now()}`,
      text,
      completed: false,
    },
  ];
};

export const deleteMockTask = (id: string) => {
  mockTasks = mockTasks.filter((task) => task.id !== id);
};

export const editMockTask = (id: string, newTask: Partial<Todo>) => {
  mockTasks = mockTasks.map((task) => (task.id === id ? { ...task, ...newTask } : task));
};
