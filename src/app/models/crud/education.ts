import { Image } from "./image";

export class Education {

    id: number | null;
    institution: string;
    degree: string;
    date: string;
    period: string;
    image: Image | null;


    constructor(
        id: number | null,
        institution: string,
        degree: string,
        date: string,
        period: string,
        image: Image | null
    ) {
        this.id = id;
        this.institution = institution;
        this.degree = degree;
        this.date = date;
        this.period = period;
        this.image = image;
    }
}
