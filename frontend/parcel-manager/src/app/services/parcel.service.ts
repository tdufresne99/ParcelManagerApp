import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcel } from '../models/parcel.model';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private apiUrl = 'http://localhost:5100/api/Parcel';

  constructor(private http: HttpClient) {}

  getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.apiUrl);
  }

  createParcel(parcel: Omit<Parcel, 'id'>): Observable<Parcel> {
    return this.http.post<Parcel>(this.apiUrl, parcel);
  }

  updateParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.put<Parcel>(`${this.apiUrl}/${parcel.id}`, parcel);
  }

  deleteParcel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
