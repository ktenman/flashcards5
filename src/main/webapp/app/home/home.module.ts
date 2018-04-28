import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {FlashcardsSharedModule} from '../shared'

import {HOME_ROUTE, HomeComponent} from './'
import {JhiRandomCardComponent} from './random-card/random-card.component'
import {RandomCardService} from './random-card/random-card.service'

@NgModule({
    imports: [
        FlashcardsSharedModule,
        RouterModule.forChild([HOME_ROUTE])
    ],
    declarations: [
        HomeComponent,
        JhiRandomCardComponent
    ],
    entryComponents: [],
    providers: [RandomCardService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlashcardsHomeModule {
}
