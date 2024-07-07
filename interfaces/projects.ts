
export interface IProject {
    name: string;
    images: string[];
    description: string;
    tecnologies: string [];
    urlApp: string;
    urlRepository: string;
    category: string;
}

export interface ProjectsResponse {
    ok: boolean;
    message: string;
    projects: IProject[];
}