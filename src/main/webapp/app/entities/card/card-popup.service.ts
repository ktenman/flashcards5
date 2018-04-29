import {Component, Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap'
import {HttpResponse} from '@angular/common/http'
import {Card} from './card.model'
import {CardService} from './card.service'

@Injectable()
export class CardPopupService {
    private ngbModalRef: NgbModalRef

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cardService: CardService
    ) {
        this.ngbModalRef = null
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null
            if (isOpen) {
                resolve(this.ngbModalRef)
            }

            if (id) {
                this.cardService.find(id)
                    .subscribe((cardResponse: HttpResponse<Card>) => {
                        const card: Card = cardResponse.body
                        this.ngbModalRef = this.cardModalRef(component, card)
                        resolve(this.ngbModalRef)
                    })
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cardModalRef(component, new Card())
                    resolve(this.ngbModalRef)
                }, 0)
            }
        })
    }

    cardModalRef(component: Component, card: Card): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: true})
        modalRef.componentInstance.card = card
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'})
            this.ngbModalRef = null
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'})
            this.ngbModalRef = null
        })
        return modalRef
    }
}
