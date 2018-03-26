import { NgModule }               from '@angular/core';
import { PreloadAllModules }      from '@angular/router';
import { Routes, RouterModule }   from '@angular/router';
import { PageNotFoundComponent }  from './modules/page-errors/page-not-found/page-not-found.component';
import { HomeComponent }          from './home/index';
import { LogoutComponent }        from './logout/index';
import { HistoryComponent }       from './history/index';
import { ProfileComponent }       from './profile/index';
import { DepositComponent }       from './deposit/index';
import { DocumentsComponent }     from './documents/index';
import { CheckoutComponent }      from './paymentprocessors/index';
import { AuthGuard }              from './_guards/index';

const appRoutes: Routes = [
    { path: '',  component: HomeComponent, canActivate: [AuthGuard]  },
    { path: 'logout', component: LogoutComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'history',  component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'deposit',  component: DepositComponent, canActivate: [AuthGuard] },
    { path: 'checkout',  component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'documents',  component: DocumentsComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule  {}
