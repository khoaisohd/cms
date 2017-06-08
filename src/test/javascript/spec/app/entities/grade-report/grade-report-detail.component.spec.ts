import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { CmsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GradeReportDetailComponent } from '../../../../../../main/webapp/app/entities/grade-report/grade-report-detail.component';
import { GradeReportService } from '../../../../../../main/webapp/app/entities/grade-report/grade-report.service';
import { GradeReport } from '../../../../../../main/webapp/app/entities/grade-report/grade-report.model';

describe('Component Tests', () => {

    describe('GradeReport Management Detail Component', () => {
        let comp: GradeReportDetailComponent;
        let fixture: ComponentFixture<GradeReportDetailComponent>;
        let service: GradeReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmsTestModule],
                declarations: [GradeReportDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GradeReportService,
                    EventManager
                ]
            }).overrideTemplate(GradeReportDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GradeReportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradeReportService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GradeReport(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.gradeReport).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
