import { IBasketballCourt, NewBasketballCourt } from './basketball-court.model';

export const sampleWithRequiredData: IBasketballCourt = {
  id: 24303,
};

export const sampleWithPartialData: IBasketballCourt = {
  id: 19400,
  state: 'repentant ugh an',
  streetAddress: 'pish atop',
  latitude: 'knowledge',
};

export const sampleWithFullData: IBasketballCourt = {
  id: 13453,
  courtName: 'invoice',
  state: 'lovingly yuck',
  zipCode: 21656,
  streetAddress: 'perfectly general',
  longitude: 'between even indeed',
  latitude: 'although',
};

export const sampleWithNewData: NewBasketballCourt = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
