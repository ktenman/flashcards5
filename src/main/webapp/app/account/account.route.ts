import {Routes} from '@angular/router'

import {activateRoute, socialAuthRoute, socialRegisterRoute} from './'

const ACCOUNT_ROUTES = [
    activateRoute,
    socialAuthRoute,
    socialRegisterRoute,
]

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}]
