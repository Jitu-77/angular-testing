import { HttpClientTestingModule, HttpTestingController } from
 "@angular/common/http/testing"
import { PostService } from "./post.service"
import { TestBed } from "@angular/core/testing";

    describe('post service testing using Http Client Testing Module',()=>{
    let postService :PostService;
    let httpTestingController:HttpTestingController;
    let POSTS = [
        {
          id: 1,
          body: 'body 1',
          title: 'title 1',
        },
        {
          id: 2,
          body: 'body 2',
          title: 'title 2',
        },
        {
          id: 3,
          body: 'body 3',
          title: 'title 3',
        },
      ];
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[PostService],
            imports:[HttpClientTestingModule]
        })
        postService = TestBed.inject(PostService)
        httpTestingController = TestBed.inject(HttpTestingController)
    })
  
    describe('getPosts()',()=>{
        it('should return list of posts when called',(done :DoneFn)=>{
            postService.getPosts().subscribe((data)=>{
                expect(data).toEqual(POSTS)
                done()
            })
            const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts')
            request.flush(POSTS)
            expect(request.request.method).toBe('GET')
        })
    })
    describe('getPost(postId)',()=>{
        it('should return post/id when called',(done :DoneFn)=>{
            postService.getPost(1).subscribe()
            const request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1')
            expect(request.request.method).toBe('GET')
            done()
        })
    })
    afterEach(()=>{
        // httpTestingController.verify() // verifies whether all the assertions are correct
    })
})