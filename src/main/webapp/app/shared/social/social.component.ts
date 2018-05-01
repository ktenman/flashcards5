import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core'
import {SocialService} from './social.service'
import {CSRFService} from '..'

@Component({
    selector: 'jhi-social',
    templateUrl: './social.component.html'
})
export class JhiSocialComponent implements OnInit, AfterViewChecked {
    @ViewChild('continueSocialLoginButton') continueSocialLoginButton: ElementRef
    @Input() provider: string
    @Input() success: boolean
    label: string
    providerSetting: string
    providerURL: string
    csrf: string

    constructor(
        private csrfService: CSRFService,
        private socialService: SocialService
    ) {
    }

    ngOnInit() {
        this.label = this.provider.charAt(0).toUpperCase() + this.provider.slice(1)
        this.providerSetting = this.socialService.getProviderSetting(this.provider)
        this.providerURL = this.socialService.getProviderURL(this.provider)
        this.csrf = this.csrfService.getCSRF()
    }

    ngAfterViewChecked(): void {
        if (this.success) {
            setTimeout(() => this.continueSocialLoginButton.nativeElement.click(), 5000)
        }
    }
}
