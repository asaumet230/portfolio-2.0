export interface IProject {
    _id?: string;
    name: string;
    slug: string;
    images: string[];
    description: string;
    longDescription?: string;
    technologies: string[];
    urlApp: string;
    urlRepository: string;
    category: string;
    hasPrivacyPolicy: boolean;
    privacyPolicy?: IPrivacyPolicy;
    termsOfService?: ITermsOfService;
    urlAppleStore?: string;
    urlPlayStore?: string;
    projectGoal?: string;
}

export interface IPrivacyPolicy {
    content: string;
    effectiveDate: string;
}

export interface ITermsOfService {
    content: string;
    effectiveDate: string;
}

export interface ProjectsResponse {
    ok: boolean;
    message: string;
    projects: IProject[];
    totalPages: number;
}

export interface ProjectResponse {
    ok: boolean;
    project: IProject;
}

export interface CreateProjectDTO {
    name: string;
    slug: string;
    images: string[];
    description: string;
    longDescription?: string;
    technologies: string[];
    urlApp: string;
    urlRepository: string;
    category: string;
    hasPrivacyPolicy: boolean;
    privacyPolicy?: IPrivacyPolicy;
    termsOfService?: ITermsOfService;
    urlAppleStore?: string;
    urlPlayStore?: string;
    projectGoal?: string;
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {}
