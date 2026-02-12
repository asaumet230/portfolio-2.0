import { notFound } from "next/navigation";

import { ToolResponse } from "@/interfaces";

export const getTools = async (): Promise<ToolResponse> => {

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/tools`, {
            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Herramientas obtenidas correctamente',
            tools: data.tools,
        };

    } catch (error) {
        console.log(error);
        notFound();
    }
}

export default getTools;
