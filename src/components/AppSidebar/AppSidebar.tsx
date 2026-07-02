import { FC } from 'react';
import { AppSidebarHeader } from '../AppSidebarHeader/AppSidebarHeader';
import { MainNav } from '../MainNav';
import { ProjectsList } from '../ProjectsList';
import { Plus } from 'lucide-react';
import { Project } from '@/utils/types';

interface AppSidebarProps {
  projects: Project[];
  activeProjectId: string | undefined;
  onAddTask: () => void;
  onSelectProject: (projectId: string) => void;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  projects,
  activeProjectId,
  onAddTask,
  onSelectProject,
}) => {
  return (
    <aside className="h-screen w-64 shrink-0 border-r border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-800">
      <AppSidebarHeader />
      <button
        onClick={onAddTask}
        className="flex w-full items-center gap-2 rounded-md px-2 py-2 font-medium text-orange-700 hover:bg-orange-50"
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-orange-600 text-white">
          <Plus className="size-4" />
        </span>
        Add task
      </button>
      <MainNav />

      <ProjectsList
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={onSelectProject}
      />
    </aside>
  );
};
