import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Document } from './document.model';
import { DocumentPopupService } from './document-popup.service';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document-dialog',
    templateUrl: './document-dialog.component.html'
})
export class DocumentDialogComponent implements OnInit {

    document: Document;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private documentService: DocumentService,
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
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentService.update(this.document), false);
        } else {
            this.subscribeToSaveResponse(
                this.documentService.create(this.document), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Document>, isCreated: boolean) {
        result.subscribe((res: Document) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Document, isCreated: boolean) {
        this.alertService.success(
            isCreated ? `A new Document is created with identifier ${result.id}`
            : `A Document is updated with identifier ${result.id}`,
            null, null);

        this.eventManager.broadcast({ name: 'documentListModification', content: 'OK'});
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
    selector: 'jhi-document-popup',
    template: ''
})
export class DocumentPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.documentPopupService
                    .open(DocumentDialogComponent, params['id']);
            } else {
                this.modalRef = this.documentPopupService
                    .open(DocumentDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
