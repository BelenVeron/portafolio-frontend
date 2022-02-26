import { Image } from "./image";

export class Experience {

    id: number | null;
    degree: string;
    start: string;
    finished: string;
    description: string;
    image: Image | null;


    constructor(
        id: number | null,
        degree: string,
        start: string,
        finished: string,
        description: string,
        image: Image | null
    ) {
        this.id = id;
        this.degree = degree;
        this.start = start;
        this.finished = finished;
        this.description = description;
        this.image = image;
    }
}
