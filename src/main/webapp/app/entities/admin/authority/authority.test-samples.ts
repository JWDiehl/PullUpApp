import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'b9576eab-ccc5-4d2a-aa18-2b22a0ad3582',
};

export const sampleWithPartialData: IAuthority = {
  name: '9acc1c10-c425-45da-abca-97e694c8fd5c',
};

export const sampleWithFullData: IAuthority = {
  name: '0146cd45-58b1-4998-ab3e-40abb4ff23c6',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
