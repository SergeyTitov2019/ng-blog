import {Component, OnDestroy, OnInit} from '@angular/core';
import { PostService } from "../../shared/services/post.service";
import { Post } from "../../shared/interfaces/post";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

  posts: Post[] = []
  postSub!: Subscription
  deleteSub!: Subscription
  searchStr: string = ''

  constructor(private postService: PostService,
              private alertService: AlertService,
              ) {}

  ngOnInit() {
    this.postService.getAll().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  ngOnDestroy() {
    if(this.postSub){
      this.postSub.unsubscribe()
    }
    if(this.deleteSub){
      this.deleteSub.unsubscribe()
    }
  }

  onDelete(id: any) {
      this.deleteSub = this.postService.remove(id)?.subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.danger('Post was deleted')
      })
  }
}
