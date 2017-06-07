import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Reference } from './reference.model';
import { ReferencePopupService } from './reference-popup.service';
import { ReferenceService } from './reference.service';

@Component({
    selector: 'jhi-reference-dialog',
    templateUrl: './reference-dialog.component.html'
})
export class ReferenceDialogComponent implements OnInit {

    reference: Reference;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private referenceService: ReferenceService,
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
        if (this.reference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.referenceService.update(this.reference), false);
        } else {
            this.subscribeToSaveResponse(
                this.referenceService.create(this.reference), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Reference>, isCreated: boolean) {
        result.subscribe((res: Reference) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Reference, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Reference is created with identifier ${result.id}`
            : `A Reference is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'referenceListModification', content: 'OK'});
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
    selector: 'jhi-reference-popup',
    template: ''
})
export class ReferencePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private referencePopupService: ReferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.referencePopupService
                    .open(ReferenceDialogComponent, params['id']);
            } else {
                this.modalRef = this.referencePopupService
                    .open(ReferenceDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
