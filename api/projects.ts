import { notFound } from "next/navigation";

import { ProjectsResponse, ProjectResponse } from "@/interfaces";

export const getProjects = async (category: string): Promise<ProjectsResponse> => {

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/search/${category}`);
      const data = await res.json();
      return data;

    } catch (error) {
      console.log(error)
      notFound();
    }
  }

export const getProjectBySlug = async (slug: string): Promise<ProjectResponse> => {

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/projects/slug/${slug}`, {
        next: { revalidate: 3600 } // Revalidate cada hora
      });

      if (!res.ok) {
        notFound();
      }

      const data = await res.json();
      return data;

    } catch (error) {
      console.log(error)
      notFound();
    }
  }


  export default getProjects;