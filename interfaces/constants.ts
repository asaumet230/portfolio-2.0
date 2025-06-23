export interface IMenuLink {
  name: string;
  url: string;
  children?: IMenuLink[];
}

export interface ISkills {
  title: string;
  content: string;
  icon: JSX.Element
}
export interface IProjectTableColumns {
  id: string;
  title: string;
}

export interface IProjectTableRow {
  id: string;
  title: string;
  description: string;
  tecnologies: IIconTecnology[];
  repositorie: string;
  projectLink: string;
  images: string[];
}

interface IIconTecnology {
  id: string;
  icon: JSX.Element;
}


