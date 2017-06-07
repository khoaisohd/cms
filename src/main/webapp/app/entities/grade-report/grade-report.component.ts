import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { GradeReport } from './grade-report.model';
import { GradeReportService } from './grade-report.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-grade-report',
    templateUrl: './grade-report.component.html'
})
export class GradeReportComponent implements OnInit, OnDestroy {
gradeReports: GradeReport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gradeReportService: GradeReportService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gradeReportService.query().subscribe(
            (res: ResponseWrapper) => {
                this.gradeReports = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGradeReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GradeReport) {
        return item.id;
    }
    registerChangeInGradeReports() {
        this.eventSubscriber = this.eventManager.subscribe('gradeReportListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
