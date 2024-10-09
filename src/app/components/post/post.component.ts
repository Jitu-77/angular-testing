import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: Post;
  @Output() delete = new EventEmitter<Post>();

  onDeletePost(event: Event) {
    event.preventDefault();
    this.delete.emit(this.post);
  }
}
