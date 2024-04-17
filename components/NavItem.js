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
          ? 'size-10 rounded-md text-center transition-all text-text-light flex items-center justify-center'
          : 'size-10 rounded-md text-center transition-all text-text-dark hover:text-text-light flex items-center justify-center'
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

const NavItemOld = () => {
  return (
    <Link
      onClick={() => {
        setMenu(false);
      }}
      href={'/app/calendar'}
      className={
        path.split('/')[2] == 'calendar'
          ? 'size-10 rounded-md text-center transition-all bg-text-dark text-light-off-white flex items-center justify-center'
          : 'size-10 rounded-md text-center transition-all border-[1.5px] border-text-light hover:bg-text-light hover:text-light-off-white flex items-center justify-center'
      }
    >
      C
    </Link>
  );
};

export default NavItem;
