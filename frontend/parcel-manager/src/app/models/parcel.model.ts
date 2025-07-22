
export interface ParcelModel {
  id: number;
  name: string;
  weight: string;
  status: string;
  deliveryAddress: string;
}

export type CreateParcelDtoModel = Omit<ParcelModel, 'id'>;
