import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {DatePipe} from '@angular/common'

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    FlashcardsSharedCommonModule,
    FlashcardsSharedLibsModule,
    HasAnyAuthorityDirective,
    JhiAutosizeDirective,
    JhiLatexComponent,
    JhiLoginModalComponent,
    JhiReplaceLineBreaksAndAsterisksPipe,
    JhiSocialComponent,
    LoginModalService,
    LoginService,
    Principal,
    SocialService,
    StateStorageService,
    UserService
} from './'
import {KatexModule} from 'ng-katex'

@NgModule({
    imports: [
        FlashcardsSharedLibsModule,
        FlashcardsSharedCommonModule,
        KatexModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        JhiLatexComponent,
        JhiAutosizeDirective,
        JhiReplaceLineBreaksAndAsterisksPipe
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
        JhiAutosizeDirective,
        JhiLatexComponent,
        JhiLoginModalComponent,
        JhiSocialComponent,
        HasAnyAuthorityDirective,
        DatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FlashcardsSharedModule {
}
