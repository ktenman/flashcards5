/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FlashcardsTestModule } from '../../../test.module';
import { CardDetailComponent } from '../../../../../../main/webapp/app/entities/card/card-detail.component';
import { CardService } from '../../../../../../main/webapp/app/entities/card/card.service';
import { Card } from '../../../../../../main/webapp/app/entities/card/card.model';

describe('Component Tests', () => {

    describe('Card Management Detail Component', () => {
        let comp: CardDetailComponent;
        let fixture: ComponentFixture<CardDetailComponent>;
        let service: CardService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FlashcardsTestModule],
                declarations: [CardDetailComponent],
                providers: [
                    CardService
                ]
            })
            .overrideTemplate(CardDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Card(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.card).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
