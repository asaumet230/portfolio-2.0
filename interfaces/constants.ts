export interface IMenuLink {
    name: string;
    url: string;
}

export interface ITool {
    imageUrl: string;
    title: string;
    progressPercent: number;
}

export interface ISkills {
    title: string;
    content: string;
}

export interface IExperienceItem {
    company  : string;
    city     : string;
    position : string;
    year     : string;
    url      : string;
}