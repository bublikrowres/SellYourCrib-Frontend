import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from "./main/main.component";
import { AdvertFeedComponent } from './main/advert-feed/advert-feed.component';
import { AdvertService } from './advert.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { NewAdvertComponent } from './main/new-advert/new-advert.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { EditAdvertComponent } from './main/edit-advert/edit-advert.component';

@NgModule({
  declarations: [AdvertFeedComponent,MainComponent, NewAdvertComponent, EditAdvertComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule
  ],
  providers: [
    AdvertService
  ],
  exports: [
    MainComponent,
    AdvertFeedComponent,
    HttpClientModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class AdvertModule { }
