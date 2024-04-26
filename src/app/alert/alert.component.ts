import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../shared/services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit, OnDestroy{

  delay = 5000
  type: string = 'danger'
  text: string | null  = null
  aSub!: Subscription

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text,
      this.type = alert.type
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = null
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
}
