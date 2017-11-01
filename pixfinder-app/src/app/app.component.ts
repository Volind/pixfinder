import { AppService } from './app.service';
import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: Object;
  filter: PFFilter;
  counter: number;

  queryInfo = {
    active: true,
    currentWindow: true
  };

  constructor(private appService: AppService, private zone: NgZone) {
    this.counter = 0;
    this.filter = {
      showImageTags: true,
      showPictureTags: true,
      showCSSImages: true,
      width: 0,
      height: 0
    };
    this.options = {
      filter: this.filter
    };
  }

  ngOnInit() {
    this.appService.sendRequestToContentScripts(this.options, this.refreshCount.bind(this));
  }

  filterChange(event: PFFilter) {
    this.filter = event;
    this.appService.sendRequestToContentScripts(this.options, this.refreshCount.bind(this));
  }

  refreshCount(count: number) {
    this.zone.run(() => {
      this.counter = count;
    });
  }
}
