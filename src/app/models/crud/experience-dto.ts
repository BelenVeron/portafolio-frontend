export class ExperienceDto {

    degree: string;
    start: string;
    end: string;
    inProgress: boolean;
    description: string;
    
    constructor(
        degree: string,
        start: string,
        end: string,
        inProgress: boolean,
        description: string
    ) {
        this.degree = degree;
        this.start = start;
        this.end = end;
        this.inProgress = inProgress;
        this.description = description;
    }
}
