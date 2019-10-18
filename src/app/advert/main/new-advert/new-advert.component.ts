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
  fileData: Array<File> = null;
  uploadMessage: string = '';

  imageCount = 0;
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
          Validators.required,
          Validators.max(3),
          Validators.min(1),
        ]),
      'firstLine': new FormControl(this.advert.address.firstLine,
        [
          Validators.required,
        ]),
      'secondLine': new FormControl(this.advert.address.secondLine,
        [
          
        ]),
      'city': new FormControl(this.advert.address.city,
        [
          Validators.required,
        ]),
      'country': new FormControl(this.advert.address.country,
        [
          Validators.required,
        ]),
      'price': new FormControl(this.advert.price,
        [
          Validators.required,
        ]),
    });
  }

  addAdvert(){
    !this.add ? this.add = true : this.add= false 
  }

  registerPhoto(fileInput: any){
    this.imageCount = fileInput.target.files.length;
    if(this.imageCount<2){
      return this.uploadMessage = 'Min 2 images please'
    }
    for(let i=0; i<fileInput.target.files.length; i++){
      if(!fileInput.target.files[i].type.match(/image\/*/)){
        return this.uploadMessage = 'File is not of type image'
      } 
      if(fileInput.target.files[i].size>1000000){
        return this.uploadMessage = 'File is to big(>1MB)'
      }
    }
    this.fileData = fileInput.target.files;
    this.uploadMessage = 'All files are good'
  }

  getData(){
    if(this.advertForm.status === 'VALID'){
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
      this.uploadImages()
    }
  }

  async uploadImages(){
    const formData:any = new FormData();
    const files: Array<File> = this.fileData;
    for(let i =0; i < files.length; i++){
      formData.append(`uploads`, files[i], files[i]['name']);
    }
    await this.advertService.uploadImages(formData).subscribe((data)=>{
        this.advert.images = data['imageArray'];
        this.createAdvert()
      },(err)=>{
        this.error.emit(err.error.error)
      });
  }

  async createAdvert(){
      await this.advertService.createAdvert(this.advert).subscribe((data)=>{
        this.addAdvert()
        this.message.emit('Ad created\n\n We\'ve sent you an email with the ref code.')
        this.advertForm.reset();
        this.refresh.emit()
      },(err)=>{
        this.error.emit(err.error.error)
      });
  }

}
