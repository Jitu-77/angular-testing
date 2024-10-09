import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getPosts(){
    console.log("GET  POST SERV")
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }
  getPost(postId:any){
    console.log("GET  POST SERV")
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
  deletePosts(post: Post){
    console.log("DELETE  POST SERV")
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/post/${post.id}`
    );
  }
  updatePost(post: Post) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/post/${post.id}`,
      post
    );
  }
}
