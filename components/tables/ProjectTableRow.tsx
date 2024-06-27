import Link from "next/link";
import Image from "next/image";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

import { IProjectTableRow } from "@/interfaces";

interface Props {
    tableInfo: IProjectTableRow;
}

export const ProjectTableRow = ({ tableInfo }: Props ) => {

   const { title, description, tecnologies, repositorie, projectLink, images } = tableInfo;

    return (
        <tr className="capitalize font-light">
            <td className="p-4">{title}</td>
            <td className="p-4">
                {`${description.slice(0, 100)}...`}</td>
            <td  className="w-24 h-full">
                {
                    <div key={tecnologies[0].id} className="flex justify-center">
                        {tecnologies[0].icon}
                    </div>
                }
            </td>
            <td className="p-4">
                <a href={repositorie} className="hover:text-blue-600">
                    {`${repositorie.slice(1,20)}...`}
                </a>
            </td>
            <td className="p-4">
                <a href={projectLink} className="hover:text-blue-600">
                {`${projectLink.slice(0,20)}...`}
                </a>
            </td>
            <td className="w-24 h-full">
                {
                    <div key={images[0]} className="flex justify-center">
                        <Image
                            src={images[0]}
                            alt={images[0]}
                            className="images"
                            width={60}
                            height={60} />
                    </div>
                }
            </td>
            <td className="p-4">
                <Link href={"#"} className="flex items-center hover:text-green-600">
                    Editar
                    <MdOutlineEdit />
                </Link>
            </td>
            <td className="p-4">
                <Link href={"#"} className="flex items-center hover:text-red-600">
                    Eliminar
                    <MdDeleteOutline />
                </Link>
            </td>
        </tr>
    )
}
