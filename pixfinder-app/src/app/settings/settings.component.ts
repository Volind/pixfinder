import { AppService } from './../app.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  @Input() filter: PFFilter;
  @Output() filterChange: EventEmitter<PFFilter> = new EventEmitter<PFFilter>();

  constructor() {}

  refreshCount() {
    this.filterChange.emit(this.filter);
  }
}
