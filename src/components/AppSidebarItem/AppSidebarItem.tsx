import { FC } from 'react';

interface AppSidebarItemProps {
  icon: React.ElementType;
  label: string;
  count?: number;
  countClassName?: string;
}

export const AppSidebarItem: FC<AppSidebarItemProps> = ({
  icon: Icon,
  label,
  count,
  countClassName,
}: AppSidebarItemProps) => {
  return (
    <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-stone-700 hover:bg-stone-100">
      <Icon className="size-4 shrink-0 text-stone-500" />

      <span className="min-w-0 flex-1 truncate">{label}</span>

      {count !== undefined && (
        <span className={['text-xs text-stone-400', countClassName].join(' ')}>{count}</span>
      )}
    </button>
  );
};
