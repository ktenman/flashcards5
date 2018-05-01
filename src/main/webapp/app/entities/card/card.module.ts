import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {FlashcardsSharedModule} from '../../shared'
import {FlashcardsAdminModule} from '../../admin/admin.module'
import {
    CardComponent,
    CardDeleteDialogComponent,
    CardDeletePopupComponent,
    CardDetailComponent,
    CardDialogComponent,
    CardPopupComponent,
    cardPopupRoute,
    CardPopupService,
    cardRoute,
    CardService
} from './'

const ENTITY_STATES = [
    ...cardRoute,
    ...cardPopupRoute
]

@NgModule({
    imports: [
        FlashcardsSharedModule,
        FlashcardsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CardComponent,
        CardDetailComponent,
        CardDialogComponent,
        CardDeleteDialogComponent,
        CardPopupComponent,
        CardDeletePopupComponent
    ],
    entryComponents: [
        CardComponent,
        CardDialogComponent,
        CardPopupComponent,
        CardDeleteDialogComponent,
        CardDeletePopupComponent
    ],
    providers: [
        CardService,
        CardPopupService,
        CardComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlashcardsCardModule {
}
