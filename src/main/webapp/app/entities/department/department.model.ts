import { Course } from '../course';
export class Department {
    constructor(
        public id?: number,
        public name?: string,
        public course?: Course,
    ) {
    }
}
