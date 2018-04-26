import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {DatePipe} from '@angular/common'

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    FlashcardsSharedCommonModule,
    FlashcardsSharedLibsModule,
    HasAnyAuthorityDirective,
    JhiLatexComponent,
    JhiLoginModalComponent,
    JhiSocialComponent,
    LoginModalService,
    LoginService,
    Principal,
    ReplaceLineBreaksPipe,
    SocialService,
    StateStorageService,
    UserService
} from './'
import {KatexModule} from 'ng-katex'

@NgModule({
    imports: [
        FlashcardsSharedLibsModule,
        FlashcardsSharedCommonModule,
        KatexModule,
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        JhiLatexComponent,
        ReplaceLineBreaksPipe,
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        SocialService,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        FlashcardsSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        JhiLatexComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FlashcardsSharedModule {}
