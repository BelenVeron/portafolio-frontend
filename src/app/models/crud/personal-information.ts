import { Image } from "./image";
export class PersonalInformation {

    id: number;
    name: string;
    degree: string;
    summary: string;
    image: Image;


    constructor(
        id: number,
        name: string,
        degree: string,
        summary: string,
        image: Image
    ) {
        this.id = id;
        this.name = name;
        this.degree = degree;
        this.summary = summary;
        this.image = image;
    }
}
