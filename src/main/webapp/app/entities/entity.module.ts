import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmsDepartmentModule } from './department/department.module';
import { CmsStudentModule } from './student/student.module';
import { CmsDocumentModule } from './document/document.module';
import { CmsReferenceModule } from './reference/reference.module';
import { CmsCourseModule } from './course/course.module';
import { CmsGradeReportModule } from './grade-report/grade-report.module';
import { CmsTranscriptModule } from './transcript/transcript.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CmsDepartmentModule,
        CmsStudentModule,
        CmsDocumentModule,
        CmsReferenceModule,
        CmsCourseModule,
        CmsGradeReportModule,
        CmsTranscriptModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsEntityModule {}
