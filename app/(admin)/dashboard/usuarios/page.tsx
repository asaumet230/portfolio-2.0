'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DataTable } from '@/components/admin/tables/DataTable';
import { Modal } from '@/components/admin/modals/Modal';
import { DeleteConfirmModal } from '@/components/admin/modals/DeleteConfirmModal';
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

const ROLES = ['user_role', 'admin_role', 'sales_role', 'seo_role'];

export default function UsuariosPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', password: '', role: 'user_role' });
  const [togglingId, setTogglingId] = useState<string | null>(null);

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

  useEffect(() => {
    if (session) fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    const token = (session as any)?.accessToken;
    try {
      setLoading(true);
      const response = await apiClient.get('/users', token);
      setUsers(response.users || []);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: '',
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.email || !formData.firstName) {
      toast.error('Email y nombre son requeridos');
      return;
    }
    try {
      if (selectedUser) {
        const updateData: any = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        const token = (session as any)?.accessToken;
        await apiClient.put(`/users/${selectedUser._id}`, updateData, token);
        toast.success('Usuario actualizado');
      } else {
        if (!formData.password) {
          toast.error('Contraseña requerida para nuevo usuario');
          return;
        }
        const token = (session as any)?.accessToken;
        await apiClient.post('/users', formData, token);
        toast.success('Usuario creado');
      }
      setIsModalOpen(false);
      setFormData({ email: '', firstName: '', lastName: '', password: '', role: 'user_role' });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Error al guardar');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      const token = (session as any)?.accessToken;
      await apiClient.delete(`/users/${selectedUser._id}`, token);
      toast.success('Usuario eliminado');
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar');
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
        <button
          onClick={() => {
            setSelectedUser(null);
            setFormData({ email: '', firstName: '', lastName: '', password: '', role: 'user_role' });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          + Nuevo Usuario
        </button>
      </div>

      <DataTable columns={columns} data={users} loading={loading} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No hay usuarios" />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
              Cancelar
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition">
              Guardar
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Nombre" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="text" placeholder="Apellido" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </Modal>

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} title="Eliminar Usuario" message={`¿Estás seguro que deseas eliminar el usuario "${selectedUser?.email}"?`} />
    </div>
  );
}
