import { Department } from '../department';
import { Course } from '../course';
export class Student {
    constructor(
        public id?: number,
        public department?: Department,
        public course?: Course,
    ) {
    }
}
