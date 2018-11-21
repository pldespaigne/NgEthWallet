import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './wallet/containers/about/about.component';
import { WalletComponent } from './wallet/containers/wallet/wallet.component';

const routes: Routes = [
  { path: 'wallet/about', component: AboutComponent },
  { path: 'wallet', component: WalletComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
