import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsSharedModule } from '../../shared';
import {
    ReferenceService,
    ReferencePopupService,
    ReferenceComponent,
    ReferenceDetailComponent,
    ReferenceDialogComponent,
    ReferencePopupComponent,
    ReferenceDeletePopupComponent,
    ReferenceDeleteDialogComponent,
    referenceRoute,
    referencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...referenceRoute,
    ...referencePopupRoute,
];

@NgModule({
    imports: [
        CmsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReferenceComponent,
        ReferenceDetailComponent,
        ReferenceDialogComponent,
        ReferenceDeleteDialogComponent,
        ReferencePopupComponent,
        ReferenceDeletePopupComponent,
    ],
    entryComponents: [
        ReferenceComponent,
        ReferenceDialogComponent,
        ReferencePopupComponent,
        ReferenceDeleteDialogComponent,
        ReferenceDeletePopupComponent,
    ],
    providers: [
        ReferenceService,
        ReferencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsReferenceModule {}
