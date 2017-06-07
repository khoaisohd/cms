import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { CmsTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ReferenceDetailComponent } from '../../../../../../main/webapp/app/entities/reference/reference-detail.component';
import { ReferenceService } from '../../../../../../main/webapp/app/entities/reference/reference.service';
import { Reference } from '../../../../../../main/webapp/app/entities/reference/reference.model';

describe('Component Tests', () => {

    describe('Reference Management Detail Component', () => {
        let comp: ReferenceDetailComponent;
        let fixture: ComponentFixture<ReferenceDetailComponent>;
        let service: ReferenceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmsTestModule],
                declarations: [ReferenceDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ReferenceService,
                    EventManager
                ]
            }).overrideTemplate(ReferenceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReferenceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReferenceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Reference(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.reference).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
