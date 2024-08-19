import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBasketballCourt, NewBasketballCourt } from '../basketball-court.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBasketballCourt for edit and NewBasketballCourtFormGroupInput for create.
 */
type BasketballCourtFormGroupInput = IBasketballCourt | PartialWithRequiredKeyOf<NewBasketballCourt>;

type BasketballCourtFormDefaults = Pick<NewBasketballCourt, 'id' | 'userProfiles'>;

type BasketballCourtFormGroupContent = {
  id: FormControl<IBasketballCourt['id'] | NewBasketballCourt['id']>;
  courtName: FormControl<IBasketballCourt['courtName']>;
  state: FormControl<IBasketballCourt['state']>;
  zipCode: FormControl<IBasketballCourt['zipCode']>;
  streetAddress: FormControl<IBasketballCourt['streetAddress']>;
  longitude: FormControl<IBasketballCourt['longitude']>;
  latitude: FormControl<IBasketballCourt['latitude']>;
  courtType: FormControl<IBasketballCourt['courtType']>;
  userProfiles: FormControl<IBasketballCourt['userProfiles']>;
};

export type BasketballCourtFormGroup = FormGroup<BasketballCourtFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BasketballCourtFormService {
  createBasketballCourtFormGroup(basketballCourt: BasketballCourtFormGroupInput = { id: null }): BasketballCourtFormGroup {
    const basketballCourtRawValue = {
      ...this.getFormDefaults(),
      ...basketballCourt,
    };
    return new FormGroup<BasketballCourtFormGroupContent>({
      id: new FormControl(
        { value: basketballCourtRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      courtName: new FormControl(basketballCourtRawValue.courtName),
      state: new FormControl(basketballCourtRawValue.state),
      zipCode: new FormControl(basketballCourtRawValue.zipCode),
      streetAddress: new FormControl(basketballCourtRawValue.streetAddress),
      longitude: new FormControl(basketballCourtRawValue.longitude),
      latitude: new FormControl(basketballCourtRawValue.latitude),
      courtType: new FormControl(basketballCourtRawValue.courtType),
      userProfiles: new FormControl(basketballCourtRawValue.userProfiles ?? []),
    });
  }

  getBasketballCourt(form: BasketballCourtFormGroup): IBasketballCourt | NewBasketballCourt {
    return form.getRawValue() as IBasketballCourt | NewBasketballCourt;
  }

  resetForm(form: BasketballCourtFormGroup, basketballCourt: BasketballCourtFormGroupInput): void {
    const basketballCourtRawValue = { ...this.getFormDefaults(), ...basketballCourt };
    form.reset(
      {
        ...basketballCourtRawValue,
        id: { value: basketballCourtRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BasketballCourtFormDefaults {
    return {
      id: null,
      userProfiles: [],
    };
  }
}
