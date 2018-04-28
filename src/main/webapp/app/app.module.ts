import './vendor.ts'

import {Injector, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage'
import {JhiEventManager} from 'ng-jhipster'

import {AuthInterceptor} from './blocks/interceptor/auth.interceptor'
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor'
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor'
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor'
import {FlashcardsSharedModule, UserRouteAccessService} from './shared'
import {FlashcardsAppRoutingModule} from './app-routing.module'
import {FlashcardsHomeModule} from './home/home.module'
import {FlashcardsAdminModule} from './admin/admin.module'
import {FlashcardsAccountModule} from './account/account.module'
import {FlashcardsEntityModule} from './entities/entity.module'
import {PaginationConfig} from './blocks/config/uib-pagination.config'
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts'

@NgModule({
    imports: [
        BrowserModule,
        FlashcardsAppRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        FlashcardsSharedModule,
        FlashcardsHomeModule,
        FlashcardsAdminModule,
        FlashcardsAccountModule,
        FlashcardsEntityModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class FlashcardsAppModule {
}
