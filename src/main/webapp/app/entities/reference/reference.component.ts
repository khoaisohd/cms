import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferenceService } from './reference.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-reference',
    templateUrl: './reference.component.html'
})
export class ReferenceComponent implements OnInit, OnDestroy {
references: Reference[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private referenceService: ReferenceService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.referenceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.references = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Reference) {
        return item.id;
    }
    registerChangeInReferences() {
        this.eventSubscriber = this.eventManager.subscribe('referenceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
