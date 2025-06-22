// src/components/NavigationBar.tsx
import { Disclosure, Menu } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import LoginButton from './LoginButton';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Example navigation items – adjust these as needed
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Feed', href: '/feed', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '/logout' },
];

export default function NavigationBar() {
  const { user } = useAuth();

  return (
    <Disclosure as="header" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
            <div className="relative flex h-16 justify-between">
              {/* Left: Logo */}
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex shrink-0 items-center">
                  <Link to="/">
                    <img
                      alt="Octave"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
              </div>

              {/* Middle: Search Input */}
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <div className="grid w-full grid-cols-1 sm:max-w-xs">
                  <input
                    name="search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="col-start-1 row-start-1 block w-full rounded-md bg-gray-700 py-1.5 pr-3 pl-10 text-base text-white placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm"
                  />
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-3 h-5 w-5 self-center text-gray-400"
                  />
                </div>
              </div>

              {/* Right: Mobile Menu Button and User Profile */}
              <div className="relative z-10 flex items-center lg:hidden">
                <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon aria-hidden="true" className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="relative shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {user ? (
                  <Menu as="div" className="relative ml-4 shrink-0">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="User Avatar"
                          src={user.avatarUrl || 'https://via.placeholder.com/40'}
                          className="h-8 w-8 rounded-full"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                ) : (
                  <LoginButton />
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav aria-label="Global" className="hidden lg:flex lg:space-x-8 lg:py-2 text-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel as="nav" aria-label="Global" className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-4">
                {user ? (
                  <>
                    <div className="shrink-0">
                      <img
                        alt="User Avatar"
                        src={user.avatarUrl || 'https://via.placeholder.com/40'}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">{user.displayName}</div>
                      <div className="text-sm font-medium text-gray-400">{user.email}</div>
                    </div>
                  </>
                ) : (
                  <div className="ml-3">
                    <LoginButton />
                  </div>
                )}
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
