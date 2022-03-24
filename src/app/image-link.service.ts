import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cms } from './conf';

@Injectable({
  providedIn: 'root',
})
export class ImageLinkService {
  constructor(private http: HttpClient) {}

  getImageLinks(): any {
    const url = `${cms}/api/tiles?populate=*&pagination[pageSize]=100`;
    return this.http.get(url);
  }
}
