

export const changeThemeMode = (mode: boolean) => mode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
export default changeThemeMode;