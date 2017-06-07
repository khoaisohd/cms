import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Student } from './student.model';
import { StudentPopupService } from './student-popup.service';
import { StudentService } from './student.service';
import { Department, DepartmentService } from '../department';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-student-dialog',
    templateUrl: './student-dialog.component.html'
})
export class StudentDialogComponent implements OnInit {

    student: Student;
    authorities: any[];
    isSaving: boolean;

    departments: Department[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private studentService: StudentService,
        private departmentService: DepartmentService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.departmentService.query()
            .subscribe((res: ResponseWrapper) => { this.departments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studentService.update(this.student), false);
        } else {
            this.subscribeToSaveResponse(
                this.studentService.create(this.student), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Student>, isCreated: boolean) {
        result.subscribe((res: Student) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Student, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Student is created with identifier ${result.id}`
            : `A Student is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
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

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-student-popup',
    template: ''
})
export class StudentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.studentPopupService
                    .open(StudentDialogComponent, params['id']);
            } else {
                this.modalRef = this.studentPopupService
                    .open(StudentDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
