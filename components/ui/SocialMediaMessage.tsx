interface Props {
    title: string;
    isNextTo: boolean; 
}

export const SocialMediaMessage = ({ title, isNextTo }: Props) => {
    return (
        <div className={`hidden absolute ${ isNextTo? 'top-8':'bottom-8' } text-center bg-white border border-gray-200 text-black p-2 rounded shadow-md group-hover:block dark:bg-[#0d1117] dark:text-slate-300 dark:border dark:border-slate-300`}>
            <p className='text-xs capitalize'>{ title }</p>
        </div>
    )
}

export default SocialMediaMessage