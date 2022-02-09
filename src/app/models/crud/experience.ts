import { Image } from "./image";

export class Experience {

    id: number;
    degree: string;
    start: string;
    end: string;
    description: string;
    image: Image;


    constructor(
        id: number,
        degree: string,
        start: string,
        end: string,
        description: string,
        image: Image
    ) {
        this.id = id;
        this.degree = degree;
        this.start = start;
        this.end = end;
        this.description = description;
        this.image = image;
    }
}
