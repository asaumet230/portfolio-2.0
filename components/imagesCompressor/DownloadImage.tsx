import { FaDownload } from "react-icons/fa6"

import 'animate.css';

interface DonwloadImageProps {
    file: File;
    convertedSizeKB?: number;
}

export const DonwloadImage = ({ file, convertedSizeKB }: DonwloadImageProps) => {

    const handleDownloadSingleFile = (file: File) => {

        const blobUrl = URL.createObjectURL(file)

        const link = document.createElement('a')
        link.href = blobUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
            URL.revokeObjectURL(blobUrl)
        }, 100)
    }

    return (
        <div className='flex flex-col justify-center items-center animate__animated animate__fadeIn'>
            <button
                onClick={() => handleDownloadSingleFile(file)}
                className='flex items-center justify-center cursor-pointer text-white py-0.5 px-3 mb-0.5 border rounded-lg bg-blue-600 hover:bg-blue-700'>
                <span className='text-sm'>Descargar</span>
                <FaDownload className="text-sm ml-1" />
            </button>
            <span className="text-green-600 text-center text-sm uppercase">
                {convertedSizeKB ?? '...'} KB
            </span>
        </div>
    )
}

export default DonwloadImage;