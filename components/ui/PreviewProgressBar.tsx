import 'animate.css';

interface ProgressBarProps {
    ImageProgress: number;
}

export const PreviewProgressBar = ({ ImageProgress }: ProgressBarProps) => {

    return (
        <div className="w-7/12 sm:w-5/12 mb-2 mx-auto animate__animated animate__fadeIn">
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
                    style={{ width: `${ImageProgress}%` }}
                />
                <span className={`absolute inset-0 flex items-center justify-center ${ImageProgress > 50 ? 'text-white' : 'text-gray-900'} font-semibold text-sm`}>
                    {ImageProgress}%
                </span>
            </div>
        </div>
    )
}

export default PreviewProgressBar;