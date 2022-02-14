export class ImageDto {

    name: string;
    imageUrl: string;
    imageId: string;

    constructor(
        name: string,
        imageUrl: string,
        imageId: string
    ) {
        this.name = name;
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }
}
