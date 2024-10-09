import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostDetailComponent } from "./post-detail.component"
import { PostService } from "../../service/post.service"
import { ActivatedRoute } from "@angular/router"
import { Post } from "../../Models/post"
import { By } from "@angular/platform-browser"
import { of } from "rxjs"
import { FormsModule } from "@angular/forms"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe('PostDetails Component',()=>{
  let fixture : ComponentFixture<PostDetailComponent> // instantiating the component
  let mockPostService :jasmine.SpyObj<PostService>
  beforeEach(()=>{
    mockPostService = jasmine.createSpyObj(['getPost','updatePost'])
    let mockLocation = jasmine.createSpyObj(['back'])
    // we don't have inbuilt method for activated route 
    //hence we will create a obj and return a value say 3
    let mockActivatedRoute = { 
      snapshot:{
        paramMap:{
          get:()=>{
            return 3
          }
        }
      }
    }
    TestBed.configureTestingModule({
      declarations:[PostDetailComponent],
      imports:[FormsModule],
      providers:[
        {provide:Location,useValue:mockLocation},
        {provide:PostService,useValue:mockPostService},
        {provide:ActivatedRoute,useValue:mockActivatedRoute}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    fixture = TestBed.createComponent(PostDetailComponent )
  })
  it('should render post title in h2 template ',()=>{
    mockPostService.getPost.and.returnValue(of({
      id:3,
      title: 'Title 1',
      body:'Body 1'
    } as Post))
    fixture.detectChanges()
    const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title)

  })
})