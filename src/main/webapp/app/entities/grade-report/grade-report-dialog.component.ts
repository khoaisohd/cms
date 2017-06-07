import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { GradeReport } from './grade-report.model';
import { GradeReportPopupService } from './grade-report-popup.service';
import { GradeReportService } from './grade-report.service';
import { Course, CourseService } from '../course';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-grade-report-dialog',
    templateUrl: './grade-report-dialog.component.html'
})
export class GradeReportDialogComponent implements OnInit {

    gradeReport: GradeReport;
    authorities: any[];
    isSaving: boolean;

    courses: Course[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private gradeReportService: GradeReportService,
        private courseService: CourseService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.courseService.query()
            .subscribe((res: ResponseWrapper) => { this.courses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gradeReport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gradeReportService.update(this.gradeReport), false);
        } else {
            this.subscribeToSaveResponse(
                this.gradeReportService.create(this.gradeReport), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<GradeReport>, isCreated: boolean) {
        result.subscribe((res: GradeReport) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: GradeReport, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Grade Report is created with identifier ${result.id}`
            : `A Grade Report is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'gradeReportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackCourseById(index: number, item: Course) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-grade-report-popup',
    template: ''
})
export class GradeReportPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gradeReportPopupService: GradeReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.gradeReportPopupService
                    .open(GradeReportDialogComponent, params['id']);
            } else {
                this.modalRef = this.gradeReportPopupService
                    .open(GradeReportDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
