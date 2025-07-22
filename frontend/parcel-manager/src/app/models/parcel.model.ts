export interface Parcel {
  id: number;
  name: string;
  weight: string;
  status: string;
  deliveryAddress: string;
}

export type CreateParcelDto = Omit<Parcel, 'id'>;
