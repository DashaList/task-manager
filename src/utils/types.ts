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
