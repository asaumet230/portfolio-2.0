'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';

export default function PerfilPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    phone: '',
    linkedin: '',
    github: '',
    twitter: '',
    portfolio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const token = (session as any)?.accessToken;
      await apiClient.put('/users/profile', formData, token);
      toast.success('Perfil actualizado correctamente');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      setIsLoading(true);
      const token = (session as any)?.accessToken;
      await apiClient.put('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, token);
      toast.success('Contraseña actualizada correctamente');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error.message || 'Error al cambiar contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mi Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Actualiza tu información personal</p>
      </div>

      {/* Información Personal */}
      <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Información Personal</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          placeholder="Bio / Acerca de mí"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24"
        />

        <input
          type="tel"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 pt-4 border-t">Redes Sociales</h3>

        <input
          type="url"
          placeholder="LinkedIn"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="url"
          placeholder="GitHub"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="url"
          placeholder="Twitter"
          value={formData.twitter}
          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="url"
          placeholder="Portafolio"
          value={formData.portfolio}
          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>

      {/* Cambiar Contraseña */}
      <form onSubmit={handlePasswordChange} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Cambiar Contraseña</h2>

        <input
          type="password"
          placeholder="Contraseña actual"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </form>
    </div>
  );
}
