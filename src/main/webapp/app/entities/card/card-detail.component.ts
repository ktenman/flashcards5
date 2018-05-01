import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {HttpResponse} from '@angular/common/http'
import {Subscription} from 'rxjs/Subscription'
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster'

import {Card} from './card.model'
import {CardService} from './card.service'
import {CardComponent} from './card.component'

@Component({
    selector: 'jhi-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: [
        'card-detail.component.scss'
    ]
})
export class CardDetailComponent implements OnInit, OnDestroy {

    card: Card
    private subscription: Subscription
    private eventSubscriber: Subscription

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private cardService: CardService,
        private route: ActivatedRoute,
        private router: Router,
        private cardComponent: CardComponent
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
        this.router.navigate(['card'])
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

    changeEnabled(card: Card, enabled: boolean) {
        card.enabled = !enabled
        this.cardComponent.save(card)
    }

    changeKnown(card: Card, known: boolean) {
        card.known = !known
        this.cardComponent.save(card)
    }
}
