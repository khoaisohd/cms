import { Component, OnInit } from '@angular/core';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { ReferenceService, Reference } from '../reference';
import { DocumentService, Document } from '../document';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { ResponseWrapper, Principal } from '../../shared';

@Component({
    selector: 'course-content',
    templateUrl: './course-content.component.html',
    styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
    course: Course = null;
    references: Reference[] = [];
    documents: Document[] = [];
    private subscription: Subscription;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private referenceService: ReferenceService,
        private documentService: DocumentService
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
        this.referenceService.query({ courseId: id }).subscribe((res: ResponseWrapper) => {
            this.references = res.json;
        });
        this.documentService.query({ courseId: id }).subscribe((res: ResponseWrapper) => {
            this.documents = res.json;
        });
    }
}
