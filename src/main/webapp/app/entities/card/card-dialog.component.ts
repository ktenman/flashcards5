import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {HttpErrorResponse, HttpResponse} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster'

import {Card} from './card.model'
import {CardPopupService} from './card-popup.service'
import {CardService} from './card.service'
import {User} from '../../shared'

@Component({
    selector: 'jhi-card-dialog',
    templateUrl: './card-dialog.component.html'
})
export class CardDialogComponent implements OnInit {

    card: Card
    isSaving: boolean

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private cardService: CardService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field)
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field)
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage)
    }

    clear() {
        this.activeModal.dismiss('cancel')
    }

    save() {
        this.isSaving = true
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card))
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card))
        }
    }

    trackUserById(index: number, item: User) {
        return item.id
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Card>>) {
        result.subscribe((res: HttpResponse<Card>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError())
    }

    private onSaveSuccess(result: Card) {
        // TODO refactor this code
        this.eventManager.broadcast({name: 'cardListModification', content: 'OK'})
        this.eventManager.broadcast({name: 'cardModification', content: result})
        this.isSaving = false
        this.activeModal.dismiss(result)
    }

    private onSaveError() {
        this.isSaving = false
    }
}

@Component({
    selector: 'jhi-card-popup',
    template: ''
})
export class CardPopupComponent implements OnInit, OnDestroy {

    routeSub: any

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.cardPopupService
                    .open(CardDialogComponent as Component, params['id'])
            } else {
                this.cardPopupService
                    .open(CardDialogComponent as Component)
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
    }
}
