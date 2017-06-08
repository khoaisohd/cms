import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GradeReport } from './grade-report.model';
import { GradeReportService } from './grade-report.service';
@Injectable()
export class GradeReportPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gradeReportService: GradeReportService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.gradeReportService.find(id).subscribe((gradeReport) => {
                this.gradeReportModalRef(component, gradeReport);
            });
        } else {
            return this.gradeReportModalRef(component, new GradeReport());
        }
    }

    gradeReportModalRef(component: Component, gradeReport: GradeReport): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gradeReport = gradeReport;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
