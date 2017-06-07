import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmsDepartmentModule } from './department/department.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CmsDepartmentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmsEntityModule {}
