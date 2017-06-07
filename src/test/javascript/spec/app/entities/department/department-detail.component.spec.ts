import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { CmsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DepartmentDetailComponent } from '../../../../../../main/webapp/app/entities/department/department-detail.component';
import { DepartmentService } from '../../../../../../main/webapp/app/entities/department/department.service';
import { Department } from '../../../../../../main/webapp/app/entities/department/department.model';

describe('Component Tests', () => {

    describe('Department Management Detail Component', () => {
        let comp: DepartmentDetailComponent;
        let fixture: ComponentFixture<DepartmentDetailComponent>;
        let service: DepartmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmsTestModule],
                declarations: [DepartmentDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DepartmentService,
                    EventManager
                ]
            }).overrideTemplate(DepartmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Department(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.department).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
