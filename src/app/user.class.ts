export class User {
    constructor(
        public id: number | null,
        public name: string | null,
        public password: string | null,
        public email: string | null,
        public age: number | null,
        public role: string | null,
        public site: string | null
    ) {}
}