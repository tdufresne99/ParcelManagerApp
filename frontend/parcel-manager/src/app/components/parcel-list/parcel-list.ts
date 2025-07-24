import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcelService } from '../../services/parcel.service';
import { ParcelModel, ParcelStatus } from '../../models/parcel.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { sortByColumn, SortDirection } from '../../Utils/sort.util';

@Component({
  selector: 'app-parcel-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './parcel-list.html',
  styleUrl: './parcel-list.scss',
})
export class ParcelList implements OnInit {
  private parcels: ParcelModel[] = [];
  private statusOptions: string[] = Object.values(ParcelStatus);
  private copyTimeout: ReturnType<typeof setTimeout> | null = null;

  copiedParcelId: number | null = null;
  showConfirmDialog: boolean = false;
  parcelIdToDelete: number | null = null;
  sortColumn: keyof ParcelModel | null = null;
  sortDirection: SortDirection = 'asc';
  searchTerm = '';
  feedbackMessage: string | null = null;

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.loadParcels();

    const message = this.parcelService.consumeSuccessMessage();
    if (message) {
      this.showFeedback(message);
    }
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
          this.parcels = this.parcels.filter((p) => p.id !== id);
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  openConfirmDialog(id: number) {
    this.parcelIdToDelete = id;
    this.showConfirmDialog = true;
  }

  handleConfirm(result: boolean) {
    this.showConfirmDialog = false;

    if (result && this.parcelIdToDelete !== null) {
      this.parcelService.deleteParcel(this.parcelIdToDelete).subscribe({
        next: () => {
          this.parcels = this.parcels.filter(
            (p) => p.id !== this.parcelIdToDelete
          );
          this.parcelIdToDelete = null;
          this.showFeedback('Parcel deleted successfully.');
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  public editParcel(parcelId: number) {
    window.location.href = `/update/${parcelId}`;
  }

  onStatusChange(parcel: ParcelModel, newStatus: string) {
    this.parcelService.updateParcelStatus(parcel.id, newStatus).subscribe({
      next: () => {
        (parcel.status = newStatus),
          this.showFeedback('Parcel status updated successfully.');
      },
      error: (err) => console.error('Failed to update status', err),
    });
  }

  public GetParcels(): ParcelModel[] {
    return this.parcels;
  }
  public GetStatusOptions(): string[] {
    return this.statusOptions;
  }

  copyTrackingNumber(parcel: ParcelModel) {
    navigator.clipboard.writeText(parcel.trackingNumber).then(() => {
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }

      this.copiedParcelId = parcel.id;

      this.copyTimeout = setTimeout(() => {
        this.copiedParcelId = null;
        this.copyTimeout = null;
      }, 2000);
    });
  }

  onSort(column: keyof ParcelModel) {
    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortColumn = null;
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get sortedParcels(): ParcelModel[] {
    if (!this.sortColumn) return this.parcels;
    return sortByColumn(
      this.parcels,
      this.sortColumn,
      this.sortDirection,
      this.sortColumn === 'deliveryAddress'
    );
  }

  get filteredParcels(): ParcelModel[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.sortedParcels;
    }
    return this.sortedParcels.filter(
      (parcel) =>
        parcel.trackingNumber?.toLowerCase().includes(term) ||
        parcel.name?.toLowerCase().includes(term) ||
        parcel.recipient?.toLowerCase().includes(term) ||
        parcel.deliveryAddress?.toLowerCase().includes(term)
    );
  }

  showFeedback(message: string) {
    this.feedbackMessage = message;
    setTimeout(() => {
      this.feedbackMessage = null;
    }, 3000);
  }
}
