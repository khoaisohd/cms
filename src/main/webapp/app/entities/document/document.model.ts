import { Course } from '../course';
export class Document {
    constructor(
        public id?: number,
        public url?: string,
        public name?: string,
        public course?: Course,
    ) {
    }
}
