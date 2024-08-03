

interface Props {
    image: string;
    title: string;
    message: string;
}

export const AuthBackground = ({ image, title, message }: Props) => {
    return (
        <div className='hidden bg-cover bg-white lg:block lg:w-7/12' style={{ backgroundImage: `url(${image})` }}>
            <div className="h-screen bg-gray-800 bg-opacity-50 flex flex-col justify-center text-white px-20">
                <h1 className='text-4xl capitalize'>{ title }</h1>
                <p className='text-xl w-8/12 mt-5'>{ message }</p>
            </div>
        </div>
    )
}

export default AuthBackground;