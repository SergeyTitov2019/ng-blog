import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces/post";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{

  form!: FormGroup

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.form = new FormGroup<any>({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date(),
    }
    console.log(post);
    this.postService.create(post).subscribe(() => {
      this.form.reset()
    })
  }
}
