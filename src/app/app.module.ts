import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { TileDetailComponent } from './tile-detail/tile-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HammerModule } from '@angular/platform-browser';
import { AppearDirective } from './appear.directive';
import { InViewportModule } from '@thisissoon/angular-inviewport';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    TileDetailComponent,
    GridComponent,
    HeaderComponent,
    AppearDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    NgbModule,
    HammerModule,
    InViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
