import type { FC } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import { projectsQueryOptions } from '@/utils/queries/projects';

interface ProjectSelectProps {
  projectId: string;
  onChange: (value: string) => void;
}

export const ProjectSelect: FC<ProjectSelectProps> = ({ projectId, onChange }) => {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions());

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
