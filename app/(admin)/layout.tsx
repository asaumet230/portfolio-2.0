'use client';

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { DashboardThemeToggle } from '@/components/ui/DashboardThemeToggle';
import { apiClient } from '@/helpers/apiClient';
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
  BookmarkIcon,
  HamburgerMenuIcon,
  Cross1Icon,
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
  { href: '/dashboard/categorias', label: 'Categorías', icon: BookmarkIcon },
  { href: '/dashboard/sitemap', label: 'Sitemap', icon: GlobeIcon },
];

function UserAvatar({ src }: { src: string | null }) {
  const [error, setError] = useState(false);
  if (src && !error) {
    return (
      <img
        src={src}
        alt="Avatar"
        onError={() => setError(true)}
        className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
      />
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
      <PersonIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    const userId = (session.user as any)?.id;
    const token = (session as any)?.accessToken;
    if (!userId || !token) return;
    apiClient.get(`/users/${userId}`, token)
      .then((res) => {
        const img = res.user?.image;
        if (img && !img.includes('No-Image')) setProfileImage(img);
      })
      .catch(() => {});
  }, [session]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 dark:bg-gray-950 text-white flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" onClick={closeSidebar} className="flex-1">
            <Image
              src="/images/logo-andres-saumet-blanco.webp"
              alt="Andres Saumet"
              width={200}
              height={65}
              priority
              className="object-contain"
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
          {/* Close button (mobile only) */}
          <button
            onClick={closeSidebar}
            className="lg:hidden ml-2 p-1 text-gray-400 hover:text-white transition"
            aria-label="Cerrar menú"
          >
            <Cross1Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
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
            <ExitIcon className="w-5 h-5 shrink-0" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow shrink-0">
          <div className="px-4 lg:px-8 py-4 flex justify-between items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                aria-label="Abrir menú"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                Bienvenido andres saumet
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <DashboardThemeToggle />
              <Link
                href="/dashboard/perfil"
                title="Mi perfil"
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group transition"
              >
                <UserAvatar src={profileImage} />
                <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition">
                  Mi perfil
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
