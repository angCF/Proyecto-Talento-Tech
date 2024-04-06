export class UserModel {
    constructor(
        public readonly _id: string,
        public name: string,
        public email: string,
        public login: string,
        public password: string,
        public documentType: string,
        public documentNumber: string,
        public rol: string,
        public state: boolean,
        public createdAt: Date
    ){}
}