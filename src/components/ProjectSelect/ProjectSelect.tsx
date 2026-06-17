import type { FC } from 'react';
import { getRouteApi } from '@tanstack/react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

interface ProjectSelectProps {
  projectId: string;
  onChange: (value: string) => void;
}

export const ProjectSelect: FC<ProjectSelectProps> = ({ projectId, onChange }) => {
  const routeApi = getRouteApi('/');
  const projects = routeApi.useLoaderData().projects;

  return (
    <Select value={projectId} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {projects.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
