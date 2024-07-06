export interface IExperience {
    company  : string;
    city     : string;
    position : string;
    year     : number;
    url      : string;
}

export interface ExperiencesResponse {
    ok: boolean;
    message: string;
    experiences: IExperience[];
}