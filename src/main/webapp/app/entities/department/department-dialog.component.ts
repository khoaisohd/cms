import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Department } from './department.model';
import { DepartmentPopupService } from './department-popup.service';
import { DepartmentService } from './department.service';

@Component({
    selector: 'jhi-department-dialog',
    templateUrl: './department-dialog.component.html'
})
export class DepartmentDialogComponent implements OnInit {

    department: Department;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private departmentService: DepartmentService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(
                this.departmentService.update(this.department), false);
        } else {
            this.subscribeToSaveResponse(
                this.departmentService.create(this.department), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Department>, isCreated: boolean) {
        result.subscribe((res: Department) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Department, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Department is created with identifier ${result.id}`
            : `A Department is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'departmentListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-department-popup',
    template: ''
})
export class DepartmentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.departmentPopupService
                    .open(DepartmentDialogComponent, params['id']);
            } else {
                this.modalRef = this.departmentPopupService
                    .open(DepartmentDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
