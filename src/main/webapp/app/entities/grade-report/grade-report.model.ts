
const enum Status {
    'FAILED',
    ' IN_PROGRESS',
    ' PASSED'

};
import { Course } from '../course';
export class GradeReport {
    constructor(
        public id?: number,
        public status?: Status,
        public course?: Course,
    ) {
    }
}
