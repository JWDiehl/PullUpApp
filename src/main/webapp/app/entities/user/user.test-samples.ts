import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 16432,
  login: 'w~9@f7z8c',
};

export const sampleWithPartialData: IUser = {
  id: 9309,
  login: 'Y@b8\\,uT\\{jKAOp',
};

export const sampleWithFullData: IUser = {
  id: 14161,
  login: 'cF-',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
