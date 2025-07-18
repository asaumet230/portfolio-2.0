import 'animate.css';

interface EmptyFileNoticeProps {
    noticeText?: string;
}

export const EmptyFileNotice = ({ noticeText }: EmptyFileNoticeProps) => {
    return (
        <div className="text-center text-gray-500 dark:text-slate-200 text-sm font-medium animate__animated animate__fadeIn">
            { noticeText }
        </div>
    )
}

export default EmptyFileNotice;