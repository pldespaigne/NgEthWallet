import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerationComponent } from './containers/generation/generation.component';
import { ImportComponent } from './containers/import/import.component';
import { WalletComponent } from './containers/wallet/wallet.component';

const routes: Routes = [
    // {path: '', redirectTo: 'generate', pathMatch: 'full'},
    {path: '', component: WalletComponent},
    {path: 'generate', component: GenerationComponent},
    {path: 'import', component: ImportComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule { }
