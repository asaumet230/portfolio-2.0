'use client'

import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const SharpConvertDetails = () => {

  const isfilesSelected = useSelector((state: RootState) => state.imagesComponentsLoad.isSelectedFiles);

  return (

    <>
      {
        !isfilesSelected && (
          <div>
            <section className="max-w-3xl mx-3 mt-12 mb-12 px-4 sm:mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center">¿Cómo se usa nuestro convertidor de imágenes?</h2>

              <p className="text-gray-700 mb-4 dark:text-gray-300 text-justify">
                <strong>Convertir imágenes online</strong> no tiene por qué ser complicado. De hecho, en <strong>SharpConvert</strong> hemos querido que el proceso sea lo más sencillo posible, incluso para quienes no están familiarizados con herramientas digitales.
              </p>

              <p className="text-gray-700 mb-4 dark:text-gray-300 text-justify">Esto es todo lo que tienes que hacer:</p>

              <ol className="list-decimal ml-6 text-gray-700 space-y-2 mb-4 dark:text-gray-300 text-left">
                <li>
                  <strong>Selecciona tus archivos</strong>: Puedes arrastrarlos directamente o elegirlos desde tu dispositivo. Aceptamos hasta <strong>20 imágenes por carga</strong>.
                </li>
                <li>
                  <strong>Escoge el formato</strong> al que quieres convertirlas: <strong>JPG</strong>, <strong>PNG</strong>, <strong>WebP</strong>, <strong>AVIF</strong> o <strong>JPEG</strong>. Tú decides qué necesitas.
                </li>
                <li>
                  Haz clic en el botón de <strong>conversión de imágenes</strong> y espera unos segundos. Tu nuevo archivo estará listo en un abrir y cerrar de ojos.
                </li>
              </ol>

              <p className="text-gray-700 dark:text-gray-300 text-justify">
                Y si trabajas con muchas imágenes a la vez, no te preocupes: puedes <strong>descargarlas todas juntas</strong> en un archivo ZIP, para que ahorres tiempo y mantengas todo ordenado.
              </p>
            </section>

            <section className="max-w-3xl mx-3 mt-12 mb-12 px-4 sm:mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center">Formatos compatibles</h2>

              <p className="text-justify dark:text-gray-300 text-gray-700 mb-4">
                En <strong>SharpConvert</strong> trabajamos con los <strong>formatos de imagen más usados</strong> hoy en día, para que siempre tengas opciones flexibles según lo que necesites.
              </p>

              <ul className="list-disc ml-6 text-justify dark:text-gray-300 text-gray-700 space-y-2 mb-4">
                <li><strong>JPG / JPEG</strong>: el clásico. Ideal para <strong>fotografías</strong> o imágenes de uso general.</li>
                <li><strong>PNG</strong>: excelente cuando necesitas <strong>transparencia</strong> en tus imágenes, como en logos o gráficos web.</li>
                <li><strong>WebP</strong>: una opción moderna que combina <strong>compresión eficiente</strong> con muy buena calidad visual.</li>
                <li><strong>AVIF</strong>: el futuro en formatos de imagen. Ofrece <strong>mayor compresión</strong> sin perder detalle, perfecto para la web actual.</li>
              </ul>

              <p className="text-justify dark:text-gray-300 text-gray-700">
                Lo mejor es que no tienes que preocuparte por el formato de entrada. <strong>SharpConvert detecta automáticamente el tipo de archivo</strong> y te guía para transformarlo en el formato que más te convenga.
              </p>
            </section>

            <section className="max-w-3xl mx-3 mt-12 mb-12 px-4 sm:mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-center">Ventajas de usar <strong>SharpConvert</strong></h2>

              <p className="text-justify dark:text-gray-300 text-gray-700 mb-4">
                Cuando eliges <strong>SharpConvert</strong>, no solo estás usando un <strong>convertidor de imágenes online</strong>. Estás accediendo a una herramienta hecha para que el proceso sea rápido, sencillo y sin complicaciones.
              </p>

              <ul className="list-disc ml-6 space-y-3 text-justify dark:text-gray-300 text-gray-700 mb-4">
                <li>
                  <strong>Sin marcas de agua</strong>: tus imágenes salen limpias, sin logos ni textos añadidos.
                </li>
                <li>
                  <strong>Sin registro</strong>: empieza a convertir de inmediato, sin tener que crear una cuenta ni dejar tu correo.
                </li>
                <li>
                  <strong>Procesamiento rápido</strong>: gracias a la potencia de <strong>Sharp</strong>, obtienes resultados en segundos, sin perder calidad.
                </li>
                <li>
                  <strong>Interfaz intuitiva</strong>: diseñada pensando en todos, funciona perfecto en <strong>móvil</strong>, <strong>tablet</strong> o <strong>escritorio</strong>.
                </li>
                <li>
                  <strong>Soporte multiformato</strong>: puedes convertir hasta <strong>20 imágenes por carga</strong> y descargar todo junto en un archivo ZIP.
                </li>
              </ul>

              <p className="text-justify dark:text-gray-300 text-gray-700">
                En resumen, <strong>SharpConvert</strong> es tu aliado ideal para transformar imágenes sin enredos y sin limitaciones innecesarias.
              </p>
            </section>

            <section className="max-w-3xl mx-3 mt-12 mb-12 px-4 sm:mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-center">Preguntas frecuentes sobre <strong>conversión de imágenes</strong></h2>

              <div className="space-y-6 text-justify dark:text-gray-300 text-gray-700">
                <div>
                  <p className="font-semibold mb-1"><strong>¿Puedo convertir varias imágenes al mismo tiempo?</strong></p>
                  <p>
                    Sí, con <strong>SharpConvert</strong> puedes subir hasta <strong>20 imágenes</strong> en una sola sesión y descargarlas juntas al final. Ideal para ahorrar tiempo.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1"><strong>¿SharpConvert es gratuito?</strong></p>
                  <p>
                    ¡Por supuesto! Nuestro <strong>convertidor de imágenes gratuito</strong> está disponible para todos, sin registros ni funciones bloqueadas por pago.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1"><strong>¿Qué pasa con mis archivos? ¿Son seguros?</strong></p>
                  <p>
                    La <strong>seguridad de tus archivos</strong> es fundamental. No almacenamos imágenes en nuestros servidores, y todo se elimina automáticamente al finalizar la conversión.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1"><strong>¿Pierdo calidad al convertir las imágenes?</strong></p>
                  <p>
                    No. Usamos <strong>Sharp</strong>, un motor de procesamiento que permite comprimir y optimizar sin que se pierda calidad visual perceptible.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1"><strong>¿Funciona desde el móvil?</strong></p>
                  <p>
                    Sí. <strong>SharpConvert</strong> está diseñado para que funcione sin problemas en <strong>celulares</strong>, <strong>tabletas</strong> y <strong>computadores</strong>, con una interfaz adaptable.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex justify-center mt-12">
              <Link
                href="https://github.com/asaumet230/sharpconvert.git" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-3 rounded-lg font-medium shadow-md transition">
                  <FaGithub className="text-xl" />
                  Ver código en GitHub
              </Link>
            </div>

            <div className="text-center my-14">
              <a
                href="#converitor-images-form"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Comienza a convertir ahora
              </a>
            </div>

          </div>
        )
      }

    </>

  )
}

export default SharpConvertDetails