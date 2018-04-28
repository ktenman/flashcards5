import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {FlashcardsSharedModule} from '../shared'

import {HOME_ROUTE, HomeComponent} from './'

@NgModule({
    imports: [
        FlashcardsSharedModule,
        RouterModule.forChild([HOME_ROUTE])
    ],
    declarations: [
        HomeComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlashcardsHomeModule {
}
