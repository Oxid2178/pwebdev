import { Injectable } from '@angular/core';

enum MinInHour {
  MIN_IN_HOUR = 60
}

@Injectable()
export class TimeConverterService {

  constructor() {}

  public convertAmountInMinutes(val: string) : number {

    let retVal: number = 0;
    
    val.replace(" ", "");

    if (val.substr(2, 1) === ":") // 08:05-11:45;13:00-16:00
    {
      if (val.substr(11, 1) === ";")
      {
        let amInNum5: number = this.getAmountInNumber(val, 12, 2);
        console.log(amInNum5); // 8
        let amInNum6: number = this.getAmountInNumber(val, 15, 2);
        console.log(amInNum6); // 5
        let amInNum7: number = this.getAmountInNumber(val, 18, 2);
        console.log(amInNum7); // 11
        let amInNum8: number = this.getAmountInNumber(val, 21, 2);
        console.log(amInNum8); // 45
                    // 60                                    2                           120                     45
        retVal += (MinInHour.MIN_IN_HOUR - amInNum6) + (((amInNum7 - amInNum5) -1) * MinInHour.MIN_IN_HOUR) + (amInNum8);
        console.log(retVal); // 220 OR 220 + 400
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
      retVal += (MinInHour.MIN_IN_HOUR - amInNum2) + (((amInNum3 - amInNum1) -1) * MinInHour.MIN_IN_HOUR) + (amInNum4);
      console.log(retVal); // 220 OR 220 + 400

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
