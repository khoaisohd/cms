import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ResponseWrapper, Principal } from '../../shared';

import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
    selector: 'course-catalog',
    templateUrl: './course-catalog.component.html',
    styleUrls: ['./course-catalog.component.css']
})
export class CourseCatalogComponent implements OnInit, OnDestroy {
    courses: Course[];
    currentAccount: any;

    constructor(
        private courseService: CourseService,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.courseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.courses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
    }

    trackId(index: number, item: Course) {
        return item.id;
    }

    isEnrolled(course: Course) {
        return course.students.map(student => student.id).indexOf(this.currentAccount.id) > -1;
    }

    private onError(error) {
    }
}
