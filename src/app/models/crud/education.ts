import { Image } from "./image";

export class Education {

    id: number;
    institution: string;
    degree: string;
    date: string;
    period: string;
    image: Image;


    constructor(
        id: number,
        institution: string,
        degree: string,
        date: string,
        period: string,
        image: Image
    ) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.date = date;
        this.period = period;
        this.image = image;
    }
}
