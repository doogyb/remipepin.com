import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageLinkService } from '../image-link.service';
import { ImgurImage } from '../imgur-image';
import { TileDetailComponent } from '../tile-detail/tile-detail.component';
import { Tile } from '../tile';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  tiles: Tile[];
  breakpoint: number;
  selectedTile: Tile;
  @ViewChild('tile_detail') detail: TileDetailComponent;

  // taken from bootstrap
  breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };

  constructor(private imageLinkService: ImageLinkService) {}

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
      case width <= this.breakpoints.sm:
        cols = 1;
        break;
      case width <= this.breakpoints.md:
        cols = 2;
        break;
      case width <= this.breakpoints.lg:
        cols = 3;
        break;
      case width <= this.breakpoints.xl:
        cols = 4;
        break;
      case width <= this.breakpoints.xxl:
        cols = 5;
        break;
      default:
        cols = 5;
        break;
    }
    return cols;
  }

  getTiles(): void {
    const observer = {
      next: (data) => this.parseTiles(data),
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log(this.tiles),
    };
    this.imageLinkService.getImageLinks().subscribe(observer);
  }

  sort(arr): any[] {
    const seen = new Set();
    let result = [];
    for (const tile of arr) {
      let curr = { ...tile };
      let a = [];
      while (!seen.has(curr.id)) {
        seen.add(curr.id);
        a.unshift(curr);
        if (!curr.attributes.left.data) break;
        const id = curr.attributes.left.data.id;
        for (const next of arr) {
          if (next.id === id) {
            curr = { ...next };
            break;
          }
        }
      }
      result = result.concat(a);
    }
    return result;
  }

  parseTiles(data): void {
    console.log(data);
    this.tiles = this.sort(data.data);
  }

  selectTile(tile: Tile): void {
    this.selectedTile = tile;
    this.detail.visible = true;

    window.scroll(0, 0);
    if (this.detail.carousel) {
      this.detail.carousel.select(tile.id);
      console.log('Selecting: ' + tile.id.toString());
      console.log(this.detail.carousel);
    }
  }
}
