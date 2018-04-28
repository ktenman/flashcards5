import {LOCALE_ID, NgModule} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {registerLocaleData} from '@angular/common'
import locale from '@angular/common/locales/et'

import {
    FindLanguageFromKeyPipe,
    FlashcardsSharedLibsModule,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLanguageHelper
} from './'

@NgModule({
    imports: [
        FlashcardsSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'et'
        }
    ],
    exports: [
        FlashcardsSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class FlashcardsSharedCommonModule {
    constructor() {
        registerLocaleData(locale)
    }
}
