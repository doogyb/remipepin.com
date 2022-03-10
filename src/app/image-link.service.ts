import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageLinkService {
  constructor(private http: HttpClient) {}

  getImageLinks(): any {
    const url = 'http://localhost:1338/api/tiles?populate=*';
    return this.http.get(url);
  }
}
