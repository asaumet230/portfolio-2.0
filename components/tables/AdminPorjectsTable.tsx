import { IProjectTableColumns, IProjectTableRow } from "@/interfaces";
import { ProjectTableRow } from './ProjectTableRow';

interface Props {
    columnsTitle: IProjectTableColumns[];
    projects: IProjectTableRow[];
}

export const AdminPorjectsTable = ({ columnsTitle, projects }: Props) => {

    return (

        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="bg-gray-100">
                    <tr className="text-left">
                        {
                            columnsTitle.map(({ title, id }) => (
                                <th
                                    className="p-2 capitalize"
                                    key={id}>{title}</th>
                            ))
                        }
                        <th className="p-2 capitalize"> Editar</th>
                        <th className="p-2 capitalize"> Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((project) => (
                            <ProjectTableRow
                                tableInfo={project}
                                key={project.id} />
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}

export default AdminPorjectsTable;