import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  message:string[]=[]
  constructor() { 
    console.log("Inside log constructor")
  }

  logMessage(data:string){
    console.log("Inside log message")
    this.message.push(data)
  }

  clearMessage(){
    this.message = []
  }
}
