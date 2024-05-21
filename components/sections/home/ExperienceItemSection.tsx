'use client'

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { IExperienceItem } from '@/interfaces';


export const ExperienceItemSection: FC<IExperienceItem> = ({ company, city, position, year, url }) => {

    const { push }= useRouter();

    return (
        <tr className="border-b border-b-gray-200 hover:transition-all hover:bg-gray-100 hover:cursor-pointer" onClick={ ()=> push(url) }>
            <td className="font-light pt-6 pb-6 pl-2 capitalize"><span className="font-semibold capitalize hover:text-gray-400">{company} </span>{` /  ${city}`}</td>
            <td className="font-light pt-6 pb-6 capitalize">{position}</td>
            <td className="font-semibold pt-6 pb-6">{year}</td>
        </tr>
    )
}

export default ExperienceItemSection;