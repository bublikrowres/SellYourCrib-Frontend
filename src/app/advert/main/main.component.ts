import { Component, OnInit } from '@angular/core';
import { AdvertService } from "../advert.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  advertsArray: any;
  timeoutMessage:any;
  timeoutError:any;
  userMessage: string = 'message'
  error: string = 'error';
  messageAlert:boolean = false;
  errorAlert:boolean = false;
  constructor(
    private advertService : AdvertService
  ) { }

  ngOnInit() {
    this.refreshAdverts()
  }

  refreshAdverts(){
    this.advertService.getAdverts().subscribe((data)=>{
      this.advertsArray = data;
    })
  }

  displayError(message){
      this.error = message;
      this.errorAlert = true;
      clearTimeout(this.timeoutError);
      this.timeoutError = setTimeout(() => {
        this.errorAlert = false;
      }, 3000);
  }
  updateMessage(message){
      this.userMessage = message;
      this.messageAlert = true;
      clearTimeout(this.timeoutMessage);
      this.timeoutMessage = setTimeout(() => {
        this.messageAlert = false;
      }, 3000);
  }
  
}
