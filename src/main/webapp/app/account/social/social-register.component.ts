import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap'

import {LoginModalService} from '../../shared'

@Component({
    selector: 'jhi-register',
    templateUrl: './social-register.component.html'
})
export class SocialRegisterComponent implements OnInit {
    @ViewChild('continueSocialLoginButton') continueSocialLoginButton: ElementRef
    success: boolean
    error: boolean
    provider: string
    providerLabel: string
    modalRef: NgbModalRef

    constructor(
        private route: ActivatedRoute,
        private loginModalService: LoginModalService
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((queryParams) => {
            this.success = queryParams['success']
            if (this.success) {
                setTimeout(() => this.continueSocialLoginButton.nativeElement.click(), 5000)
            }
        })
        this.route.params.subscribe((params) => {
            this.provider = params['provider?{success:boolean}']
        })
        this.error = !this.success
        this.providerLabel = this.provider.charAt(0).toUpperCase() + this.provider.slice(1)
    }

    login() {
        this.modalRef = this.loginModalService.open()
    }
}
