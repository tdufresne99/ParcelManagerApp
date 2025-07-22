import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParcelService } from '../../services/parcel.service';
import { CreateParcelDtoModel } from '../../models/parcel.model';
import { Router } from '@angular/router';
import { ParcelStatus } from '../../models/parcel.model';

@Component({
  selector: 'app-parcel-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parcel-form.html',
  styleUrl: './parcel-form.scss',
})

export class ParcelForm {
  parcel: CreateParcelDtoModel = {
    name: '',
    weight: '',
    status: ParcelStatus.Pending,
    deliveryAddress: '',
  };

  constructor(private parcelService: ParcelService, private router: Router) {}

  onSubmit() {
    this.parcelService.createParcel(this.parcel).subscribe({
      next: (response) => {
        console.log('Parcel created!', response);
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Failed to create parcel', err),
    });
  }
}
