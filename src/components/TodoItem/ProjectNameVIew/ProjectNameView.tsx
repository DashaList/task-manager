import type { FC } from 'react';
import { Hash, Inbox } from 'lucide-react';
import { getRouteApi } from '@tanstack/react-router';

interface ProjectNameViewProps {
  projectId: string;
}

export const ProjectNameView: FC<ProjectNameViewProps> = ({ projectId }) => {
  const routeApi = getRouteApi('/');
  const projects = routeApi.useLoaderData().projects;
  const projectName = projects.find((project) => project.id === projectId)?.name ?? 'Inbox';
  const isInbox = projectName === 'Inbox';
  const ProjectIcon = isInbox ? Inbox : Hash;

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <span className="max-w-48 truncate">{projectName}</span>
      <ProjectIcon className={`h-4 w-4 ${isInbox ? 'text-gray-500' : 'text-green-600'}`} />
    </div>
  );
};
