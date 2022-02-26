import { Image } from "./image";

export class Hero {

    id: number | null;
    image: Image;

    constructor(
        id: number | null,
        image: Image
    ) {
        this.id = id;
        this.image = image;
    }
}
