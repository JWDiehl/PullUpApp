import { ICourtType, NewCourtType } from './court-type.model';

export const sampleWithRequiredData: ICourtType = {
  id: 2058,
};

export const sampleWithPartialData: ICourtType = {
  id: 6943,
  typeName: 'following wherever handmade',
  ballCourtID: 20682,
};

export const sampleWithFullData: ICourtType = {
  id: 30375,
  typeName: 'irresponsible jolt',
  ballCourtID: 9212,
};

export const sampleWithNewData: NewCourtType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
