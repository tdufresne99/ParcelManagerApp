import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParcelService } from '../../services/parcel.service';
import {
  ParcelDtoModel,
  ParcelModel,
  ParcelStatus,
} from '../../models/parcel.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parcel-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parcel-form.html',
  styleUrl: './parcel-form.scss',
})
export class ParcelForm implements OnInit {
  parcelId?: string;
  parcel: ParcelDtoModel = {
    name: '',
    weight: '',
    status: ParcelStatus.Pending,
    recipient: '',
    deliveryAddress: '',
    deliveryDate: ''
  };

  constructor(
    private parcelService: ParcelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  jsonImportError: string | null = null;

  ngOnInit(): void {
    this.parcelId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.parcelId) {
      // Fetch parcel data to edit
      this.parcelService.getParcelById(this.parcelId).subscribe({
        next: (existingParcel: ParcelModel) => {
          // Fill form with existing data
          this.parcel = {
            name: existingParcel.name,
            weight: existingParcel.weight,
            status: existingParcel.status,
            recipient: existingParcel.recipient,
            deliveryAddress: existingParcel.deliveryAddress,
            deliveryDate: existingParcel.deliveryDate,
          };
        },
        error: (err) => {
          // Optionally, you could redirect or show an error message
          console.error('Failed to load parcel', err);
          this.router.navigate(['/'], {
            queryParams: { error: 'Failed to load parcel' },
          });
        },
      });
    }
  }

  onSubmit() {
    if (this.parcelId) {
      // Update
      this.parcelService.updateParcel(this.parcelId, this.parcel).subscribe({
        next: () => {
          console.log('Parcel updated!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Failed to update parcel', err),
      });
    } else {
      // Create
      this.parcelService.createParcel(this.parcel).subscribe({
        next: () => {
          console.log('Parcel created!');
          this.router.navigate(['/']).then(() => {
            this.parcelService.setSuccessMessage('Parcel created successfully!');
          });
        },
        error: (err) => console.error('Failed to create parcel', err),
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);

        this.jsonImportError = null;

        this.parcelService.importParcels(json).subscribe({
          next: () => {
            console.log('Import successful');
            this.router.navigate(['/']).then(() => {
              this.parcelService.setSuccessMessage(
                'Parcels imported successfully!'
              );
            });
          },
          error: (err) => {
            this.jsonImportError = 'Server error.';
            console.error(err);
          },
        });
      } catch (err) {
        this.jsonImportError = 'Invalid JSON file.';
        console.error('JSON parsing error:', err);
      }
    };
    reader.readAsText(file);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
