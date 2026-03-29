'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { apiClient } from '@/helpers/apiClient';
import toast from 'react-hot-toast';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor';

const ROLES = [
  { value: 'user_role',  label: 'Usuario', description: 'Acceso básico de solo lectura' },
  { value: 'admin_role', label: 'Admin',   description: 'Acceso total al dashboard' },
  { value: 'sales_role', label: 'Ventas',  description: 'Gestión de proyectos y clientes' },
  { value: 'seo_role',   label: 'SEO',     description: 'Gestión de contenido y categorías' },
];

const roleActiveStyle: Record<string, string> = {
  admin_role:  'bg-rose-500 text-white border-rose-500',
  user_role:   'bg-gray-500 text-white border-gray-500',
  sales_role:  'bg-green-500 text-white border-green-500',
  seo_role:    'bg-violet-500 text-white border-violet-500',
};

const roleIdleStyle: Record<string, string> = {
  admin_role:  'hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400',
  user_role:   'hover:border-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
  sales_role:  'hover:border-green-400 hover:text-green-600 dark:hover:text-green-400',
  seo_role:    'hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400',
};

const inputClass = 'w-full pl-10 pr-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500';
const iconClass  = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4';

export default function NuevoUsuarioPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving]             = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    password: '', role: 'user_role', description: '', image: '',
  });

  useEffect(() => {
    if (session && (session.user as any)?.role !== 'admin_role') router.replace('/dashboard');
  }, [session]);

  const passwordRules = [
    { label: 'Mínimo 8 caracteres',                             ok: form.password.length >= 8 },
    { label: 'Al menos una mayúscula',                          ok: /[A-Z]/.test(form.password) },
    { label: 'Al menos un número',                              ok: /\d/.test(form.password) },
    { label: 'Al menos un carácter especial (@$!%*?&#^_-+=)',   ok: /[@$!%*?&#^_\-+=]/.test(form.password) },
  ];
  const passwordValid  = passwordRules.every((r) => r.ok);
  const passwordsMatch = form.password === confirmPassword;
  const confirmTouched = confirmPassword.length > 0;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingAvatar(true);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-profile', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');
      setForm((prev) => ({ ...prev, image: data.url }));
      toast.success('Avatar subido correctamente');
    } catch (err: any) {
      toast.error(err.message || 'Error al subir el avatar');
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!form.email.trim())     { toast.error('El email es requerido');                   return; }
    if (!form.firstName.trim()) { toast.error('El nombre es requerido');                  return; }
    if (!form.password)         { toast.error('La contraseña es requerida');              return; }
    if (!passwordValid)         { toast.error('La contraseña no cumple los requisitos');  return; }
    if (!passwordsMatch)        { toast.error('Las contraseñas no coinciden');            return; }
    try {
      setSaving(true);
      const token = (session as any)?.accessToken;
      await apiClient.post('/users', {
        email:     form.email.trim(),
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        password:  form.password,
        role:      form.role,
        ...(form.description && { description: form.description }),
        ...(form.image        && { image: form.image }),
      }, token);
      toast.success('Usuario creado correctamente');
      router.push('/dashboard/usuarios');
    } catch (error: any) {
      toast.error(error.message || 'Error al crear el usuario');
    } finally {
      setSaving(false);
    }
  };

  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ');

  return (
    <div className="space-y-8 max-w-4xl" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>

      {/* Header — mismo estilo que perfil */}
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0 group">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            className="block rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Subir foto"
          >
            {form.image ? (
              <img src={form.image} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                  {form.firstName?.[0]?.toUpperCase() || '?'}
                </span>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
              {uploadingAvatar
                ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                : <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">Subir</span>}
            </div>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/usuarios" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{fullName || 'Nuevo usuario'}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Crear nuevo usuario del dashboard</p>
              <p className="text-xs text-gray-400 mt-1">Haz clic en el avatar para subir una foto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información Personal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Información Personal</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className={iconClass} />
            <input type="text" placeholder="Nombre *" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} autoFocus className={inputClass} />
          </div>
          <div className="relative">
            <FaUser className={iconClass} />
            <input type="text" placeholder="Apellido" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción <span className="text-gray-400 font-normal">— opcional</span></label>
          <RichTextEditor
            value={form.description}
            onChange={(html) => setForm({ ...form, description: html })}
            placeholder="Cargo, responsabilidades o notas sobre el usuario..."
            height="h-36"
          />
        </div>
      </div>

      {/* Credenciales y Rol */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Credenciales y Acceso</h2>

        <div className="relative">
          <FaEnvelope className={iconClass} />
          <input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
        </div>

        <div className="relative">
          <FaLock className={iconClass} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña *"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-10 pr-10 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>

        {form.password.length > 0 && (
          <ul className="space-y-1 pl-1">
            {passwordRules.map((rule) => (
              <li key={rule.label} className={`flex items-center gap-2 text-xs ${rule.ok ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {rule.ok ? <CheckIcon className="w-3.5 h-3.5 shrink-0" /> : <Cross2Icon className="w-3.5 h-3.5 shrink-0" />}
                {rule.label}
              </li>
            ))}
          </ul>
        )}

        <div className="relative">
          <FaLock className={iconClass} />
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirmar contraseña *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full pl-10 pr-10 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
              confirmTouched
                ? passwordsMatch ? 'border-green-400 dark:border-green-500 focus:ring-green-400' : 'border-red-400 dark:border-red-500 focus:ring-red-400'
                : 'dark:border-gray-600 focus:ring-blue-500'
            }`}
          />
          <button type="button" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
            {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>
        {confirmTouched && (
          <p className={`flex items-center gap-1 text-xs ${passwordsMatch ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {passwordsMatch ? <><CheckIcon className="w-3.5 h-3.5" />Las contraseñas coinciden</> : <><Cross2Icon className="w-3.5 h-3.5" />Las contraseñas no coinciden</>}
          </p>
        )}

        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Rol</p>
          <p className="text-xs text-gray-400">Define qué puede hacer este usuario en el dashboard</p>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((role) => {
              const isSelected = form.role === role.value;
              return (
                <button key={role.value} type="button" onClick={() => setForm({ ...form, role: role.value })}
                  className={`px-4 py-3 rounded text-sm border transition text-left ${isSelected ? roleActiveStyle[role.value] : `border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 ${roleIdleStyle[role.value]}`}`}>
                  <span className="font-semibold block">{role.label}</span>
                  <span className={`text-xs ${isSelected ? 'opacity-80' : 'text-gray-400'}`}>{role.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/usuarios" className="flex-1 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm font-medium">
            Cancelar
          </Link>
          <button
            onClick={handleSave}
            disabled={saving || !form.email.trim() || !form.firstName.trim() || !form.password || !passwordValid || !passwordsMatch}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 text-sm font-medium"
          >
            {saving ? 'Creando...' : 'Crear usuario'}
          </button>
        </div>
      </div>
    </div>
  );
}
