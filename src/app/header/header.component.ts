import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() hideCarouselEvent = new EventEmitter();
  faInstagram = faInstagram;

  constructor() { }
  ngOnInit(): void {
  }

  hideCarousel() {
    this.hideCarouselEvent.emit();
  }

}
