import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AdvertService } from "../../advert.service";

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent implements OnInit {
 editInfo:boolean = false;
 commands:boolean = false;

 @Output() message = new EventEmitter;
 @Output() error = new EventEmitter;
 @Output() refresh = new EventEmitter;

 editRequest : any = {
   email: '',
   ref: ''
 }
 previewAd: any = {
  title: ' ',
  description: ' ',
  rooms: ' ',
  price: ''
 }

 editForm : FormGroup;
  constructor(
    private advertService : AdvertService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'email': new FormControl(this.editRequest.email, 
        [
        Validators.required,
        Validators.email,
      ]),
      'ref': new FormControl(this.editRequest.ref, 
        [
        Validators.required
      ]),
    });
  }

  getAdvert(){
    if(this.editForm.status === 'INVALID'){
      console.log('form is invalid')
    }
    else{
      this.editRequest = this.editForm.value;
      this.advertService.sendEdit(this.editRequest).subscribe((data)=>{
        this.previewAd.title = data['title'];
        this.previewAd.description = data['description'];
        this.previewAd.rooms = data['rooms'];
        this.previewAd.price = data['price'];
        this.commands = true;
        this.editInfo = false;
      },(err)=>{
        this.error.emit(err.error.error)
      });
    }
  }

  markAsSold(){
    this.editRequest = this.editForm.value;
      this.advertService.markSold(this.editRequest).subscribe((data)=>{
        this.commands = false;
        this.editInfo = false;
        this.message.emit(data['result'])
        this.refresh.emit()
      },(err)=>{
        this.error.emit(err.error.error)
      });
  }

  deleteAd(){
    this.editRequest = this.editForm.value;
      this.advertService.deleteAdvert(this.editRequest).subscribe((data)=>{
        console.log(data)
        this.commands = false;
        this.editInfo = false;
        this.message.emit(data['result'])
        this.refresh.emit()
      },(err)=>{
        this.error.emit(err.error.error)
      });
  }

  editAdd(){
    !this.editInfo? this.editInfo = true : this.editInfo= false
  }

  editCommands(){
    !this.commands? this.commands = true : this.commands= false
  }

  cancelEdit(){
    this.editInfo = false;
    this.commands = false;
    this.previewAd = {};
    this.editRequest = {}
    this.message.emit('Cancelled')
  }
}
