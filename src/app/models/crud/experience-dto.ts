import { Image } from "./image";

export class ExperienceDto {

    degree: string;
    start: string;
    end: string;
    description: string;
    image: Image;


    constructor(
        degree: string,
        start: string,
        end: string,
        description: string,
        image: Image
    ) {
        this.degree = degree;
        this.start = start;
        this.end = end;
        this.description = description;
        this.image = image;
    }
}
