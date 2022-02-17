import { Image } from "./image";
export class PersonalInformationDto {

    name: string;
    degree: string;
    summary: string;
    image: Image;


    constructor(
        name: string,
        degree: string,
        summary: string,
        image: Image
    ) {
        this.name = name;
        this.degree = degree;
        this.summary = summary;
        this.image = image;
    }
}
