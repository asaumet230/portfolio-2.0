'use client';

import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  DashboardIcon,
  FileTextIcon,
  GearIcon,
  ChatBubbleIcon,
  LayersIcon,
  BackpackIcon,
  PersonIcon,
  ExitIcon,
} from '@radix-ui/react-icons';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/dashboard/proyectos/projectos-web', label: 'Proyectos', icon: LayersIcon },
  { href: '/dashboard/herramientas', label: 'Herramientas', icon: GearIcon },
  { href: '/dashboard/testimonios', label: 'Testimonios', icon: ChatBubbleIcon },
  { href: '/dashboard/articulos', label: 'Artículos', icon: FileTextIcon },
  { href: '/dashboard/experiencias', label: 'Trabajos', icon: BackpackIcon },
  { href: '/dashboard/usuarios', label: 'Usuarios', icon: PersonIcon },
  { href: '/dashboard/perfil', label: 'Perfil', icon: PersonIcon },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 dark:bg-gray-950 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">
            Andres saumet
            <span className="text-xs block font-normal text-gray-400">WEB & MOBILE DEVELOPER</span>
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            <ExitIcon className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="px-8 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bienvenido andres saumet
            </h2>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <PersonIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
