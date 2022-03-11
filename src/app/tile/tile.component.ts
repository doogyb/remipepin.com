import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Tile } from '../tile';
import { cms } from '../conf';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  background: string;
  link: string;
  @Input() tile: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    let url = this.tile.attributes.square.data.attributes.url;
    this.link = `${cms}${url}`;
    Vibrant.from(this.link, { quality: 5 }).getPalette(
      (err, palette) => (this.background = palette.DarkVibrant.hex)
    );
  }

  onIntersection({
    target,
    visible,
  }: {
    target: Element;
    visible: boolean;
  }): void {
    if (visible) {
      this.renderer.addClass(target, 'active');
      this.renderer.setStyle(target, 'transform', 'rotateY(180deg)');
    } else {
      if (target.classList.contains('active')) {
        this.renderer.setStyle(target, 'transform', 'rotateY(-180deg)');
        this.renderer.removeClass(target, 'active');
      }
    }
  }
}
