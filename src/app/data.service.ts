import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from './models/stock.model';

import { Observable }   from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getStockListing(): Observable<Stock[]> {
    return this.http.get<Stock[]>('http://localhost:3001/api/stocks');
  }
}