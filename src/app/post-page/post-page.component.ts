import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { PostService } from "../shared/services/post.service";
import { Observable, switchMap } from "rxjs";
import { Post } from "../shared/interfaces/post";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post> = new Observable<Post>()

  constructor(private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      }))
  }

}
