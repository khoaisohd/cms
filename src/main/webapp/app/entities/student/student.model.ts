import { Department } from '../department';
import { Course } from '../course';
export class Student {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public department?: Department,
        public course?: Course,
    ) {
    }
}
