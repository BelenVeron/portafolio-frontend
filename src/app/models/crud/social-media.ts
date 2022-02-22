export class SocialMedia {

    id: number;
    social: string;
    link: string;

    constructor(
        id: number,
        social: string,
        link: string,
    ) {
        this.id = id;
        this.social = social;
        this.link = link;
    }
}
