import Link from "next/link";

import { FaGithub } from "react-icons/fa6";


export const TextCaseProDetails = () => {

    return (

        <>
            <section className="max-w-3xl mx-auto px-4 pt-16 pb-10 ">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Convierte texto de minúscula a mayúscula online
                </h1>

                <p className="text-base md:text-lg mb-6 leading-relaxed">
                    ¿Necesitas <strong>cambiar de minúscula a mayúscula</strong> sin complicaciones? Usa esta herramienta gratuita para transformar tu texto con un solo clic. Es ideal para quienes buscan cómo <strong>pasar de minúscula a mayúscula en Excel</strong>, Word o cualquier otro editor de texto sin perder tiempo.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">¿Cómo funciona la herramienta?</h2>
                <ol className="list-decimal list-inside space-y-2 text-base">
                    <li>Pega tu texto en el área de entrada</li>
                    <li>Selecciona una opción: MAYÚSCULAS, minúsculas, capitalizar o tras punto</li>
                    <li>Visualiza el resultado en tiempo real</li>
                    <li>Copia el resultado o descárgalo si lo deseas</li>
                </ol>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Usos comunes</h2>
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>📄 <strong>Convertir texto en Word o Excel</strong> sin fórmulas</li>
                    <li>✏️ Revisar y mejorar la ortografía y estilo de tus escritos</li>
                    <li>🗂 Formatear títulos o encabezados para presentaciones y documentos</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">¿Y si quiero hacerlo en Excel?</h2>
                <p className="text-base mb-6 leading-relaxed">
                    Puedes usar la fórmula <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MAYUSC(A1)</code>, pero si buscas algo más simple y rápido, nuestra herramienta lo hace en un clic y sin complicaciones técnicas. Ideal para estudiantes, docentes o cualquier persona que trabaja con texto constantemente.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Beneficios de usar esta herramienta</h2>
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>🔓 100% gratis y sin registro</li>
                    <li>⚡ Conversión instantánea sin instalar nada</li>
                    <li>🧠 Fácil de usar desde celular, tablet o computador</li>
                    <li>📝 Compatible con Word, Excel, Google Docs y más</li>
                    <li>✂️ Convierte hasta 5000 caracteres en segundos</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Preguntas frecuentes</h2>
                <dl className="space-y-4">
                    <div>
                        <dt className="font-bold">¿Cómo pasar de minúscula a mayúscula?</dt>
                        <dd className="text-base mb-5">Puedes hacerlo fácilmente con esta herramienta. Si estás en Word, selecciona el texto y presiona <kbd>Shift</kbd> + <kbd>F3</kbd> para alternar entre mayúsculas, minúsculas o tipo título.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Cómo pasar de minúsculas a mayúsculas en el teclado?</dt>
                        <dd className="text-base mb-5">Selecciona el texto y presiona <kbd>Shift</kbd> + <kbd>F3</kbd> hasta que obtengas el formato que deseas. También puedes deshacer cualquier cambio con <kbd>Ctrl</kbd> + <kbd>Z</kbd>.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Qué función cambia de minúscula a mayúscula?</dt>
                        <dd className="text-base mb-5">En Excel puedes usar la fórmula <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MAYUSC(texto)</code>. Para lo contrario, usa <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MINUSC(texto)</code>.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Funciona para convertir texto en Word?</dt>
                        <dd className="text-base mb-5">Sí. Solo transforma tu texto aquí, cópialo y pégalo directamente en Word o cualquier editor de texto.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Puedo usar esta herramienta desde el celular?</dt>
                        <dd className="text-base mb-5">Totalmente. Está optimizada para dispositivos móviles y no requiere descargas.</dd>
                    </div>
                </dl>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Empieza ahora</h2>
                <p className="text-base mb-4 leading-relaxed">
                    Prueba la herramienta y convierte tu texto de <strong>minúscula a mayúscula</strong> en cuestión de segundos. Ya sea para trabajo, estudio o contenido personal, ahorrarás tiempo y esfuerzo.
                </p>
            </section>
            <div className="flex flex-col md:flex-row gap-4 justify-center pb-20 px-4 max-w-2xl mx-auto">
                <Link
                    href="https://github.com/asaumet230/textcasepro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition w-full md:w-auto md:flex-1">
                    <FaGithub className="text-xl" />
                    Ver código en GitHub
                </Link>

                <a
                    href="#conver-text-form"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto md:flex-1 text-center">
                    Comenzar a comprimir ahora
                </a>
            </div>
        </>

    )
}

export default TextCaseProDetails