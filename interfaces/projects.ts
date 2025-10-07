export interface IPrivacyPolicy {
    effectiveDate: string;
    content: string;
}

export interface ITermsOfService {
    effectiveDate: string;
    content: string;
}

export interface IProject {
    name: string;
    slug: string;
    images: string[];
    description: string;
    longDescription?: string;
    tecnologies: string[];
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

export interface ProjectsResponse {
    ok: boolean;
    message: string;
    projects: IProject[];
    totalPages?: number;
}

export interface ProjectResponse {
    ok: boolean;
    message: string;
    project: IProject;
}