import { TestBed } from '@angular/core/testing'
import {LogService} from './log.service'

describe('logger service',()=>{
  let loggerService : any
  beforeEach(()=>{
    //  loggerService = new LogService() // without test bed
    //with test bed 
    TestBed.configureTestingModule({
      providers:[LogService]
    })
    loggerService = TestBed.inject(LogService)
    // 
  })

  it('should add a log service message',()=>{
    let count =  loggerService.message.length
    // loggerService.logMessage('asd')
    expect(count).toEqual(0)
  })

})