// testing the component class as well as template 

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Post } from "../../Models/post";
import { PostsComponent } from "./posts.component";
import { PostService } from "../../service/post.service";
import { of } from "rxjs";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";

describe('PostsComponent', () => {
    // we need to create a mock post service as there is dependency and we need to test in isolation
    let POSTS: Post[];
    let component : PostsComponent
    let mockPostService :any
    let fixture:ComponentFixture<PostsComponent>
    // **************************using FAKE Components*************
    // @Component({
        //     selector:'app-post',
        //     template:`<div></div>`
        // })
        // class FakePostComponent{
            //     @Input() post!:Post
            // }
    // **************************using FAKE Components*************
    beforeEach(()=>{
      POSTS = [
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
      mockPostService = jasmine.createSpyObj(['getPosts','deletePosts'])
      TestBed.configureTestingModule({
        declarations:[PostsComponent,
            // FakePostComponent // or we use schema 
            PostComponent //actual child component testing
        ],
        schemas: [NO_ERRORS_SCHEMA], 
        // need to add other wise gives error due to custom schema (child --<app-post>)
        // or we need to mock the (child --<app-post>) or post component
        providers:[
          {
            provide:PostService,
            useValue:mockPostService
          }
        ]
      })
      fixture = TestBed.createComponent(PostsComponent)
      component = fixture.componentInstance
    })

    it('should call getPost from the service directly',()=>{
        mockPostService.getPosts.and.returnValue(of(POSTS))
        fixture.detectChanges()
        // component.ngOnInit()
        expect(component.posts.length).toBe(3)
    })

    //mock test cases for fake child component and ngFor
    // it('should create as many Posts as child components',()=>{
    //     mockPostService.getPosts.and.returnValue(of(POSTS))
    //     fixture.detectChanges()
    //     let debugEl = fixture.debugElement
    //     let postComponents = debugEl.queryAll(By.css('.posts'))
    //     expect(postComponents.length).toBe(POSTS.length)
    // })
    //

    //actual component testing -- Deep Integration test
        it('should create as many Posts as child components',()=>{
        mockPostService.getPosts.and.returnValue(of(POSTS))
        fixture.detectChanges()
        let postComponents = fixture.debugElement.queryAll(By.directive(PostComponent))
        expect(postComponents.length).toBe(POSTS.length)
    })
    //
    // here we are checking each child components values by creating child component instance
    // i.e parent passing to child data via input
    it('should check whether posts is sending data to post component',()=>{
        mockPostService.getPosts.and.returnValue(of(POSTS))
        fixture.detectChanges()
        let postComponents = fixture.debugElement.queryAll(By.directive(PostComponent))
        for(let i=0;i<postComponents.length;i++){
            let postComponentsInstance = postComponents[i].componentInstance as PostComponent
            expect(postComponentsInstance.post.title).toBe(POSTS[i].title)
        }
    })
    //
    describe('delete POST', () => {
      beforeEach(() => {
        mockPostService.deletePosts.and.returnValue(of(true));
        //commented while using class based mocking
        component.posts = POSTS;
        component.delete(POSTS[1])
      });
      it('should delete the selected Post from the posts', () => {
        expect(component.posts.length).toBe(2);
      });
      it('should call the delete the actual Post', () => {
          for(let post of component.posts){
              expect(post).not.toEqual(POSTS[1])
            }
      });
      it('should call the deletePosts in post Service', () => {
          component.delete(POSTS[1])
          expect(mockPostService.deletePosts).toHaveBeenCalledTimes(2)
      });
      it('should call delete method when post component button is clicked',()=>{
        //check video 37
        //to simulate a delete operation we need to spyOn
        spyOn(component,'delete') //parent component delete method
        mockPostService.getPosts.and.returnValue(of(POSTS))
        fixture.detectChanges()
        let postComponentDebugEl = fixture.debugElement.queryAll(
          By.directive(PostComponent)
        ) // creating the Post component debug El
        // for 0th el
        postComponentDebugEl[0].query(By.css('button')) //catching the first element by css 
        .triggerEventHandler('click',{preventDefault:()=>{}}) // simulates the click event
        expect(component.delete).toHaveBeenCalledWith(POSTS[0])
        //
        //for nth el
        for(let i =0 ;i<postComponentDebugEl.length;i++){
          postComponentDebugEl[i].query(By.css('button')) //catching the first element by css 
          .triggerEventHandler('click',{preventDefault:()=>{}}) // simulates the click event
          expect(component.delete).toHaveBeenCalledWith(POSTS[i])
        }
      })
      it('should call the delete button when event is emitted from child post component',()=>{
        spyOn(component,'delete') // parent component delete method
        mockPostService.getPosts.and.returnValue(of(POSTS))
        fixture.detectChanges()
        let postComponentDebugEl = fixture.debugElement.queryAll(By.directive(PostComponent));


        // (postComponentDebugEl[0].componentInstance as PostComponent).delete.emit(POSTS[0])
        // expect(component.delete).toHaveBeenCalledWith(POSTS[0])
        // expect(component.delete).toHaveBeenCalledTimes(1)


        for(let i =0 ;i<postComponentDebugEl.length;i++){
          (postComponentDebugEl[i].componentInstance as PostComponent).delete.emit(POSTS[i])
          expect(component.delete).toHaveBeenCalledWith(POSTS[i])
        }


      })
    })
  });