import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsSharedModule } from '../../shared';
import {
    GradeReportService,
    GradeReportPopupService,
    GradeReportComponent,
    GradeReportDetailComponent,
    GradeReportDialogComponent,
    GradeReportPopupComponent,
    GradeReportDeletePopupComponent,
    GradeReportDeleteDialogComponent,
    gradeReportRoute,
    gradeReportPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gradeReportRoute,
    ...gradeReportPopupRoute,
];

@NgModule({
    imports: [
        CmsSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GradeReportComponent,
        GradeReportDetailComponent,
        GradeReportDialogComponent,
        GradeReportDeleteDialogComponent,
        GradeReportPopupComponent,
        GradeReportDeletePopupComponent,
    ],
    entryComponents: [
        GradeReportComponent,
        GradeReportDialogComponent,
        GradeReportPopupComponent,
        GradeReportDeleteDialogComponent,
        GradeReportDeletePopupComponent,
    ],
    providers: [
        GradeReportService,
        GradeReportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsGradeReportModule {}
