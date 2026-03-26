'use client';

import { useEffect } from 'react';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { isDarkMode, toggleDarkMode, toggleSystemMode } from '@/store/themeMode/themeSlice';
import { changeThemeMode } from '@/helpers';

type Mode = 'light' | 'dark' | 'system';

export const DashboardThemeToggle = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const systemMode = useAppSelector((state) => state.theme.systemMode);

  const activeMode: Mode = systemMode ? 'system' : darkMode ? 'dark' : 'light';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedSystem = localStorage.getItem('systemMode');
    const storedDark = localStorage.getItem('darkMode');

    if (storedSystem !== null && JSON.parse(storedSystem) === true) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(toggleSystemMode(true));
      dispatch(isDarkMode(prefersDark));
      changeThemeMode(prefersDark);
    } else if (storedDark !== null) {
      const dark: boolean = JSON.parse(storedDark);
      dispatch(toggleDarkMode(dark));
      changeThemeMode(dark);
    }
  }, [dispatch]);

  const setMode = (mode: Mode) => {
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(toggleSystemMode(true));
      dispatch(isDarkMode(prefersDark));
      changeThemeMode(prefersDark);
      localStorage.setItem('systemMode', JSON.stringify(true));
      localStorage.removeItem('darkMode');
    } else {
      const dark = mode === 'dark';
      dispatch(toggleDarkMode(dark));
      dispatch(toggleSystemMode(false));
      changeThemeMode(dark);
      localStorage.setItem('darkMode', JSON.stringify(dark));
      localStorage.setItem('systemMode', JSON.stringify(false));
    }
  };

  const buttons: { mode: Mode; icon: React.ReactNode; label: string }[] = [
    { mode: 'light',  icon: <SunIcon className="w-3.5 h-3.5" />,     label: 'Claro'   },
    { mode: 'dark',   icon: <MoonIcon className="w-3.5 h-3.5" />,    label: 'Oscuro'  },
    { mode: 'system', icon: <DesktopIcon className="w-3.5 h-3.5" />, label: 'Sistema' },
  ];

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5 gap-0.5">
      {buttons.map(({ mode, icon, label }) => {
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            onClick={() => setMode(mode)}
            title={label}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              isActive
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DashboardThemeToggle;
