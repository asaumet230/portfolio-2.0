import Swal from 'sweetalert2';

const MAX_IMAGE_SIZE_MB = 18;
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];


export const validateFiles = (files: FileList | null) => {

    if (!files || files.length === 0) {
        Swal.fire('¡Ups!', 'Selecciona al menos una imagen.', 'warning');
        return false;
    }

    const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
        Swal.fire('Formato inválido', 'Solo se permiten imágenes en formato jpg, jpeg, png, webp y avif', 'error');
        return false;
    }

    if (files.length > 20) {
        Swal.fire('¡Ups!', 'Solo se permiten hasta 20 imágenes a la vez.', 'warning');
        return false;
    }

    const oversizedFiles = Array.from(files).filter(file => file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB);

    if (oversizedFiles.length > 0) {
        const names = oversizedFiles.map(f => f.name).join(', ');
        Swal.fire('Imagen muy grande', `Estas imágenes superan los ${MAX_IMAGE_SIZE_MB} MB: ${names}`, 'error');
        return false;
    }

    return true;
};

export default validateFiles;