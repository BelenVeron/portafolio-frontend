export class EducationDto {

    institution: string;
    degree: string;
    date: string;
    period: string;


    constructor(
        institution: string,
        degree: string,
        date: string,
        period: string,
    ) {
        this.institution = institution;
        this.degree = degree;
        this.date = date;
        this.period = period;
    }
}
