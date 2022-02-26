import { Image } from "./image";
export class PersonalInformation {

    id: number | null;
    name: string;
    degree: string;
    summary: string;
    image: Image | null;


    constructor(
        id: number | null,
        name: string,
        degree: string,
        summary: string,
        image: Image | null
    ) {
        this.id = id;
        this.name = name;
        this.degree = degree;
        this.summary = summary;
        this.image = image;
    }
}
