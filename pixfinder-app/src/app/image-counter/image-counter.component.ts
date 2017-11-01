import { Component, Input } from '@angular/core';

@Component({
  selector: 'image-counter',
  templateUrl: './image-counter.component.html',
  styleUrls: ['./image-counter.component.css']
})
export class ImageCounterComponent {
  @Input() count: number;

  constructor() {}
}
