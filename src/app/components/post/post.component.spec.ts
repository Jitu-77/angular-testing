import { first } from "rxjs";
import { Post } from "../../Models/post";
import { PostComponent } from "./post.component"
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
// TESTING THE POST COMPONENT WITHOUT TEMPLATE****************
// describe('Post Child Component',()=>{
//   it('should raise an event when the delete post is clicked',()=>{
//     const comp = new PostComponent()
//     const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
//     comp.post = post;
//     comp.delete.pipe(first()).subscribe((selectedPost)=>{
//       expect(selectedPost).toEqual(post)
//     })
//     comp.onDeletePost(new MouseEvent('click'))
//   })
// })
//***************************************************************
// *********************With template*****************************
describe('Create Post Component',()=>{
    let fixture : ComponentFixture<PostComponent>
    let component : PostComponent
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[PostComponent],
            schemas: [NO_ERRORS_SCHEMA], // we have added as we have not added router module but in html there is router link
        })
        fixture = TestBed.createComponent(PostComponent)
        component = fixture.componentInstance
    })
    it('should be defined',()=>{
        expect(component).toBeDefined()
    })
    it('should have post title',()=>{
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;
    fixture.detectChanges()
    // ****************************USING NATIVE EL************************************
    // let postDom :HTMLElement = fixture.nativeElement
    // let postEl = postDom.querySelector('a')
    // expect(postEl?.textContent).toContain(post.title)
    // *****************************USING DEBUG EL***********************************
    let postDom  = fixture.debugElement
    let postEl :HTMLElement = postDom.query(By.css('a')).nativeElement
    expect(postEl?.textContent).toContain(post.title)
    })
    
    it('should raise an event when the delete post is clicked',()=>{
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;
    component.delete.pipe(first()).subscribe((selectedPost)=>{
      expect(selectedPost).toEqual(post)
    })
    component.onDeletePost(new MouseEvent('click'))
  })
})