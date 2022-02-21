import { Image } from "./image";

export class Hero {

    id: number;
    image: Image;

    constructor(
        id: number,
        image: Image
    ) {
        this.id = id;
        this.image = image;
    }
}
