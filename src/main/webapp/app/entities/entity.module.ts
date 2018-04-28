import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'

import {FlashcardsCardModule} from './card/card.module'

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FlashcardsCardModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlashcardsEntityModule {
}
