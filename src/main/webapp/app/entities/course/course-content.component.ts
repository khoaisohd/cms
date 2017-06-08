import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'course-content',
    templateUrl: './course-content.component.html',
    styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
    course: Course = null;
    private subscription: Subscription;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.courseService.find(id).subscribe((course) => {
            this.course = course;
        });
    }
}
