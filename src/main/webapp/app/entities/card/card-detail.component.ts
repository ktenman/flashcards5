import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {HttpResponse} from '@angular/common/http'
import {Subscription} from 'rxjs/Subscription'
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster'

import {Card} from './card.model'
import {CardService} from './card.service'

@Component({
    selector: 'jhi-card-detail',
    templateUrl: './card-detail.component.html'
})
export class CardDetailComponent implements OnInit, OnDestroy {

    card: Card
    private subscription: Subscription
    private eventSubscriber: Subscription

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cardService: CardService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id'])
        })
        this.registerChangeInCards()
    }

    load(id) {
        this.cardService.find(id)
            .subscribe((cardResponse: HttpResponse<Card>) => {
                this.card = cardResponse.body
            })
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field)
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field)
    }

    previousState() {
        window.history.back()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
        this.eventManager.destroy(this.eventSubscriber)
    }

    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cardListModification',
            (response) => this.load(this.card.id)
        )
    }
}
