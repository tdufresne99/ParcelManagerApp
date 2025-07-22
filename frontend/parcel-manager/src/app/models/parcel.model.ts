
export interface ParcelModel {
  id: number;
  name: string;
  weight: string;
  status: string;
  deliveryAddress: string;
}

export type CreateParcelDtoModel = Omit<ParcelModel, 'id'>;

export enum ParcelStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  InTransit = 'In Transit',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}
