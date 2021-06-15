import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Tile } from '../tile'
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const LEFT = 2;
const RIGHT = 4;

@Component({
  selector: 'tile-detail',
  templateUrl: './tile-detail.component.html',
  styleUrls: ['./tile-detail.component.scss'],
})
export class TileDetailComponent implements OnInit {

  faTimes = faTimes;
  visible = false;

  constructor() { }
  @Input() tile?: Tile;
  @Input() tiles?: Tile[];

  @ViewChild('carousel') carousel: NgbCarousel

  ngOnInit(): void {
  }

  onSwipe(event): void {

    console.log("Swiping");

    if (event.direction == LEFT) {
      this.carousel.next();
    }
    if (event.direction == RIGHT) {
      this.carousel.prev();
    }
  }

}
