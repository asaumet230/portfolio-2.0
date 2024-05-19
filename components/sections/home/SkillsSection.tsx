import { Separator } from '@/components/ui';
import { 
    FaBrain, 
    FaClock, 
    FaComments, 
    FaGraduationCap, 
    FaLightbulb, 
    FaUsers,
 } from 'react-icons/fa';

 import { skillsData } from '@/helpers';

import styles from './homeSections.module.css';

const icons: JSX.Element[] = [ 
    <FaBrain size={24} color="white" key='1a'/> ,
    <FaUsers  size={24} color="white" key='2b'/>,
    <FaComments size={24} color="white" key='3d'/>,
    <FaClock size={24} color="white" key='4e' />,
    <FaLightbulb size={24} color="white" key='5f'/>,
    <FaGraduationCap size={24} color="white" key='6g'/>
]


export const SkillsSection = () => {
    return (
        <section className="mt-14">
            <div className="section">
                <h2 className="text-4xl text-center mb-1 max-[920px]:text-3xl max-[920px]:mb-0">Habilidades</h2>
                <div className="flex justify-center">
                    <Separator />
                </div>
                <p className="w-10/12 text-center mx-auto max-[920px]:w-full">Descubre mis habilidades blandas. Son un conjunto que complementa mi experiencia técnica, además son esenciales para el éxito en cualquier proyecto tecnológico.</p>

                <div className="grid grid-cols-3 mt-9 mb-10 gap-4 mx-auto max-[920px]:grid-cols-2">
                    {
                        skillsData.map((skill, i)=> (
                            <div className={`flex flex-col justify-center items-center px-5 py-8 h-80 max-[920px]:px-2 ${ styles['skill-action'] }`} key={i}>
                            <div style={{
                                backgroundImage: "url('/images/background-title-skills.webp')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            { icons[i] }
                            </div>
                            <h3 className="my-3 text-center capitalize max-[920px]:text-base">{skill.title}</h3>
                            <p className="text-center text-sm">{skill.content}</p>
                        </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default SkillsSection;