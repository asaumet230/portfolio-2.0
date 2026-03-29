'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DataTable } from '@/components/admin/tables/DataTable';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
  active: boolean;
}

export default function UsuariosPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    if ((session.user as any)?.role !== 'admin_role') {
      router.replace('/dashboard');
      return;
    }
    fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    const token = (session as any)?.accessToken;
    try {
      setLoading(true);
      const response = await apiClient.get('/users', token);
      setUsers(response.users || []);
    } catch {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    router.push(`/dashboard/usuarios/${user._id}`);
  };

  const handleToggleActive = async (user: User) => {
    if (togglingId === user._id) return;

    if (user.role === 'admin_role') {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no permitida',
        text: 'Los administradores no se pueden desactivar.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    const action = user.active ? 'desactivar' : 'activar';
    const result = await Swal.fire({
      icon: 'question',
      title: `¿${user.active ? 'Desactivar' : 'Activar'} usuario?`,
      text: `¿Estás seguro de ${action} a ${user.firstName} ${user.lastName}?`,
      showCancelButton: true,
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: user.active ? '#ef4444' : '#22c55e',
      cancelButtonColor: '#6b7280',
    });

    if (!result.isConfirmed) return;

    const token = (session as any)?.accessToken;
    const newValue = !user.active;
    setTogglingId(user._id);
    setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, active: newValue } : u));
    try {
      await apiClient.put(`/users/${user._id}`, { active: newValue }, token);
      toast.success(newValue ? 'Usuario activado' : 'Usuario desactivado');
    } catch (error: any) {
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, active: user.active } : u));
      toast.error(error.message || 'Error al actualizar estado');
    } finally {
      setTogglingId(null);
    }
  };

  const roleStyle: Record<string, string> = {
    admin_role:  'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700',
    user_role:   'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
    sales_role:  'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700',
    seo_role:    'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700',
  };

  const roleLabel: Record<string, string> = {
    admin_role:  'Admin',
    user_role:   'Usuario',
    sales_role:  'Ventas',
    seo_role:    'SEO',
  };

  const UserAvatar = ({ src, name }: { src?: string; name: string }) => {
    const [error, setError] = useState(false);
    const initial = name?.[0]?.toUpperCase() || '?';
    if (src && !error) {
      return (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="w-10 h-10 object-cover rounded-full border border-gray-200 dark:border-gray-700"
        />
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-semibold">
        {initial}
      </div>
    );
  };

  const columns = [
    {
      key: 'image',
      label: 'Foto',
      render: (value: string, row: User) => <UserAvatar src={value} name={row.firstName} />,
    },
    { key: 'email' as const, label: 'Email' },
    {
      key: 'firstName' as const,
      label: 'Nombre',
      render: (first: string, row: User) => `${first} ${row.lastName}`,
    },
    {
      key: 'role' as const,
      label: 'Rol',
      render: (value: string) => (
        <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium border ${roleStyle[value] || roleStyle.user_role}`}>
          {roleLabel[value] || value}
        </span>
      ),
    },
    {
      key: 'active' as const,
      label: 'Activo',
      render: (active: boolean, row: User) => (
        <button
          onClick={() => handleToggleActive(row)}
          disabled={togglingId === row._id}
          className="flex items-center gap-2"
          title={active ? 'Desactivar usuario' : 'Activar usuario'}
        >
          <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${active ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} ${togglingId === row._id ? 'opacity-50' : ''}`}>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
          <span className={`text-xs font-medium ${active ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {active ? 'Sí' : 'No'}
          </span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Usuarios</h1>
        <Link
          href="/dashboard/usuarios/nuevo"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm font-medium"
        >
          + Nuevo Usuario
        </Link>
      </div>

      <DataTable columns={columns} data={users} loading={loading} onEdit={handleEdit} emptyMessage="No hay usuarios" />
    </div>
  );
}
