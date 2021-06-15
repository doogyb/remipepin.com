import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageLinkService {

  constructor(private http: HttpClient) { }

  getImageLinks(): any {

    // test imgur album
    // const url = "https://api.imgur.com/3/album/0N6a9B5/images"
    // real imgur album
    const url = "https://www.remipepin.com/api/tiles";
    return this.http.get(url);
  }
}