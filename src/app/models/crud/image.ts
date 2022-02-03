export class Image {

    id?: number;
    name: string;
    imageUrl: string;
    imageId: string;

    constructor(
        id: number,
        name: string,
        imageUrl: string,
        imageId: string
    ) {
        this.id = id;
        this.name = name;
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }

}
