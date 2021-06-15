import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageLinkService } from '../image-link.service'
import { ImgurImage } from '../imgur-image';
import { TileDetailComponent } from '../tile-detail/tile-detail.component';
import { Tile } from '../tile'
import { isConstructorDeclaration } from 'typescript';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  tiles: Tile[];
  breakpoint: number;
  selectedTile: Tile;
  @ViewChild('tile_detail',) detail: TileDetailComponent;

  // taken from bootstrap
  breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  };


  constructor(private imageLinkService: ImageLinkService) { }

  ngOnInit(): void {
    this.breakpoint = this.getColumns(window.innerWidth);
    this.getTiles();
  }

  onResize(event) {
    this.breakpoint = this.getColumns(event.target.innerWidth);
  }

  getColumns(width: number): number {

    var cols: number;
    switch (true) {
      case (width <= this.breakpoints.sm):
        cols = 1
        break;
      case (width <= this.breakpoints.md):
        cols = 2;
        break;
      case (width <= this.breakpoints.lg):
        cols = 3;
        break;
      case (width <= this.breakpoints.xl):
        cols = 4;
        break;
      case (width <= this.breakpoints.xxl):
        cols = 5;
        break;
      default:
        cols = 5;
        break;
    }
    return cols
  }

  parseImgurImages(data: any): void {
    console.log(data);
    var buffer = [];
    let n = 0;
    // for (let img of data) {
    //   buffer.push(new Tile(img))
    // }
    for (let img of data) {
      var details = JSON.parse(img.description)
      if (!details) {
        continue;
      }
      if (!(details.position in buffer)) {
        buffer[details.position] = {
          id: details.position,
          datetime: img.datetime,
          description: details.description,
          height: img.height,
          size: img.size,
          tags: img.tags,
          title: details.title,
          type: img.type,
          width: img.width,
          front: true,
        };
      }
      if (details.type.toLowerCase() === 'cover') {
        buffer[details.position].coverLink = img.link;
      }
      if (details.type.toLowerCase() === 'square') {
        buffer[details.position].squareLink = img.link;
      }
      n += 1;
    }
    var temp = [];
    for (var i = 1; i <= n / 2; i++) {
      if (buffer[i].coverLink && buffer[i].squareLink) {
        temp.push(buffer[i]);
      }
    }
    this.tiles = temp;
  }

  getTiles(): void {
    const observer = {
      next: data => this.tiles = data,
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log(this.tiles),
    };
    this.imageLinkService.getImageLinks()
      .subscribe(observer);
  }

  selectTile(tile: Tile): void {
    this.selectedTile = tile;
    this.detail.visible = true;

    window.scroll(0, 0);
    if (this.detail.carousel) {
      this.detail.carousel.select(tile.id);
      console.log("Selecting: " + tile.id.toString());
      console.log(this.detail.carousel);
    }
  }
}
