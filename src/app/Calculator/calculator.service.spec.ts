// main objective is to not use beforeEach 
// main objective is to use setUp (arbitrary name)
import { TestBed } from '@angular/core/testing';
import { LogService } from '../Log/log.service';
import { CalculatorService } from './calculator.service';

function setUp(){   //added
   const  mockLoggerService = jasmine.createSpyObj('LogService',['logMessage']) 
    TestBed.configureTestingModule({
      providers:[CalculatorService,{
        provide:LogService,
        useValue:mockLoggerService
      }]
    })
    const calculatorService = TestBed.inject(CalculatorService)
    const loggerServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService> 
    return {calculatorService , loggerServiceSpy}
}

describe('calculator Service test',()=>{
//   let calculatorService :any
//   let mockLoggerService :any
//   let loggerServiceSpy : jasmine.SpyObj<LogService> 
    // commenting before Each  
    //   beforeEach(()=>{
//     mockLoggerService = jasmine.createSpyObj('LogService',['logMessage']) 
//     TestBed.configureTestingModule({
//       providers:[CalculatorService,{
//         provide:LogService,
//         useValue:mockLoggerService
//       }]
//     })
//     calculatorService = TestBed.inject(CalculatorService)
//     loggerServiceSpy = TestBed.inject(LogService) as jasmine.SpyObj<LogService> 
    //   })
    //
  it('should add 2 nos',()=>{
    const {calculatorService , loggerServiceSpy} = setUp() //added
    let add = calculatorService.addNumbers(2,2);
    expect(add).toBe(4);
    expect(loggerServiceSpy.logMessage).toHaveBeenCalledTimes(1)
  })

  it('should sub 2 nos',()=>{
    const {calculatorService , loggerServiceSpy} = setUp() //added
    let sub = calculatorService.substractNumbers(4,2);
    expect(sub).toBe(2);
    expect(loggerServiceSpy.logMessage).toHaveBeenCalledTimes(1)
  })
})
