import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { GradeReport } from './grade-report.model';
import { GradeReportPopupService } from './grade-report-popup.service';
import { GradeReportService } from './grade-report.service';

@Component({
    selector: 'jhi-grade-report-delete-dialog',
    templateUrl: './grade-report-delete-dialog.component.html'
})
export class GradeReportDeleteDialogComponent {

    gradeReport: GradeReport;

    constructor(
        private gradeReportService: GradeReportService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gradeReportService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gradeReportListModification',
                content: 'Deleted an gradeReport'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success(`A Grade Report is deleted with identifier ${id}`, null, null);
    }
}

@Component({
    selector: 'jhi-grade-report-delete-popup',
    template: ''
})
export class GradeReportDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gradeReportPopupService: GradeReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.gradeReportPopupService
                .open(GradeReportDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
