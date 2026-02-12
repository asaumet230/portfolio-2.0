import { notFound } from "next/navigation";
import { ToolResponse } from "@/interfaces";

export const getTools = async (): Promise<ToolResponse> => {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 segundo timeout

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/tools`, {
            signal: controller.signal,
            next: {
                revalidate: 86400, // 24 horas en segundos
            }
        });
        
        clearTimeout(timeout);
        const data = await res.json();
        
        return {
            ok: data.ok,
            message: data.message || 'Herramientas obtenidas correctamente',
            tools: data.tools || [],
        };

    } catch (error) {
        console.log('Error fetching tools:', error);
        // Retorna array vacío en lugar de notFound() para no bloquear la compilación
        return {
            ok: false,
            message: 'Error al obtener herramientas',
            tools: [],
        };
    }
}

export default getTools;
