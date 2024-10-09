import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {

  transform(value: number): String {
    if(value < 10){
      return value+' weak'
    }else  if (value <=20){
      return value+' stronger'
    }else{
      return value+' strongest'
    }
  }
}
