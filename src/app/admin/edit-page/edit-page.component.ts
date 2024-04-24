import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { PostService } from "../../shared/services/post.service";
import {Subscription, switchMap} from "rxjs";
import { Post } from "../../shared/interfaces/post";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post!: Post
  submitted = false
  updateSub: Subscription = new Subscription()

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router,
              private alertService: AlertService

  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.form = new FormGroup<any>({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    })
  }

  submit() {
    this.submitted = true
    if(this.form.invalid){
      return
    }
    this.updateSub = this.postService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false
      this.router.navigate(['admin', 'dashboard'])
      this.alertService.success('Post was successfully updated')
    })
  }

  ngOnDestroy() {
    if(this.updateSub){
      this.updateSub.unsubscribe()
    }
  }
}
