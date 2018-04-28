import {Component, OnDestroy, OnInit} from '@angular/core'
import {HttpErrorResponse, HttpResponse} from '@angular/common/http'
import {Subscription} from 'rxjs/Subscription'
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster'

import {Card} from './card.model'
import {CardService} from './card.service'
import {ITEMS_PER_PAGE, Principal} from '../../shared'
import {Observable} from 'rxjs/Observable'

@Component({
    selector: 'jhi-card',
    templateUrl: './card.component.html',
    styleUrls: [
        'card.component.scss'
    ]
})
export class CardComponent implements OnInit, OnDestroy {

    cards: Card[]
    currentAccount: any
    eventSubscriber: Subscription
    itemsPerPage: number
    links: any
    page: any
    predicate: any
    queryCount: any
    reverse: any
    totalItems: number
    isSaving: boolean

    constructor(
        private cardService: CardService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.cards = []
        this.itemsPerPage = ITEMS_PER_PAGE
        this.page = 0
        this.links = {
            last: 0
        }
        this.predicate = 'id'
        this.reverse = true
        this.isSaving = false
    }

    loadAll() {
        this.cardService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Card[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        )
    }

    reset() {
        this.page = 0
        this.cards = []
        this.loadAll()
    }

    loadPage(page) {
        this.page = page
        this.loadAll()
    }

    ngOnInit() {
        this.loadAll()
        this.principal.identity().then((account) => {
            this.currentAccount = account
        })
        this.registerChangeInCards()
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber)
    }

    trackId(index: number, item: Card) {
        return item.id
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field)
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field)
    }

    registerChangeInCards() {
        this.eventSubscriber = this.eventManager.subscribe('cardListModification', (response) => this.reset())
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'desc' : 'asc')]
        if (this.predicate !== 'id') {
            result.push('id')
        }
        return result
    }

    changeEnabled(card: Card, enabled: boolean) {
        card.enabled = !enabled
        this.save(card)
    }

    changeKnown(card: Card, known: boolean) {
        card.known = !known
        this.save(card)
    }

    save(card: Card) {
        if (card.id !== undefined && !this.isSaving) {
            this.isSaving = true
            this.subscribeToSaveResponse(this.cardService.update(card))
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Card>>) {
        result.subscribe((res: HttpResponse<Card>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(`Saving card error: ${res.error}`))
    }

    private onSaveSuccess(result: Card) {
        this.isSaving = false
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'))
        this.totalItems = headers.get('X-Total-Count')
        data.forEach((e) => this.cards.push(e))
        this.isSaving = false
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null)
    }
}
