import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcelService } from '../services/parcel.service';
import { Parcel } from '../models/parcel.model';

@Component({
  selector: 'app-parcel-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Parcel List</h2>
    <ul>
      <li *ngFor="let parcel of parcels">
        <strong>{{ parcel.name }}</strong> → {{ parcel.weight }} ({{ parcel.status }})
      </li>
    </ul>
  `
})
export class ParcelListComponent implements OnInit {
  parcels: Parcel[] = [];

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.parcelService.getParcels().subscribe({
      next: (data) => this.parcels = data,
      error: (err) => console.error('Failed to load parcels', err)
    });
  }
}