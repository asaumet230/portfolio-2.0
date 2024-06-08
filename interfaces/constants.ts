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
    icon: JSX.Element
}

export interface IExperienceItem {
    company  : string;
    city     : string;
    position : string;
    year     : string;
    url      : string;
}

export interface ITestimonial {
    name        : string;
    content     : string;
    major       : string;
    image       : string;
    linkedin?   : string;
    instagram?  : string;
    twitter?    : string;
  }