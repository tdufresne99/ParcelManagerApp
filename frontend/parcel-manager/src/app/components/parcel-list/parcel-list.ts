import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcelService } from '../../services/parcel.service';
import { ParcelModel, ParcelStatus } from '../../models/parcel.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parcel-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './parcel-list.html',
  styleUrl: './parcel-list.scss',
})
export class ParcelList implements OnInit {
  private parcels: ParcelModel[] = [];
  private statusOptions: string[] = Object.values(ParcelStatus);

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.loadParcels();

  }

  private loadParcels() {
    this.parcelService.getParcels().subscribe({
      next: (data) => (this.parcels = data),
      error: (err) => console.error('Failed to load parcels', err),
    });
  }

  public deleteParcel(id: number) {
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

  public editParcel(parcelId: number) {
    // Navigate to the update form with the parcel ID
    window.location.href = `/update/${parcelId}`;
  }

  onStatusChange(parcel: ParcelModel, newStatus: string) {
    this.parcelService.updateParcelStatus(parcel.id, newStatus).subscribe({
      next: () => (parcel.status = newStatus),
      error: (err) => console.error('Failed to update status', err),
    });
  }

  public GetParcels(): ParcelModel[] {
    return this.parcels;
  }
  public GetStatusOptions(): string[] {
    return this.statusOptions;
  }
}
