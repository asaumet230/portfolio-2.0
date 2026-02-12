import { notFound } from "next/navigation";

import { ProjectsResponse, ProjectResponse } from "@/interfaces";

export const getProjects = async (category: string): Promise<ProjectsResponse> => {

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/category/${category}`);
      const data = await res.json();
      
      return {
        ok: data.ok,
        message: data.message || 'Proyectos obtenidos correctamente',
        projects: data.projects,
        totalPages: data.totalPages,
      };

    } catch (error) {
      console.log(error)
      notFound();
    }
  }

export const getProjectBySlug = async (slug: string): Promise<ProjectResponse> => {

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/${slug}`, {
        next: { revalidate: 3600 } // Revalidate cada hora
      });

      if (!res.ok) {
        notFound();
      }

      const data = await res.json();
      
      return {
        ok: data.ok,
        message: data.message || 'Proyecto obtenido correctamente',
        project: data.project,
      };

    } catch (error) {
      console.log(error)
      notFound();
    }
  }


  export default getProjects;
