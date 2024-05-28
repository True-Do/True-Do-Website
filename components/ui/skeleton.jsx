import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-light-off-white dark:bg-slate-800',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
