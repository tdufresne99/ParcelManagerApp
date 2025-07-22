import { Routes } from '@angular/router';
import { ParcelList } from './components/parcel-list/parcel-list';
import { ParcelForm } from './components/parcel-form/parcel-form';

export const routes: Routes = [
  { path: '', component: ParcelList },
  { path: 'add', component: ParcelForm }
];
