import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AdvertService } from "../../advert.service";
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Advert } from "../../../shared/models/advert";


@Component({
  selector: 'app-new-advert',
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.scss']
})
export class NewAdvertComponent implements OnInit {
  @Output() refresh = new EventEmitter;
  @Output() message = new EventEmitter;
  @Output() error = new EventEmitter;
 
  add: boolean = false;
  imagesArray= [' ',' '];
  advert:Advert = {
    email : '',
    title : '',
    description : '',
    rooms : '',
    address : {
      firstLine: '',
      secondLine: '',
      city: '',
      country: '',
    },
    phoneNumber : '',
    images: [],
    price : ''
  }
  advertForm : FormGroup;

  constructor(
    private advertService : AdvertService
  ) { }

  ngOnInit(): void {
    this.advertForm = new FormGroup({
      'email': new FormControl(this.advert.email, 
        [
        Validators.required,
        Validators.email,
      ]),
      'phoneNumber': new FormControl(this.advert.phoneNumber, 
        [
        
      ]),
      'title': new FormControl(this.advert.title,
        [
          Validators.required,
          Validators.maxLength(150),
        ]),
      'description': new FormControl(this.advert.description,
        [
          Validators.required,
          Validators.maxLength(500),
        ]),
      'rooms': new FormControl(this.advert.rooms,
        [
          
        ]),
      'firstLine': new FormControl(this.advert.address.firstLine,
        [
          
        ]),
      'secondLine': new FormControl(this.advert.address.secondLine,
        [
          
        ]),
      'city': new FormControl(this.advert.address.city,
        [
          
        ]),
      'country': new FormControl(this.advert.address.country,
        [
          
        ]),
      'price': new FormControl(this.advert.price,
        [
          
        ]),
    });
  }

  addAdvert(){
    !this.add ? this.add = true : this.add= false 
  }
  addAnotherImageInput(){
    this.imagesArray.push('');
  }
  removeLastImageInput(){
    this.imagesArray.pop();
  }

  getData(){
    if(this.advertForm.status === 'INVALID'){
      console.log('form is invalid')
    }
    else{
      this.advert.title = this.advertForm.value.title;
      this.advert.email = this.advertForm.value.email;
      this.advert.phoneNumber = this.advertForm.value.phoneNumber;
      this.advert.description = this.advertForm.value.description;
      this.advert.rooms = this.advertForm.value.rooms;
      this.advert.price = this.advertForm.value.price;
      this.advert.address.firstLine = this.advertForm.value.firstLine;
      this.advert.address.secondLine = this.advertForm.value.secondLine;
      this.advert.address.city = this.advertForm.value.city;
      this.advert.address.country = this.advertForm.value.country;
      this.advert.images = this.imagesArray; 
      this.createAdvert()
    }
  }

  updateImageArray(i,event){
    this.imagesArray[i] = event.target.value;
  }

  async createAdvert(){
      await this.advertService.createAdvert(this.advert).subscribe((data)=>{
        this.addAdvert()
        this.refresh.emit()
        this.message.emit('Ad created')
      },(err)=>{
        this.error.emit(err.error.error)
      });
  }

}
