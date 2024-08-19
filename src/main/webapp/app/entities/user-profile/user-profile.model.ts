import { IBasketballCourt } from 'app/entities/basketball-court/basketball-court.model';

export interface IUserProfile {
  id: number;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  savedCourts?: IBasketballCourt[] | null;
}

export type NewUserProfile = Omit<IUserProfile, 'id'> & { id: null };
