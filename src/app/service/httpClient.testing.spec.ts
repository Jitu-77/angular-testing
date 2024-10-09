//Test the http client module 
//http service depends on http backend handler 
//<http backend handler> -- makes the http requests 
// HTTP CLIENT MODULE ACTUALLY CALLS THE API 
//SO INSTEAD USE <HTTP CLIENT TESTING> 
//NO ACTUAL CALL IS MADE
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing" 
// this module is provided by Angular only for testing
// but again for test assertions we need <HTTP TESTING CONTROLLER>
import { TestBed } from "@angular/core/testing";
let testUrl ="/data"
interface Data {   // interface of test url
    name:string 
}
describe('http Client testing Module',()=>{
    let httpClient :HttpClient;
    let httpTestingController:HttpTestingController
    beforeEach(()=>{
        TestBed.configureTestingModule({
            // imports:[HttpClientModule]
            imports:[HttpClientTestingModule]
        })
        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController) // added for testing assertions
    })
    it('should call the test url with get request',()=>{
        let testData ={name:"Jitu Pal"} 
        httpClient.get<Data>(testUrl).subscribe((data)=>{
            expect(data).toEqual(testData)
        }) 
        // subscribe is need else it wont call
        // we need to test how many req are made , and all sort of assertions
        //so we need <HTTP TESTING CONTROLLER>
        //have inbuilt functions -- eg:expectOne /expectNone
        const request = httpTestingController.expectOne(testUrl)
        request.flush(testData) // request.flush simulates/mocks a server response 
        expect(request.request.method).toBe('GET')
    })
    it('should call multiple request',()=>{
        const testData = [{name:"asd"},{name:"xyz"}]
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data.length).toBe(0) // expecting blank array randomly
        })
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data).toEqual([testData[0]]) // expecting only 1 element
        })
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data).toEqual(testData) // expecting array of elements
        })
        const request = httpTestingController.match(testUrl) 
        // match is to count how many nos the apis is called i.e >1 || multiple times
        expect(request.length).toBe(3) //as 3 calls 
        request[0].flush([])
        request[1].flush([testData[0]])
        request[2].flush(testData)
    })
})
