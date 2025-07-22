import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcelModel } from '../models/parcel.model';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  private apiUrl = 'http://localhost:5100/api/Parcel';

  constructor(private http: HttpClient) {}

  getParcels(): Observable<ParcelModel[]> {
    return this.http.get<ParcelModel[]>(this.apiUrl);
  }

  createParcel(parcel: Omit<ParcelModel, 'id'>): Observable<ParcelModel> {
    return this.http.post<ParcelModel>(this.apiUrl, parcel);
  }

  updateParcelStatus(parcelId: number, newStatus: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/status/${parcelId}`, {
      status: newStatus,
    });
  }

  deleteParcel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
