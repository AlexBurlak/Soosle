export class Category {
    public id!: string;
    public name!: string;

    public constructor(info: Partial<Category>) {
        Object.assign(this, info);
    }
}