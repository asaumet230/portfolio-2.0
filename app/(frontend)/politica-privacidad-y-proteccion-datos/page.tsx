import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Política de Privacidad | Andres Felipe Saumet.",
    description: "Lee nuestra política de privacidad y protección de datos personales.",
    keywords: "política de privacidad, protección de datos",
    robots: "index, follow",
    openGraph: {
        title: "Política de Privacidad | Andres Felipe Saumet.",
        description: "Lee nuestra política de privacidad y protección de datos personales.",
        url: "https://www.andressaumet.com/politica-privacidad-y-proteccion-datos",
        type: "website",
        images: [
            {
                url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
                width: 800,
                height: 600,
                alt: "Política de Privacidad | Andres Felipe Saumet.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Política de Privacidad | Andres Felipe Saumet.",
        description: "Lee nuestra política de privacidad y protección de datos personales.",
        images: [
            {
                url: "https://www.andressaumet.com/_next/image?url=%2Fimages%2Fandres-saumet-dark.webp&w=1200&q=75",
                alt: "Política de Privacidad | Andres Felipe Saumet.",
            },
        ],
    },
};

export default function PoliticaPrivacidadYProteccionDatosPage() {

    return (
        <div className="mx-auto w-8/12 mt-14 mb-20 max-[640px]:w-10/12 tracking-wide leading-6 text-pretty">
            <h1 className="text-center">Política de Privacidad y Protección de Datos</h1>
            <br />
            <br />
            <h2>1. Introducción</h2>
            <br />
            <p>En <strong>Andres Felipe Saumet Desarrollador movíl y web </strong>(en adelante, nosotros), nos comprometemos a proteger la privacidad y los datos personales de nuestros usuarios (en adelante, tú). Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos tu información personal. Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política.</p>
            <br />
            <h2>2. Responsable del Tratamiento de los Datos</h2>
            <br />
            <p>El responsable del tratamiento de tus datos personales es <strong>Andres Felipe Saumet Desarrollador movíl y web </strong>, con domicilio en <strong>calle 32 No 3 - 94, Santa Marta - Colombia</strong>, y correo electrónico de contacto <strong>andressaumet@gmail.com</strong>.</p>
            <br />
            <h2>3. Datos Recopilados</h2>
            <br />
            <p>Podemos recopilar y procesar los siguientes datos personales:</p>
            <br />
            <ul className="list-disc ml-7">
                <li>Información de contacto: nombre, dirección de correo electrónico y número de teléfono.</li>
                <li>Datos de navegación: dirección IP, tipo de navegador y páginas visitadas.</li>
                <li>Información proporcionada voluntariamente: formularios de contacto o suscripción.</li>
            </ul>
            <br />

            <h2>4. Finalidades del Tratamiento</h2>
            <br />
            <p>Los datos personales recopilados serán utilizados para:</p>
            <br />
            <ul className="list-disc ml-7">
                <li>Proporcionar y mejorar nuestros servicios.</li>
                <li>Responder a tus consultas y solicitudes.</li>
                <li>Enviarte comunicaciones comerciales y promocionales, siempre que hayas dado tu consentimiento.</li>
                <li>Cumplir con obligaciones legales.</li>
            </ul>
            <br />

            <h2>5. Legitimación para el Tratamiento de Datos</h2>
            <br />
            <p>El tratamiento de tus datos personales se basa en:</p>
            <br />
            <ul className="list-disc ml-7">
                <li>Tu consentimiento explícito.</li>
                <li>La necesidad para la ejecución de un contrato.</li>
                <li>El cumplimiento de obligaciones legales.</li>
                <li>Nuestro interés legítimo en mejorar nuestros servicios.</li>
            </ul>
            <br />
            <h2>6. Derechos del Usuario</h2>
            <br />
            <p>Como usuario, tienes los siguientes derechos sobre tus datos personales:</p>
            <br />
            <ul className="list-disc ml-7">
                <li>Acceso: Solicitar una copia de los datos personales que tenemos sobre ti.</li>
                <li>Rectificación: Solicitar la corrección de datos inexactos o incompletos.</li>
                <li>Supresión: Solicitar la eliminación de tus datos personales.</li>
                <li>Oposición: Oponerte al tratamiento de tus datos personales.</li>
                <li>Portabilidad: Solicitar la transferencia de tus datos a otro responsable.</li>
                <li>Limitación: Solicitar la limitación del tratamiento de tus datos.</li>
            </ul>
            <br />
            <p>Para ejercer estos derechos, puedes contactarnos a través del correo electrónico <strong>andressaumet@gmail.com</strong>.</p>
            <br />
            <h2>7. Seguridad de los Datos</h2>
            <br />
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado, la pérdida, el uso indebido o la divulgación.</p>
            <br />
            <h2>8. Transferencias Internacionales de Datos</h2>
            <br />
            <p>Tus datos personales pueden ser transferidos y tratados en países fuera del Espacio Económico Europeo (EEE) y Latinoamérica. Nos aseguraremos de que dichas transferencias se realicen con las garantías adecuadas.</p>
            <br />
            <h2>9. Cookies</h2>
            <br />
            <p>Nuestro sitio web utiliza cookies para mejorar tu experiencia de usuario. Puedes obtener más información sobre el uso de cookies en nuestra <Link href="terminos-y-condiciones" className="hover:text-secondary-color"><strong>términos y condiciones</strong></Link>.</p>
            <br />
            <h2>10. Cambios en la Política de Privacidad</h2>
            <br />
            <p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página.</p>
            <br />
            <h2>11. Contacto</h2>
            <br />
            <p>Si tienes alguna pregunta o inquietud sobre nuestra Política de Privacidad, por favor contáctanos a través del correo electrónico <strong>andressaumet@gmail.com</strong>.</p>
        </div>
    );
}