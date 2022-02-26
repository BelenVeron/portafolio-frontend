export class Skill {

    id: number | null;
    name: string;
    percent: number;

    constructor(
        id: number | null,
        name: string,
        percent: number,
    ) {
        this.id = id;
        this.name = name;
        this.percent = percent;
    }
    
}
