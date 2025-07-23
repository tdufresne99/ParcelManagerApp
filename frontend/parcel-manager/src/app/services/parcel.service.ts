import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcelDtoModel, ParcelModel } from '../models/parcel.model';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  private apiUrl = 'http://localhost:5100/api/Parcel';

  constructor(private http: HttpClient) {}

  private successMessage: string | null = null;

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  consumeSuccessMessage(): string | null {
    const message = this.successMessage;
    this.successMessage = null;
    return message;
  }

  getParcels(): Observable<ParcelModel[]> {
    return this.http.get<ParcelModel[]>(this.apiUrl);
  }

  getParcelById(id: string): Observable<ParcelModel> {
    return this.http.get<ParcelModel>(`${this.apiUrl}/${id}`);
  }

  createParcel(parcel: ParcelDtoModel): Observable<ParcelDtoModel> {
    return this.http.post<ParcelDtoModel>(this.apiUrl, parcel);
  }

  importParcels(parcels: ParcelDtoModel[]) {
    return this.http.post(`${this.apiUrl}/import`, parcels);
  }

  updateParcelStatus(parcelId: number, newStatus: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/status/${parcelId}`, {
      status: newStatus,
    });
  }

  updateParcel(parcelId: string, parcel: ParcelDtoModel) {
    return this.http.put<ParcelModel>(`${this.apiUrl}/${parcelId}`, parcel);
  }

  deleteParcel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
