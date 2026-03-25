'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/helpers/apiClient';
import { FaFolderOpen, FaTools, FaQuoteLeft, FaNewspaper, FaBriefcase, FaUsers } from 'react-icons/fa';

interface Stats {
  projectsCount: number;
  toolsCount: number;
  testimonialsCount: number;
  articlesCount: number;
  experiencesCount: number;
  usersCount: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    projectsCount: 0,
    toolsCount: 0,
    testimonialsCount: 0,
    articlesCount: 0,
    experiencesCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    if (session) fetchStats();
  }, [session]);

  const fetchStats = async () => {
    const token = (session as any)?.accessToken;
    try {
      const [projects, tools, testimonials, articles, experiences, users] = await Promise.all([
        apiClient.get('/projects').then((res) => res.projects?.length || 0).catch(() => 0),
        apiClient.get('/tools').then((res) => res.tools?.length || 0).catch(() => 0),
        apiClient.get('/testimonials').then((res) => res.testimonials?.length || 0).catch(() => 0),
        apiClient.get('/articles').then((res) => res.articles?.length || 0).catch(() => 0),
        apiClient.get('/experiences').then((res) => res.experiences?.length || 0).catch(() => 0),
        apiClient.get('/users', token).then((res) => res.users?.length || 0).catch(() => 0),
      ]);

      setStats({
        projectsCount: projects,
        toolsCount: tools,
        testimonialsCount: testimonials,
        articlesCount: articles,
        experiencesCount: experiences,
        usersCount: users,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cards = [
    { label: 'Proyectos',    count: stats.projectsCount,    href: '/dashboard/proyectos/projectos-web', icon: FaFolderOpen, color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Herramientas', count: stats.toolsCount,        href: '/dashboard/herramientas',            icon: FaTools,      color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { label: 'Testimonios',  count: stats.testimonialsCount, href: '/dashboard/testimonios',             icon: FaQuoteLeft,  color: 'text-green-500',  bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Artículos',    count: stats.articlesCount,     href: '/dashboard/articulos',               icon: FaNewspaper,  color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Experiencias', count: stats.experiencesCount,  href: '/dashboard/experiencias',            icon: FaBriefcase,  color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { label: 'Usuarios',     count: stats.usersCount,        href: '/dashboard/usuarios',                icon: FaUsers,      color: 'text-rose-500',   bg: 'bg-rose-50 dark:bg-rose-900/20' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Bienvenido a tu panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ label, count, href, icon: Icon, color, bg }) => (
          <Link key={label} href={href}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer flex items-center gap-4">
              <div className={`${bg} ${color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">📊 Estadísticas Generales</h2>
        <p className="text-blue-800 dark:text-blue-200 mt-2">Total de elementos: {Object.values(stats).reduce((a, b) => a + b, 0)}</p>
      </div>
    </div>
  );
}
