import { Injectable } from '@angular/core';

@Injectable()
export class TimeConverterService {

  constructor() {}

  public convertAmountInMinutes(val: string) : number {

    let retVal: number = -1;
    
    if (val.substr(2) === ":") 
    {
      let amInNum1: number = this.getAmountInNumber(val, 0, 2);
      let amInNum2: number = this.getAmountInNumber(val, 3, 2);
      let amInNum3: number = this.getAmountInNumber(val, 6, 2);
      let amInNum4: number = this.getAmountInNumber(val, 9, 2);

    } else 
    {
      let amountInNum: number = parseFloat(val);
      retVal = amountInNum * 60.0;
    }
    
    
    return retVal
  }

  public getAmountInNumber(val: string, startPos: number, length: number) : number {
    return parseInt(val.substr(startPos, length));
  }

}
