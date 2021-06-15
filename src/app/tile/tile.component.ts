import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Tile } from '../tile'

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],

})
export class TileComponent implements OnInit {

  background: string;
  link: string;
  @Input() tile: Tile;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.link = "https://www.remipepin.com/api" + this.tile.square.url;
    Vibrant.from(this.link, { quality: 5 }).getPalette((err, palette) => this.background = palette.DarkVibrant.hex);

  }

  onIntersection({ target, visible }: { target: Element; visible: boolean }): void {

    if (visible) {
      this.renderer.addClass(target, 'active');
      this.renderer.setStyle(target, "transform", "rotateY(180deg)");
    }
    else {
      if (target.classList.contains('active')) {
        this.renderer.setStyle(target, "transform", "rotateY(-180deg)");
        this.renderer.removeClass(target, 'active');
      }
    }
  }
}
