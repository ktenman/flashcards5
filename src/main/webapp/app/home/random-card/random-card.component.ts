import {Component, HostListener, OnInit} from '@angular/core'
import {HttpErrorResponse, HttpResponse} from '@angular/common/http'
import {Card} from '../../entities/card'
import {RandomCardService} from './random-card.service'
import {JhiAlertService} from 'ng-jhipster'
import {TranslateService} from '@ngx-translate/core'

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
    tries: number
    lastCard: boolean

    constructor(
        private randomCardService: RandomCardService,
        private jhiAlertService: JhiAlertService,
        private translateService: TranslateService
    ) {
        this.tries = 0
        this.card = {
            front: `${this.translateService.instant('loading')}`
        }
    }

    ngOnInit() {
        this.lastCard = false
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => {
                this.card = cardResponse.body
                this.cacheNextCard()
            }, () => this.card = null)
    }

    public next() {
        this.flipped = false
        this.card = this.cachedNextCard
        this.cacheNextCard()
    }

    public cacheNextCard() {
        this.randomCardService.get()
            .subscribe((cardResponse: HttpResponse<Card>) => {
                    this.cachedNextCard = cardResponse.body
                    if (this.cachedNextCard.id === this.card.id && this.tries < 10) {
                        this.tries++
                        this.lastCard = this.tries === 10
                        this.cacheNextCard()
                    } else {
                        this.tries = 0
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message))
    }

    public flip() {
        this.flipped = !this.flipped
    }

    public known(id: number) {
        this.randomCardService.markAsKnown(id).subscribe(() => {
                this.next()
            },
            (res: HttpErrorResponse) => this.onError(res.message))
    }

    public markAllAsUnknown() {
        this.randomCardService.markAllAsUnknown().subscribe(() => this.ngOnInit(),
            (res: HttpErrorResponse) => this.onError(res.message))
    }

    @HostListener('document:keyup', ['$event'])
    private buttons(event) {
        switch (event.which) {
            case 13: // enter
            case 38: // up
            case 40: // down
                this.flip()
                break
            case 32: // space
            case 39: // right
                this.next()
                break
            case 75: // k
            case 77: // m
            case 83: // s
                if (this.card) {
                    this.known(this.card.id)
                }
                break
            default:
                return // exit this handler for other keys
        }
    }

    private onError(error) {
        this.card = null
        this.jhiAlertService.error(error.message, null, null)
    }

}
