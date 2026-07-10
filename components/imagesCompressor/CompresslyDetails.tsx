import Link from "next/link";

import { FaGithub } from "react-icons/fa6";


export const CompresslyDetails = () => {

    return (
        <>
            <section className="max-w-3xl mx-auto px-4 py-10">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Comprime tus imágenes sin que salgan de tu navegador
                </h2>

                <p className="text-base md:text-lg mb-6 leading-relaxed">
                    <strong>Compressly</strong> es un compresor de imágenes online y gratuito que reduce el peso de tus fotos en formato <strong>JPG, PNG, WebP y AVIF</strong> manteniendo una buena calidad visual. A diferencia de otras herramientas, aquí no subes nada a ningún servidor: toda la compresión ocurre directamente en tu navegador, por lo que tus imágenes nunca salen de tu dispositivo. Sin registro, sin marcas de agua y sin límites de uso.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">¿Cómo comprimir imágenes online gratis?</h2>
                <ol className="list-decimal list-inside space-y-2 text-base">
                    <li>Sube una o varias imágenes, o arrástralas directamente a la plataforma.</li>
                    <li>Elige el nivel de compresión: alta calidad, recomendado, máxima compresión o un tamaño exacto en KB. Si lo necesitas, activa también el redimensionado.</li>
                    <li>Revisa el peso original, el peso final y el porcentaje de ahorro de cada imagen.</li>
                    <li>Descarga cada imagen por separado o todas juntas en un ZIP.</li>
                </ol>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Comprimir JPG online</h2>
                <p className="text-base mb-6 leading-relaxed">
                    El formato JPG (o JPEG) es el estándar para fotografías: cámaras, celulares y redes sociales lo usan por defecto. Comprimir un JPG reduce su peso de forma muy eficiente, lo que lo hace ideal para acelerar tu página web, aligerar un ecommerce con muchas fotos de producto o enviar imágenes por correo sin superar los límites de adjuntos. Puedes comprimir una imagen JPG suelta o hasta 20 a la vez.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Comprimir PNG online</h2>
                <p className="text-base mb-6 leading-relaxed">
                    PNG es el formato preferido para imágenes con transparencia, logos, capturas de pantalla y gráficos con texto o líneas definidas. Suele generar archivos más pesados que JPG, así que comprimirlo marca una gran diferencia: una captura de varias megas puede quedar en una fracción de su peso conservando la nitidez que este formato necesita.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Comprimir WebP y AVIF online</h2>
                <p className="text-base mb-6 leading-relaxed">
                    WebP y AVIF son los formatos modernos de la web: logran más calidad con menos peso y Google los recomienda para mejorar la velocidad de carga y los Core Web Vitals. Compressly no solo los comprime, sino que es de las pocas herramientas gratuitas que acepta <strong>AVIF</strong> directamente. Si además necesitas cambiar de formato, usa nuestro <Link href="/herramientas/convertidor-de-imagenes" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">convertidor de imágenes</Link>.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Comprimir una imagen a 100 KB, 500 KB o el tamaño que necesites</h2>
                <p className="text-base mb-6 leading-relaxed">
                    ¿Un formulario te pide que la foto pese menos de 100 KB? Es el requisito típico de trámites, matrículas, hojas de vida y plataformas del gobierno. Con la opción de <strong>tamaño exacto</strong> eliges el peso objetivo (100 KB, 500 KB, 1 MB o el valor que escribas) y la herramienta ajusta la compresión para acercarse lo máximo posible, sin que tengas que adivinar niveles de calidad.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">¿Comprimir una imagen o reducir su tamaño? Aquí puedes hacer ambas</h2>
                <p className="text-base mb-6 leading-relaxed">
                    <strong>Comprimir</strong> reduce el peso del archivo (los KB o MB que ocupa). <strong>Redimensionar</strong> cambia el ancho y alto en píxeles, por ejemplo de 4000×3000 a 1920×1440. Si tu problema es que la imagen "pesa mucho" para subirla o enviarla, con comprimirla basta. Y si además quieres reducir sus dimensiones —por ejemplo para una web que no necesita fotos de 4000 píxeles—, activa la opción de <strong>redimensionar</strong> y elige el lado más largo: 1920, 1280 u 800 píxeles, siempre manteniendo la proporción original.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Elimina los metadatos de tus fotos automáticamente</h2>
                <p className="text-base mb-6 leading-relaxed">
                    Las fotos que tomas con el celular guardan metadatos EXIF: la ubicación GPS exacta, la fecha, la hora y el modelo de tu cámara. Al comprimir con Compressly, la imagen se vuelve a generar desde cero y <strong>esos metadatos se eliminan automáticamente</strong>. Además de pesar menos, tus fotos salen limpias de información personal — una capa extra de privacidad antes de publicarlas en redes o enviarlas a desconocidos.
                </p>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Usos comunes del compresor de imágenes</h2>
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>Optimizar fotos para que tu página web cargue más rápido.</li>
                    <li>Reducir el peso de una foto antes de enviarla por WhatsApp o correo.</li>
                    <li>Cumplir el límite de KB de formularios, trámites y plataformas oficiales.</li>
                    <li>Aligerar imágenes de producto para ecommerce.</li>
                    <li>Preparar imágenes para blogs y redes sociales.</li>
                    <li>Liberar espacio en tu celular o computador.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Beneficios de usar Compressly</h2>
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li>🔐 Privacidad total: tus imágenes se procesan en tu navegador y nunca se suben a un servidor.</li>
                    <li>🆓 Gratis, sin registro y sin marcas de agua.</li>
                    <li>🖼 Compatible con JPG, JPEG, PNG, WebP y AVIF.</li>
                    <li>🎚 Cuatro niveles de compresión, incluido el tamaño exacto en KB.</li>
                    <li>📐 Redimensionado opcional a 1920, 1280 u 800 píxeles.</li>
                    <li>🕵️ Elimina los metadatos EXIF (ubicación GPS, fecha, cámara) al comprimir.</li>
                    <li>📊 Muestra el peso original, el peso final y el porcentaje de ahorro.</li>
                    <li>🔍 Comparador visual antes/después para verificar la calidad.</li>
                    <li>📤 Comparte la imagen comprimida por WhatsApp o correo desde el celular.</li>
                    <li>📥 Descarga individual o todas las imágenes en ZIP.</li>
                    <li>📱 Funciona desde celular, tablet o computador.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Preguntas frecuentes</h2>
                <dl className="space-y-4">
                    <div>
                        <dt className="font-bold">¿Cómo comprimir una imagen gratis?</dt>
                        <dd className="text-base mb-5">Sube tu imagen JPG, PNG, WebP o AVIF, elige el nivel de compresión y descárgala optimizada en segundos. Es gratis, no requiere registro y todo ocurre en tu navegador.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Cómo comprimir un JPG online?</dt>
                        <dd className="text-base mb-5">Arrastra tus archivos JPG o JPEG a la herramienta, selecciona el nivel de compresión que prefieras y descarga cada imagen o todas juntas en un ZIP.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Cómo reducir el peso de una foto a 100 KB o menos?</dt>
                        <dd className="text-base mb-5">Selecciona la opción de tamaño exacto, elige 100 KB (o escribe el valor que necesites) y la herramienta ajustará la compresión para acercarse lo máximo posible a ese peso. Ideal para trámites y formularios con límite de tamaño.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Qué diferencia hay entre comprimir y redimensionar una imagen?</dt>
                        <dd className="text-base mb-5">Comprimir reduce el peso del archivo (KB o MB); redimensionar cambia el ancho y alto en píxeles. Esta herramienta hace ambas cosas: comprime el archivo y, si lo deseas, también puedes redimensionarlo eligiendo el tamaño máximo del lado más largo (1920, 1280 u 800 píxeles).</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Puedo redimensionar la imagen además de comprimirla?</dt>
                        <dd className="text-base mb-5">Sí. Junto al nivel de compresión hay una opción de redimensionar que ajusta el lado más largo de la imagen a 1920, 1280 u 800 píxeles, manteniendo la proporción original. Si eliges &quot;Original&quot;, las dimensiones no cambian.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿La herramienta elimina los metadatos EXIF de las fotos?</dt>
                        <dd className="text-base mb-5">Sí. Al comprimir, la imagen se vuelve a generar y los metadatos EXIF —incluida la ubicación GPS, la fecha y los datos de la cámara— se eliminan automáticamente. Es una capa extra de privacidad antes de compartir tus fotos.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Puedo comprimir varias imágenes a la vez?</dt>
                        <dd className="text-base mb-5">Sí, puedes subir hasta 20 imágenes por lote, de máximo 18 MB cada una, y comprimirlas todas en una sola pasada.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Se pierde calidad al comprimir una imagen?</dt>
                        <dd className="text-base mb-5">La compresión reduce el peso del archivo manteniendo una buena calidad visual. En el nivel recomendado la diferencia es prácticamente imperceptible; en máxima compresión se prioriza el menor peso posible.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Qué formatos de imagen soporta?</dt>
                        <dd className="text-base mb-5">JPG, JPEG, PNG, WebP y AVIF.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Puedo descargar todas las imágenes en ZIP?</dt>
                        <dd className="text-base mb-5">Sí. Puedes descargar cada imagen comprimida por separado o todas juntas en un único archivo ZIP.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Funciona desde el celular?</dt>
                        <dd className="text-base mb-5">Sí, funciona en cualquier navegador de celular, tablet o computador, sin instalar aplicaciones.</dd>
                    </div>
                    <div>
                        <dt className="font-bold">¿Mis imágenes se suben a algún servidor?</dt>
                        <dd className="text-base mb-5">No. Toda la compresión se realiza directamente en tu navegador: tus imágenes nunca salen de tu dispositivo, lo que garantiza tu privacidad.</dd>
                    </div>
                </dl>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Más herramientas gratuitas</h2>
                <p className="text-base mb-4 leading-relaxed">
                    Si necesitas cambiar el formato de tus fotos, prueba el <Link href="/herramientas/convertidor-de-imagenes" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">convertidor de imágenes</Link>; para dar formato a tus textos está el <Link href="/herramientas/mayusculas-minusculas" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">convertidor de mayúsculas y minúsculas</Link>, y en <Link href="/herramientas" className="text-blue-600 dark:text-blue-400 underline hover:no-underline">herramientas online gratis</Link> encuentras el catálogo completo.
                </p>

            </section>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-20 px-4 max-w-2xl mx-auto">
                <Link
                    href="https://github.com/asaumet230/compressly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition w-full md:w-auto md:flex-1">
                    <FaGithub className="text-xl" />
                    Ver código en GitHub
                </Link>

                <a
                    href="#compress-images-form"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full md:w-auto md:flex-1 text-center">
                    Comenzar a comprimir ahora
                </a>
            </div>
        </>


    )
}

export default CompresslyDetails;
