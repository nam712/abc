import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from './product.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:800px;margin:auto;padding:16px">
      <h2>Products</h2>
      <div *ngIf="products().length === 0">No products already use!!bfbfc333 22</div>
      <ul>
        <li *ngFor="let p of products()">
          {{p.name}} — {{p.price | number:'1.0-2'}} —
          <button (click)="edit(p)">Edit</button>
          <button (click)="remove(p.id!)">Delete</button>
        </li>
      </ul>

      <hr>
      <h3>{{editingId ? 'Edit' : 'Add'}} product</h3>
      <form (ngSubmit)="save()">
        <input [(ngModel)]="model.name" name="name" placeholder="Name" required />
        <input [(ngModel)]="model.price" name="price" type="number" placeholder="Price" />
        <input [(ngModel)]="model.stock" name="stock" type="number" placeholder="Stock" />
        <button type="submit">{{editingId ? 'Update' : 'Create'}}</button>
        <button type="button" (click)="reset()">Cancel</button>
      </form>
    </div>
  `
})
export class AppComponent {
  private svc = inject(ProductService);
  products = signal<Product[]>([]);
  model: Product = {};
  editingId: number | null = null;

  constructor() { this.load(); }

  load() {
    this.svc.getAll().subscribe(list => this.products.set(list));
  }

  edit(p: Product) { this.model = {...p}; this.editingId = p.id ?? null; }
  reset() { this.model = {}; this.editingId = null; }

  save() {
    if (this.editingId) {
      this.svc.update(this.editingId, this.model).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.svc.create(this.model).subscribe(() => { this.reset(); this.load(); });
    }
  }

  remove(id: number) {
    if (!confirm('Delete?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }
}
