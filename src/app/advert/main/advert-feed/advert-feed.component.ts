import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advert-feed',
  templateUrl: './advert-feed.component.html',
  styleUrls: ['./advert-feed.component.scss']
})
export class AdvertFeedComponent implements OnInit {
  contactDetails: boolean = false;
  @Input() advert: any;
  constructor(  ) 
      {   }

  ngOnInit() {
  }

}
