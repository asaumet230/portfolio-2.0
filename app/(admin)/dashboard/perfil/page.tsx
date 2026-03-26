'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import {
  FaUser, FaEnvelope, FaPhone,
  FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaLock,
  FaEye, FaEyeSlash
} from 'react-icons/fa';
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor';

export default function PerfilPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const [image, setImage] = useState<string>('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!session?.user || hasFetched.current) return;
    hasFetched.current = true;

    const user = session.user as any;
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
      email: user.email || '',
    }));

    const userId = user.id;
    const token = (session as any)?.accessToken;
    if (!userId || !token) return;

    apiClient.get(`/users/${userId}`, token)
      .then((response) => {
        const u = response.user;
        const isDefaultImage = u.image?.includes('No-Image');
        if (u.image && !isDefaultImage) setImage(u.image);
        setFormData({
          firstName : u.firstName || '',
          lastName  : u.lastName  || '',
          email     : u.email     || '',
          bio       : u.bio       || '',
          phone     : u.phone     || '',
          twitter   : u.socialMediaNetworks?.twitter?.link   || '',
          github    : u.socialMediaNetworks?.github?.link    || '',
          portfolio : u.socialMediaNetworks?.portfolio?.link || '',
          linkedin  : u.socialMediaNetworks?.linkedin?.link  || '',
        });
      })
      .catch((error) => {
        console.warn('No se pudo cargar datos extendidos del perfil:', error.message);
      });
  }, [session]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload-profile', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      const userId = (session?.user as any)?.id;
      const token = (session as any)?.accessToken;
      await apiClient.put(`/users/${userId}`, { image: data.url }, token);
      setImage(data.url);
      toast.success('Foto actualizada');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar foto');
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userId = (session?.user as any)?.id;
      const token = (session as any)?.accessToken;
      const payload = {
        firstName : formData.firstName,
        lastName  : formData.lastName,
        email     : formData.email,
        bio       : formData.bio,
        phone     : formData.phone,
        socialMediaNetworks: {
          twitter   : { link: formData.twitter,   userName: formData.twitter   || 'no user name' },
          github    : { link: formData.github,     userName: formData.github    || 'no user name' },
          portfolio : { link: formData.portfolio,  userName: formData.portfolio || 'no user name' },
          linkedin  : { link: formData.linkedin,   userName: formData.linkedin  || 'no user name' },
        },
      };
      await apiClient.put(`/users/${userId}`, payload, token);
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
      const userId = (session?.user as any)?.id;
      await apiClient.put(`/users/${userId}/password`, {
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';

  if (!mounted) return null;

  return (
    <div className="space-y-8 max-w-4xl" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0 group">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="block rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Cambiar foto"
          >
            {image ? (
              <img src={image} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                  {formData.firstName?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
              {uploadingPhoto ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              ) : (
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">Cambiar</span>
              )}
            </div>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mi Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Actualiza tu información personal</p>
          <p className="text-xs text-gray-400 mt-1">Haz clic en el avatar para cambiar la foto</p>
        </div>
      </div>

      {/* Información Personal */}
      <form onSubmit={handleProfileUpdate} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Información Personal</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className={iconClass} />
            <input type="text" placeholder="Nombre" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className={inputClass} />
          </div>
          <div className="relative">
            <FaUser className={iconClass} />
            <input type="text" placeholder="Apellido" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div className="relative">
          <FaEnvelope className={iconClass} />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio / Acerca de mí</label>
          <RichTextEditor
            value={formData.bio}
            onChange={(content) => setFormData({ ...formData, bio: content })}
            placeholder="Escribe tu bio aquí..."
            height="h-48"
          />
        </div>

        <div className="relative">
          <FaPhone className={iconClass} />
          <input type="tel" placeholder="Teléfono" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 pt-4 border-t">Redes Sociales</h3>

        <div className="relative">
          <FaLinkedin className={`${iconClass} text-blue-600`} />
          <input type="url" placeholder="LinkedIn" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className={inputClass} />
        </div>

        <div className="relative">
          <FaGithub className={`${iconClass} text-gray-800 dark:text-gray-300`} />
          <input type="url" placeholder="GitHub" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className={inputClass} />
        </div>

        <div className="relative">
          <FaTwitter className={`${iconClass} text-sky-500`} />
          <input type="url" placeholder="Twitter / X" value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} className={inputClass} />
        </div>

        <div className="relative">
          <FaGlobe className={`${iconClass} text-green-500`} />
          <input type="url" placeholder="Portafolio" value={formData.portfolio} onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })} className={inputClass} />
        </div>

        <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50">
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>

      {/* Cambiar Contraseña */}
      <form onSubmit={handlePasswordChange} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Cambiar Contraseña</h2>

        <input type="email" autoComplete="username" value={formData.email} readOnly className="hidden" />

        <div className="relative">
          <FaLock className={iconClass} />
          <input type={showPasswords.current ? 'text' : 'password'} placeholder="Contraseña actual" autoComplete="current-password" suppressHydrationWarning value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" onClick={() => setShowPasswords((p) => ({ ...p, current: !p.current }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            {showPasswords.current ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          <FaLock className={iconClass} />
          <input type={showPasswords.new ? 'text' : 'password'} placeholder="Nueva contraseña" autoComplete="new-password" suppressHydrationWarning value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            {showPasswords.new ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>

        <div className="relative">
          <FaLock className={iconClass} />
          <input type={showPasswords.confirm ? 'text' : 'password'} placeholder="Confirmar contraseña" autoComplete="new-password" suppressHydrationWarning value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full pl-10 pr-10 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="button" onClick={() => setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            {showPasswords.confirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>

        <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50">
          {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </form>
    </div>
  );
}
