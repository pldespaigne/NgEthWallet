
import {Pipe, PipeTransform} from '@angular/core';
// import { BigNumber } from 'ethers/utils';

import { ethers } from 'ethers';

@Pipe({name: 'eth'})
export class EtherPipe implements PipeTransform {
    transform(value: ethers.utils.BigNumberish): string { // BigNumberish = BigNumber | string | number | Arrayish
        if (value === undefined) return '...';
        else return ethers.utils.formatEther(value) + ' ETH';
    }
}

@Pipe({name: 'wei'})
export class WeiPipe implements PipeTransform {
    transform(value: ethers.utils.BigNumberish): string {
        if (value === undefined) return '...';
        else return value.toString() + ' WEI';
    }
}

@Pipe({name: 'ethusd'})
export class EtherToUsd implements PipeTransform {
    transform(value: ethers.utils.BigNumberish, price: number = 0): string {
        if (value === undefined) return '...';
        else {
            const eth = ethers.utils.formatEther(value);
            const num = +eth; // convert string to number
            return (num * price).toFixed(2) + ' $';
        }
    }
}
