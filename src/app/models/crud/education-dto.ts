import { Image } from "./image";
export class EducationDto {

    institution: string;
    degree: string;
    date: string;
    period: string;
    image: Image;


    constructor(
        institution: string,
        degree: string,
        date: string,
        period: string,
        image: Image
    ) {
        this.institution = institution;
        this.degree = degree;
        this.date = date;
        this.period = period;
        this.image = image;
    }
}
