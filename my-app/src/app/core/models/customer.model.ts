export class CustomerModel {
    constructor(
        // public readonly _id: string,
        public name: string,
        public lastName: string,
        public address: string,
        public email: string,
        public phone: string,
        public documentType: string,
        public documentNumber: string,
        public city: string,
        public state: boolean,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date,
        public interactions?: string[]
    ) {}
}