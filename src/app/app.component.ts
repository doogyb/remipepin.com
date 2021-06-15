import { Component, ViewChild } from '@angular/core';
import { GridComponent } from './grid/grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'remi';
  @ViewChild('grid') grid: GridComponent;

  hideCarousel() {
    this.grid.detail.visible = false;
  }
}
