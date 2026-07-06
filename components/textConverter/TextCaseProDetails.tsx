import Link from "next/link";

import { FaGithub } from "react-icons/fa6";

import { toJsonLd } from "@/helpers";

const faqs = [
    {
        question: '¿Cómo pasar de minúscula a mayúscula?',
        answer: 'Puedes hacerlo fácilmente con esta herramienta. Pega tu texto, selecciona la opción MAYÚSCULAS y copia el resultado convertido.',
    },
    {
        question: '¿Cómo pasar de mayúsculas a minúsculas?',
        answer: 'Pega el texto escrito en mayúsculas y selecciona la opción minúsculas. La herramienta convertirá todas las letras grandes en letras pequeñas automáticamente.',
    },
    {
        question: '¿Cómo pasar de minúsculas a mayúsculas en el teclado?',
        answer: 'En algunos programas como Word puedes seleccionar el texto y presionar Shift + F3. También puedes usar esta herramienta online para hacerlo sin depender del teclado o del programa que estés usando.',
    },
    {
        question: '¿Qué función cambia de minúscula a mayúscula en Excel?',
        answer: 'En Excel puedes usar =MAYUSC(texto) para convertir texto a mayúsculas. Para convertir a minúsculas puedes usar =MINUSC(texto).',
    },
    {
        question: '¿Funciona para convertir texto en Word?',
        answer: 'Sí. Puedes convertir el texto aquí, copiarlo y pegarlo directamente en Word, Google Docs, Excel, PowerPoint o cualquier editor de texto.',
    },
    {
        question: '¿La herramienta conserva tildes y la letra ñ?',
        answer: 'Sí. El convertidor mantiene caracteres especiales del español como tildes, diéresis y la letra ñ mientras transforma el texto al formato seleccionado.',
    },
    {
        question: '¿Puedo usar esta herramienta desde el celular?',
        answer: 'Sí. La herramienta está optimizada para dispositivos móviles y funciona desde el navegador, sin instalar aplicaciones.',
    },
    {
        question: '¿Es gratis el convertidor de mayúsculas y minúsculas?',
        answer: 'Sí. Puedes usarlo gratis, sin registro y desde cualquier dispositivo con conexión a internet.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
        },
    })),
};

export const TextCaseProDetails = () => {

    return (

        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
            />
            <section className="max-w-3xl mx-auto px-4 pt-16 pb-10">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Convertidor de mayúsculas y minúsculas online
                </h2>

                <p className="text-base md:text-lg mb-6 leading-relaxed">
                    Usa este <strong>convertidor de mayúsculas y minúsculas</strong> para transformar cualquier texto en segundos. Puedes <strong>pasar de minúscula a mayúscula</strong>, convertir <strong>mayúsculas a minúsculas</strong>, capitalizar palabras, aplicar formato de oración o preparar títulos de forma rápida y gratuita.
                </p>

                <p className="text-base md:text-lg mb-6 leading-relaxed">
                    Solo pega tu texto, selecciona el formato que necesitas y copia el resultado al instante. Esta herramienta es ideal para estudiantes, docentes, redactores, creadores de contenido y personas que trabajan con textos en Word, Excel, Google Docs o cualquier editor.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo funciona el convertidor?
                </h2>

                <ol className="list-decimal list-inside space-y-2 text-base">
                    <li>Pega tu texto en el área de entrada.</li>
                    <li>Selecciona una opción: MAYÚSCULAS, minúsculas, tipo oración o capitalizar.</li>
                    <li>Visualiza el resultado en tiempo real.</li>
                    <li>Copia el texto convertido o descárgalo si lo necesitas.</li>
                </ol>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    Tipos de conversión disponibles
                </h2>

                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>
                        <strong>MAYÚSCULAS:</strong> convierte todo el texto a letras grandes.
                    </li>
                    <li>
                        <strong>minúsculas:</strong> transforma todo el texto a letras pequeñas.
                    </li>
                    <li>
                        <strong>Tipo oración:</strong> coloca en mayúscula la primera letra después de cada punto.
                    </li>
                    <li>
                        <strong>Capitalizar Cada Palabra:</strong> convierte la primera letra de cada palabra en mayúscula, ideal para encabezados, nombres de documentos, títulos y presentaciones.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    Usos comunes del convertidor de mayúsculas y minúsculas
                </h2>

                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>📄 <strong>Convertir texto en Word, Excel o Google Docs</strong> sin usar fórmulas.</li>
                    <li>🎓 Formatear trabajos académicos, tareas, documentos escolares o universitarios.</li>
                    <li>🛒 Preparar títulos de productos para ecommerce, catálogos o publicaciones.</li>
                    <li>📱 Organizar textos para redes sociales, descripciones, biografías o anuncios.</li>
                    <li>🗂 Formatear títulos, encabezados, nombres, listas o bases de datos.</li>
                    <li>💼 Mejorar la presentación de informes, propuestas y documentos laborales.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo convertir minúsculas a mayúsculas?
                </h2>

                <p className="text-base mb-6 leading-relaxed">
                    Para <strong>convertir minúsculas a mayúsculas</strong>, pega tu texto en la herramienta y selecciona la opción <strong>MAYÚSCULAS</strong>. El sistema transformará automáticamente todas las letras pequeñas en letras grandes, sin modificar el contenido original del texto.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo convertir mayúsculas a minúsculas?
                </h2>

                <p className="text-base mb-6 leading-relaxed">
                    Si tienes un texto escrito completamente en MAYÚSCULAS y quieres pasarlo a minúsculas, solo debes pegarlo en el convertidor y elegir la opción <strong>minúsculas</strong>. Es útil para corregir textos copiados, títulos mal formateados o documentos escritos con bloqueo de mayúsculas activado.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo cambiar mayúsculas y minúsculas en Excel?
                </h2>

                <p className="text-base mb-6 leading-relaxed">
                    En Excel puedes usar la fórmula <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MAYUSC(A1)</code> para convertir texto a mayúsculas. Para pasar texto a minúsculas puedes usar <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MINUSC(A1)</code>. También puedes usar <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=NOMPROPIO(A1)</code> para colocar en mayúscula la primera letra de cada palabra.
                </p>

                <p className="text-base mb-6 leading-relaxed">
                    Si no quieres usar fórmulas, esta herramienta te permite cambiar mayúsculas y minúsculas online en un solo clic. Solo copias el resultado y lo pegas nuevamente en Excel.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo cambiar mayúsculas y minúsculas en Word?
                </h2>

                <p className="text-base mb-6 leading-relaxed">
                    En Word puedes seleccionar el texto y presionar <kbd>Shift</kbd> + <kbd>F3</kbd> para alternar entre mayúsculas, minúsculas y tipo título. También puedes usar este convertidor online si prefieres transformar el texto rápidamente y copiarlo listo para pegar en tu documento.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    ¿Cómo cambiar mayúsculas y minúsculas en Google Docs?
                </h2>

                <p className="text-base mb-6 leading-relaxed">
                    En Google Docs puedes ir a <strong>Formato &gt; Texto &gt; Uso de mayúsculas</strong> y elegir entre minúsculas, MAYÚSCULAS o Tipo Título. Sin embargo, si buscas una opción más rápida, puedes pegar tu texto en esta herramienta y convertirlo online sin entrar a menús adicionales.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    Beneficios de usar esta herramienta
                </h2>

                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>🔓 100% gratis y sin registro.</li>
                    <li>⚡ Conversión instantánea sin instalar programas.</li>
                    <li>🧠 Fácil de usar desde celular, tablet o computador.</li>
                    <li>📝 Compatible con Word, Excel, Google Docs y otros editores.</li>
                    <li>✂️ Convierte textos largos de forma rápida.</li>
                    <li>📋 Permite copiar el resultado en segundos.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    Preguntas frecuentes
                </h2>

                <dl className="space-y-4">
                    <div>
                        <dt className="font-bold">
                            ¿Cómo pasar de minúscula a mayúscula?
                        </dt>
                        <dd className="text-base mb-5">
                            Puedes hacerlo fácilmente con esta herramienta. Pega tu texto, selecciona la opción <strong>MAYÚSCULAS</strong> y copia el resultado convertido.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Cómo pasar de mayúsculas a minúsculas?
                        </dt>
                        <dd className="text-base mb-5">
                            Pega el texto escrito en mayúsculas y selecciona la opción <strong>minúsculas</strong>. La herramienta convertirá todas las letras grandes en letras pequeñas automáticamente.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Cómo pasar de minúsculas a mayúsculas en el teclado?
                        </dt>
                        <dd className="text-base mb-5">
                            En algunos programas como Word puedes seleccionar el texto y presionar <kbd>Shift</kbd> + <kbd>F3</kbd>. También puedes usar esta herramienta online para hacerlo sin depender del teclado o del programa que estés usando.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Qué función cambia de minúscula a mayúscula en Excel?
                        </dt>
                        <dd className="text-base mb-5">
                            En Excel puedes usar <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MAYUSC(texto)</code> para convertir texto a mayúsculas. Para convertir a minúsculas puedes usar <code className="bg-gray-100 px-1 py-0.5 rounded dark:text-gray-900">=MINUSC(texto)</code>.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Funciona para convertir texto en Word?
                        </dt>
                        <dd className="text-base mb-5">
                            Sí. Puedes convertir el texto aquí, copiarlo y pegarlo directamente en Word, Google Docs, Excel, PowerPoint o cualquier editor de texto.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿La herramienta conserva tildes y la letra ñ?
                        </dt>
                        <dd className="text-base mb-5">
                            Sí. El convertidor mantiene caracteres especiales del español como tildes, diéresis y la letra ñ mientras transforma el texto al formato seleccionado.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Puedo usar esta herramienta desde el celular?
                        </dt>
                        <dd className="text-base mb-5">
                            Sí. La herramienta está optimizada para dispositivos móviles y funciona desde el navegador, sin instalar aplicaciones.
                        </dd>
                    </div>

                    <div>
                        <dt className="font-bold">
                            ¿Es gratis el convertidor de mayúsculas y minúsculas?
                        </dt>
                        <dd className="text-base mb-5">
                            Sí. Puedes usarlo gratis, sin registro y desde cualquier dispositivo con conexión a internet.
                        </dd>
                    </div>
                </dl>

                <h2 className="text-2xl font-semibold mt-10 mb-4">
                    Empieza ahora
                </h2>

                <p className="text-base mb-4 leading-relaxed">
                    Prueba el <strong>convertidor de mayúsculas y minúsculas</strong> y transforma tu texto en segundos. Puedes convertir de <strong>minúscula a mayúscula</strong>, de <strong>mayúscula a minúscula</strong>, aplicar formato de oración o capitalizar palabras de forma rápida y sencilla.
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
                    Comenzar a convertir ahora
                </a>
            </div>
        </>

    )
}

export default TextCaseProDetails
