import type { FC } from 'react';
import { Hash } from 'lucide-react';
import { Project } from '@/utils/types';

interface ProjectsListProps {
  projects: Project[];
  activeProjectId: string | undefined;
  onSelectProject: (projectId: string) => void;
}

export const ProjectsList: FC<ProjectsListProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
}) => {
  return (
    <section className="mt-8">
      <div className="mb-2 flex items-center gap-2 px-2 text-sm">
        <span className="font-medium text-stone-700">My Projects</span>
      </div>

      <div className="space-y-1">
        {projects.map((project) => {
          const active = project.id === activeProjectId;

          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className={[
                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition',
                active ? 'bg-yellow-100 text-orange-800' : 'text-stone-700 hover:bg-stone-100',
              ].join(' ')}
            >
              <Hash className="size-4 shrink-0" style={{ color: '#6b7280' }} />
              <span className="min-w-0 flex-1 truncate">{project.name}</span>

              {/* {project.taskCount !== undefined && (
                <span className="text-xs text-stone-400">{project.taskCount}</span>
              )} */}
            </button>
          );
        })}

        {/* {onAddProject && (
          <button
            onClick={onAddProject}
            className="mt-3 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700"
          >
            <Plus className="size-4" />
            Add project
          </button>
        )} */}
      </div>
    </section>
  );
};
