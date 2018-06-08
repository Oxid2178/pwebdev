import { Injectable } from '@angular/core';

enum MinInHour {
  MIN_IN_HOUR = 60
}

@Injectable()
export class TimeConverterService {

  constructor() {}

  public convertAmountInMinutes(val: string) : number {

    let retVal: number = -1;
    
    val.replace(" ", "");
    
    if (val.substr(2, 1) === ":") // 08:05 -11:45
    {
      if (val.substr(11, 1) === ";")
      {

      }
      let amInNum1: number = this.getAmountInNumber(val, 0, 2);
      console.log(amInNum1); // 8
      let amInNum2: number = this.getAmountInNumber(val, 3, 2);
      console.log(amInNum2); // 5
      let amInNum3: number = this.getAmountInNumber(val, 6, 2);
      console.log(amInNum3); // 11
      let amInNum4: number = this.getAmountInNumber(val, 9, 2);
      console.log(amInNum4); // 45
                          // 55                             2                           120                     45
      retVal = (MinInHour.MIN_IN_HOUR - amInNum2) + (((amInNum3 - amInNum1) -1) * MinInHour.MIN_IN_HOUR) + (amInNum4);
      console.log(retVal); // 220

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
