import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-light-off-white dark:bg-dark-gray-700',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
