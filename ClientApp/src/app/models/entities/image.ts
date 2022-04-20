export class Image {
    public authorName!: string;
    public path!: string;
    public name!: string;
    public extension!: string;
    public size!: number;
    public categoryId!: string;

    public constructor(info: Partial<Image>) {
        Object.assign(this, info);
    }
}