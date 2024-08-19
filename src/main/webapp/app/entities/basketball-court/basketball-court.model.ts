import { ICourtType } from 'app/entities/court-type/court-type.model';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';

export interface IBasketballCourt {
  id: number;
  courtName?: string | null;
  state?: string | null;
  zipCode?: number | null;
  streetAddress?: string | null;
  longitude?: string | null;
  latitude?: string | null;
  courtType?: ICourtType | null;
  userProfiles?: IUserProfile[] | null;
}

export type NewBasketballCourt = Omit<IBasketballCourt, 'id'> & { id: null };
