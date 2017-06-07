import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferenceService } from './reference.service';

@Component({
    selector: 'jhi-reference-detail',
    templateUrl: './reference-detail.component.html'
})
export class ReferenceDetailComponent implements OnInit, OnDestroy {

    reference: Reference;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private referenceService: ReferenceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReferences();
    }

    load(id) {
        this.referenceService.find(id).subscribe((reference) => {
            this.reference = reference;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'referenceListModification',
            (response) => this.load(this.reference.id)
        );
    }
}
