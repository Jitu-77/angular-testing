import { Injectable } from '@angular/core';
import { LogService } from '../Log/log.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private logService : LogService) {}

  addNumbers(number1 : number,number2:number)
  {
    console.log("Inside add")
    this.logService.logMessage("In add")
    return number1 + number2
  }

  substractNumbers(number1 : number,number2:number){
    console.log("Inside sub")
    this.logService.logMessage("In sub")
    return number1 - number2
  }
}
