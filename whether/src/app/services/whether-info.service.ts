import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhetherInfoService {

  constructor(private http: HttpClient) { }

  GetCityLoction() {

  }
  GetWhetherInfo(location: string) {
    return this.http.get(environment.whetherUrl);
  }
}
