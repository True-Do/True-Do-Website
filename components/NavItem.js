'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({ sidebar, item, children }) => {
  const path = usePathname();

  return (
    <Link
      href={`/app/${item}`}
      className={
        path.split('/')[2] == item
          ? 'size-10 rounded-md text-center transition-all text-text-light dark:text-white flex items-center justify-center'
          : 'size-10 rounded-md text-center transition-all text-text-dark dark:text-dark-gray-300 hover:text-text-light hover:dark:text-white flex items-center justify-center'
      }
    >
      <div className='flex flex-col justify-center items-center h-full'>
        {children}
        {!sidebar && (
          <p className='text-[.6rem]'>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default NavItem;
