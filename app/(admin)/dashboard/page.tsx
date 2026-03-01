'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';

interface Stats {
  projectsCount: number;
  toolsCount: number;
  testimonialsCount: number;
  articlesCount: number;
  experiencesCount: number;
  usersCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    projectsCount: 0,
    toolsCount: 0,
    testimonialsCount: 0,
    articlesCount: 0,
    experiencesCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, tools, testimonials, articles, experiences, users] = await Promise.all([
        apiClient.get('/projects').then((res) => res.projects?.length || 0).catch(() => 0),
        apiClient.get('/tools').then((res) => res.tools?.length || 0).catch(() => 0),
        apiClient.get('/testimonials').then((res) => res.testimonials?.length || 0).catch(() => 0),
        apiClient.get('/articles').then((res) => res.articles?.length || 0).catch(() => 0),
        apiClient.get('/experiences').then((res) => res.experiences?.length || 0).catch(() => 0),
        apiClient.get('/users').then((res) => res.users?.length || 0).catch(() => 0),
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

  const StatCard = ({ label, count, href }: { label: string; count: number; href: string }) => (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{count}</p>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Bienvenido a tu panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Proyectos" count={stats.projectsCount} href="/dashboard/proyectos/projectos-web" />
        <StatCard label="Herramientas" count={stats.toolsCount} href="/dashboard/herramientas" />
        <StatCard label="Testimonios" count={stats.testimonialsCount} href="/dashboard/testimonios" />
        <StatCard label="Artículos" count={stats.articlesCount} href="/dashboard/articulos" />
        <StatCard label="Experiencias" count={stats.experiencesCount} href="/dashboard/experiencias" />
        <StatCard label="Usuarios" count={stats.usersCount} href="/dashboard/usuarios" />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">📊 Estadísticas Generales</h2>
        <p className="text-blue-800 dark:text-blue-200 mt-2">Total de elementos: {Object.values(stats).reduce((a, b) => a + b, 0)}</p>
      </div>
    </div>
  );
}
