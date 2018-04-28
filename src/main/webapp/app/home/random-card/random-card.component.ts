import {Component, OnInit} from '@angular/core'
import {HttpResponse} from '@angular/common/http'
import {Card} from '../../entities/card/card.model'
import {RandomCardService} from './random-card.service'

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

    constructor(private randomCardService: RandomCardService) {
    }

    ngOnInit() {
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => {
                this.card = cardResponse.body
            })
        this.cacheNextCard()
    }

    public next() {
        this.card = this.cachedNextCard
        this.cacheNextCard()
    }

    public cacheNextCard() {
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => {
                this.cachedNextCard = cardResponse.body
            })
    }

}
