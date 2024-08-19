import { IUserProfile, NewUserProfile } from './user-profile.model';

export const sampleWithRequiredData: IUserProfile = {
  id: 22298,
};

export const sampleWithPartialData: IUserProfile = {
  id: 15790,
  username: 'so sans',
  email: 'Jovani.Hodkiewicz@yahoo.com',
  password: 'visa despite marketplace',
  longitude: 'what barricade knowledgeably',
};

export const sampleWithFullData: IUserProfile = {
  id: 23207,
  username: 'netball aspire phony',
  email: 'Mertie.Reilly34@hotmail.com',
  password: 'now',
  longitude: 'what defiant',
  latitude: 'quarrelsomely',
};

export const sampleWithNewData: NewUserProfile = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
