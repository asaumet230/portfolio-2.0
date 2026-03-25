'use client';

import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import {
  DashboardIcon,
  FileTextIcon,
  GearIcon,
  ChatBubbleIcon,
  DesktopIcon,
  MobileIcon,
  BackpackIcon,
  PersonIcon,
  ExitIcon,
  GlobeIcon,
  LayersIcon,
} from '@radix-ui/react-icons';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/dashboard/proyectos/projectos-web', label: 'Proyectos Web', icon: DesktopIcon },
  { href: '/dashboard/proyectos/projectos-moviles', label: 'Proyectos Móviles', icon: MobileIcon },
  { href: '/dashboard/herramientas', label: 'Herramientas', icon: GearIcon },
  { href: '/dashboard/testimonios', label: 'Testimonios', icon: ChatBubbleIcon },
  { href: '/dashboard/articulos', label: 'Artículos', icon: FileTextIcon },
  { href: '/dashboard/experiencias', label: 'Trabajos', icon: BackpackIcon },
  { href: '/dashboard/usuarios', label: 'Usuarios', icon: PersonIcon },
  { href: '/dashboard/paginas', label: 'Páginas', icon: LayersIcon },
  { href: '/dashboard/sitemap', label: 'Sitemap', icon: GlobeIcon },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 dark:bg-gray-950 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-800">
          <Link href="/">
            <Image
              src="/images/logo-andres-saumet-blanco.webp"
              alt="Andres Saumet"
              width={200}
              height={65}
              priority
              className="object-contain"
              style={{ height: 'auto' }}
            />
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);

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
              <Link
                href="/dashboard/perfil"
                title="Mi perfil"
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group transition"
              >
                <PersonIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition">
                  Mi perfil
                </span>
              </Link>
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
