
export interface ParcelModel {
  id: number;
  name: string;
  weight: string;
  status: string;
  recipient: string;
  deliveryAddress: string;
  trackingNumber: string;
}

export type ParcelDtoModel = Omit<ParcelModel, 'id' | 'trackingNumber'>;

export enum ParcelStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  InTransit = 'In Transit',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}
