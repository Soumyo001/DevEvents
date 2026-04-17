import Link from 'next/link';
import { NavItem } from '@/lib/types';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const NavBar = ({items = []}: {items: NavItem[]}) => {
    return (
      <header className="fixed top-0 w-full bg-[#12121280]/50 backdrop-blur-md border-b border-primary-foreground/10">
          <nav
              className='flex flex-row justify-between items-center max-sm:px-5 px-10 py-4 gap-4'
          >
              <Link
                  href="/home"
                  className='flex flex-row items-center gap-2'
              >
                  <Image
                      src={"/icons/logo.png"}
                      alt='logo'
                      width={24}
                      height={24}
                  />
                  <p
                      className='text-xl font-bold italic max-sm:hidden'
                  >
                      DevEvents
                  </p>
              </Link>

                  <div className='flex flex-row items-center gap-6'>
                  <ul
                      className='flex flex-row items-center gap-6'
                  >
                      {items.map((item, idx) => (
                          <Link 
                              key={idx}
                              href={item.url}
                          >
                              {item.name}
                          </Link>
                      ))}
                  </ul>
                  <UserButton/>
              </div>
          </nav>
      </header>
    )
}

export default NavBar