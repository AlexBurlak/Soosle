export class LoginResponse {
    public token!: string;
    public expiration!: Date;

    public constructor(init: Partial<LoginResponse>) {
        Object.assign(this, init);
    }
}
