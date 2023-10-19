export class InvalidAccessToken extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidAccessToken';
    }
}

export default InvalidAccessToken;