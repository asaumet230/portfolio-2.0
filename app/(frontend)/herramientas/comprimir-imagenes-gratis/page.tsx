import { ImagesCompressor } from "@/components";

export default function CompresorImagenesPage() {
    return (
        <div className="w-full mx-auto flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117]">
            <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md py-10 px-6 sm:px-8 my-10 dark:bg-gray-700">
                    <header>
                        <h1
                            id="compress-images-form"
                            className="text-3xl text-center font-bold sm:text-4xl">Compresor de imágenes</h1>
                    </header>
                    <ImagesCompressor />
                </div>
            </main>
        </div>
    );
}