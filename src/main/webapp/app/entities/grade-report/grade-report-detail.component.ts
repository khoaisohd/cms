import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { GradeReport } from './grade-report.model';
import { GradeReportService } from './grade-report.service';

@Component({
    selector: 'jhi-grade-report-detail',
    templateUrl: './grade-report-detail.component.html'
})
export class GradeReportDetailComponent implements OnInit, OnDestroy {

    gradeReport: GradeReport;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private gradeReportService: GradeReportService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGradeReports();
    }

    load(id) {
        this.gradeReportService.find(id).subscribe((gradeReport) => {
            this.gradeReport = gradeReport;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGradeReports() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gradeReportListModification',
            (response) => this.load(this.gradeReport.id)
        );
    }
}
