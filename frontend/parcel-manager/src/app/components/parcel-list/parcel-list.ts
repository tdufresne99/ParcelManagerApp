import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcelService } from '../../services/parcel.service';
import { Parcel } from '../../models/parcel.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-parcel-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parcel-list.html',
  styleUrl: './parcel-list.scss'
})
export class ParcelList implements OnInit {
  parcels: Parcel[] = [];

  constructor(private parcelService: ParcelService) {
  }

  ngOnInit(): void {
    this.parcelService.getParcels().subscribe({
      next: (data) => this.parcels = data,
      error: (err) => console.error('Failed to load parcels', err)
    });
  }

  deleteParcel(id: number) {
    if (confirm('Are you sure you want to delete this parcel?')) {
      this.parcelService.deleteParcel(id).subscribe({
        next: () => {
          // Remove the deleted parcel from the list
          this.parcels = this.parcels.filter((p) => p.id !== id);
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }


}