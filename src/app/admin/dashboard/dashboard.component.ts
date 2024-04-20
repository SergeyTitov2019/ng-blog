import {Component, OnDestroy, OnInit} from '@angular/core';
import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces/post";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

  posts: Post[] = []
  postSub!: Subscription

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getAll().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if(this.postSub){
      this.postSub.unsubscribe()
    }
  }

  onDelete(id: string | undefined) {
    console.log(id)
  }
}
