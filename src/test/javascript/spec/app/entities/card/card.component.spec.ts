/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlashcardsTestModule } from '../../../test.module';
import { CardComponent } from '../../../../../../main/webapp/app/entities/card/card.component';
import { CardService } from '../../../../../../main/webapp/app/entities/card/card.service';
import { Card } from '../../../../../../main/webapp/app/entities/card/card.model';

describe('Component Tests', () => {

    describe('Card Management Component', () => {
        let comp: CardComponent;
        let fixture: ComponentFixture<CardComponent>;
        let service: CardService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FlashcardsTestModule],
                declarations: [CardComponent],
                providers: [
                    CardService
                ]
            })
            .overrideTemplate(CardComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Card(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cards[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
