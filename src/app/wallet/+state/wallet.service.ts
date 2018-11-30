import { Injectable } from '@angular/core';

import { WalletStore } from './wallet.store';

import { ethers } from 'ethers';
import { WalletQuery } from './wallet.query';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private store: WalletStore, private query: WalletQuery, private http: HttpClient) {}

  randomMnemonic() {
    const mnemoString = ethers.Wallet.createRandom().mnemonic;
    console.log(mnemoString); // TODO REMOVE DEBUG LOG
    const mnemonic = mnemoString.split(' ');

    this.store.update(state => ({ mnemonic }));
  }

  setMnemonic(mnemo: string) {
    const mnemonic = mnemo.split(' ');
    this.store.update(state => ({ mnemonic }));
  }

  setKeystore(keystore: string) {
    this.store.update(state => ({ keystore }));
  }

  public async createEncryptedWallet(password: string) {
    const mnemonic = this.query.getSnapshot().mnemonic;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic.join(' '));
    const keystore = await wallet.encrypt(password);
    this.store.update(state => ({ keystore }));
    return keystore;
  }

  public async createEncryptedWalletFromMnemonic(mnemonic: string, password: string) {
    // const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    this.setMnemonic(mnemonic);
    // const keystore = await wallet.encrypt(password);
    // this.store.update(state => ({ keystore }));
    // return keystore;
    return this.createEncryptedWallet(password);
  }

  public async ethPrice() {
    const data = await this.http.get('https://api.coinmarketcap.com/v2/ticker/1027/').toPromise();
    return data['data']['quotes']['USD']['price'];
  }

  public async gasPrice() {
    return ethers.getDefaultProvider('kovan').getGasPrice();
  }

  public async txCount() {
    return ethers.getDefaultProvider('kovan').getTransactionCount(ethers.utils.getJsonWalletAddress(this.query.getSnapshot().keystore));
  }

  public async sendEther(tx: ethers.utils.Transaction, password: string) {
    let wallet = await ethers.Wallet.fromEncryptedJson(this.query.getSnapshot().keystore, password);
    const provider = ethers.getDefaultProvider('kovan');
    wallet = wallet.connect(provider);

    const txResponse = await wallet.sendTransaction(tx);
    console.log(txResponse);
  }
}
