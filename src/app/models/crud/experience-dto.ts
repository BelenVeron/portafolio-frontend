export class ExperienceDto {

    degree: string;
    start: string;
    end: string;
    description: string;

    constructor(
        degree: string,
        start: string,
        end: string,
        description: string,
    ) {
        this.degree = degree;
        this.start = start;
        this.end = end;
        this.description = description;
    }
}
