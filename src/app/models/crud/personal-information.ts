export class PersonalInformation {

    id: number;
    name: string;
    picture: string;
    degree: string;
    summary: string;


    constructor(
        id: number,
        name: string,
        picture: string,
        degree: string,
        summary: string
    ) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.degree = degree;
        this.summary = summary;
    }
}
