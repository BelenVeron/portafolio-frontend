import { Image } from "./image";

export class Project {

    id: number | null;
    name: string;
    description: string;
    date: string;
    link: string;
    image: Image | null;


    constructor(
        id: number | null,
        name: string,
        description: string,
        date: string,
        link: string,
        image: Image | null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.link = link;
        this.image = image;
    }
}
