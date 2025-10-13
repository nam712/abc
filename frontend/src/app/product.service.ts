import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://13.229.98.12:8080/api/products'; // đổi theo backend url

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }
  get(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
  create(p: Product) {
    return this.http.post<Product>(this.api, p);
  }
  update(id: number, p: Product) {
    return this.http.put(`${this.api}/${id}`, p);
  }
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
