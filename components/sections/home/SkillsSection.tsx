import { Separator } from '@/components/ui';
import {
    FaBrain,
    FaClock,
    FaComments,
    FaGraduationCap,
    FaLightbulb,
    FaUsers,
} from 'react-icons/fa';

import { ISkills } from '@/interfaces';

import styles from './homeSections.module.css';


const skillsData: ISkills[] = [

    {
        title: 'pensamiento crítico',
        content: 'Aptitud para analizar situaciones o problemas, identificar patrones y explorar soluciones basadas en una evaluación lógica y detallada.',
        icon: <FaBrain size={24} color="white" />,
    },
    {
        title: 'trabajo en equipo',
        content: 'Experiencia trabajando en equipos multidisciplinarios y habilidad para colaborar y apoyar a los compañeros en la consecución de metas comunes.',
        icon: <FaUsers size={24} color="white" />,
    },
    {
        title: 'comunicación efectiva',
        content: 'Capacidad para explicar conceptos técnicos de manera clara a audiencias no técnicas y colaborar efectivamente con colegas y clientes.',
        icon: <FaComments size={24} color="white" />,
    },
    {
        title: 'gestión del tiempo',
        content: 'Competencia para manejar múltiples tareas y proyectos al mismo tiempo, priorizando eficazmente para cumplir con los plazos establecidos.',
        icon: <FaClock size={24} color="white" />,
    },
    {
        title: 'creatividad',
        content: 'Capacidad para pensar fuera de lo establecido y generar ideas innovadoras que pueden traducirse en mejoras de productos.',
        icon: <FaLightbulb size={24} color="white" />,
    },
    {
        title: 'aprendizaje continuo',
        content: 'Compromiso con el desarrollo personal y profesional, buscando constantemente ampliar conocimientos y habilidades.',
        icon: <FaGraduationCap size={24} color="white" />
    },
];



export const SkillsSection = () => {


    return (
        <section className="mt-20">
            <div className="section">
                <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Habilidades</h2>
                <div className="flex justify-center">
                    <Separator />
                </div>
                <p className="w-11/12 text-center mx-auto max-[920px]:w-full">Mis habilidades blandas son un conjunto que complementa mi experiencia técnica, además son esenciales para el éxito en cualquier proyecto tecnológico.</p>

                <div className="grid grid-cols-3 mt-9 mb-10 gap-4 mx-auto max-[920px]:grid-cols-2">
                    {
                        skillsData.map(({title, content, icon,}) => (
                            <div className={`flex flex-col justify-center items-center px-8 py-8 h-80 max-[920px]:p-2 ${styles['skill-action']} ${styles['skill-cursor']}`} key={title}>
                                <div style={{
                                    backgroundImage: "url('/images/background-title-skills.webp')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {icon}
                                </div>
                                <h3 className="my-3 text-center text-xl capitalize max-[920px]:text-base max-[620px]:text-sm">{title}</h3>
                                <p className="text-center text-sm font-light">{content}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default SkillsSection;