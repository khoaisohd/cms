import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsSharedModule } from '../../shared';
import {
    DocumentService,
    DocumentPopupService,
    DocumentComponent,
    DocumentDetailComponent,
    DocumentDialogComponent,
    DocumentPopupComponent,
    DocumentDeletePopupComponent,
    DocumentDeleteDialogComponent,
    documentRoute,
    documentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentRoute,
    ...documentPopupRoute,
];

@NgModule({
    imports: [
        CmsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DocumentComponent,
        DocumentDetailComponent,
        DocumentDialogComponent,
        DocumentDeleteDialogComponent,
        DocumentPopupComponent,
        DocumentDeletePopupComponent,
    ],
    entryComponents: [
        DocumentComponent,
        DocumentDialogComponent,
        DocumentPopupComponent,
        DocumentDeleteDialogComponent,
        DocumentDeletePopupComponent,
    ],
    providers: [
        DocumentService,
        DocumentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsDocumentModule {}
