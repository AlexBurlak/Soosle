export class CategoryCreateRequest {
    public name!: string;
    public constructor(info: Partial<CategoryCreateRequest>) {
        Object.assign(this, info);
    }
}
