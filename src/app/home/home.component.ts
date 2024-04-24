import {Component, OnInit} from '@angular/core';
import {PostService} from "../shared/services/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces/post";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  posts$: Observable<Post[]> = new Observable<Post[]>()

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getAll()
  }
}
