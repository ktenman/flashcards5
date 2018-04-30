import {Component, OnInit} from '@angular/core'
import {HttpErrorResponse, HttpResponse} from '@angular/common/http'
import {Card} from '../../entities/card'
import {RandomCardService} from './random-card.service'
import {JhiAlertService, JhiEventManager} from 'ng-jhipster'

@Component({
    selector: 'jhi-random-card',
    templateUrl: './random-card.component.html',
    styleUrls: [
        'random-card.component.scss'
    ]
})
export class JhiRandomCardComponent implements OnInit {

    card: Card
    cachedNextCard: Card
    flipped: boolean

    constructor(
        private randomCardService: RandomCardService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => {
                this.card = cardResponse.body
            })
        this.cacheNextCard()
    }

    public next() {
        this.flipped = false
        this.card = this.cachedNextCard
        this.cacheNextCard()
    }

    public cacheNextCard() {
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => this.cachedNextCard = cardResponse.body,
                (res: HttpErrorResponse) => this.onError(res.message))
    }

    public flip() {
        this.flipped = !this.flipped
    }

    public known(id: number) {
        this.randomCardService.markAsKnown(id).subscribe(() => {
                this.next()
                this.jhiAlertService.success('Success!', null, null)
            },
            (res: HttpErrorResponse) => this.onError(res.message))
    }

    public markAllAsUnknown() {
        this.randomCardService.markAllAsUnknown().subscribe(() => this.ngOnInit(),
            (res: HttpErrorResponse) => this.onError(res.message))
    }

    private onError(error) {
        this.card = null
        this.jhiAlertService.error(error.message, null, null)
    }

}
