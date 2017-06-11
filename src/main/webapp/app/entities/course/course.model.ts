import { Reference } from '../reference';
import { Document } from '../document';
import { Department } from '../department';
export class Course {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public prerequisite?: string,
        public reference?: Reference,
        public document?: Document,
        public department?: Department,
    ) {
    }
}
