import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ResponseWrapper, Principal } from '../../shared';

import { Course, CourseService } from './';
import { GradeReportService, GradeReport, Status } from '../grade-report';
import { Student } from '../student';

@Component({
    selector: 'course-catalog',
    templateUrl: './course-catalog.component.html',
    styleUrls: ['./course-catalog.component.css']
})
export class CourseCatalogComponent implements OnInit, OnDestroy {
    courses: Course[];
    takenCourseIds: Number[] = [];
    currentAccount: any;

    constructor(
        private courseService: CourseService,
        private principal: Principal,
        private gradeReportService: GradeReportService
    ) {
    }

    loadAllCourses() {
        this.courseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.courses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadTakenCourseIds() {
        this.gradeReportService.query({id: this.currentAccount.id}).subscribe(
            (res: ResponseWrapper) => {
                this.takenCourseIds = res.json.map(report => report.course.id);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAllCourses();
            this.loadTakenCourseIds();
        });
    }

    ngOnDestroy() {
    }

    isEnrolled(course: Course) {
        return this.takenCourseIds.indexOf(course.id) > -1;
    }

    enroll(course: Course): void {
        const student: Student = {
            id: this.currentAccount.id
        };

        const gradeReport: GradeReport = {
            course: course,
            student: student,
            status: Status.IN_PROGRESS
        };

        this.gradeReportService.create(gradeReport).subscribe(
            (res: GradeReport) => {
                this.loadTakenCourseIds();
            },
            (res) => alert(res._body)
        );
    }

    private onError(res) {
    }
}
