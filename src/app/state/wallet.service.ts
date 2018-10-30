import { Injectable } from '@angular/core';
// import { ID } from '@datorama/akita';
import { WalletStore } from './wallet.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WalletService {

  constructor(private walletStore: WalletStore,
              // private http: HttpClient
              ) {
  }

  // get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.walletStore.set(entities);
    // });
  // }

  // add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.walletStore.add(entity);
    // });
  // }

}
