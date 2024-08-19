import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../basketball-court.test-samples';

import { BasketballCourtFormService } from './basketball-court-form.service';

describe('BasketballCourt Form Service', () => {
  let service: BasketballCourtFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketballCourtFormService);
  });

  describe('Service methods', () => {
    describe('createBasketballCourtFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBasketballCourtFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courtName: expect.any(Object),
            state: expect.any(Object),
            zipCode: expect.any(Object),
            streetAddress: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            courtType: expect.any(Object),
            userProfiles: expect.any(Object),
          }),
        );
      });

      it('passing IBasketballCourt should create a new form with FormGroup', () => {
        const formGroup = service.createBasketballCourtFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            courtName: expect.any(Object),
            state: expect.any(Object),
            zipCode: expect.any(Object),
            streetAddress: expect.any(Object),
            longitude: expect.any(Object),
            latitude: expect.any(Object),
            courtType: expect.any(Object),
            userProfiles: expect.any(Object),
          }),
        );
      });
    });

    describe('getBasketballCourt', () => {
      it('should return NewBasketballCourt for default BasketballCourt initial value', () => {
        const formGroup = service.createBasketballCourtFormGroup(sampleWithNewData);

        const basketballCourt = service.getBasketballCourt(formGroup) as any;

        expect(basketballCourt).toMatchObject(sampleWithNewData);
      });

      it('should return NewBasketballCourt for empty BasketballCourt initial value', () => {
        const formGroup = service.createBasketballCourtFormGroup();

        const basketballCourt = service.getBasketballCourt(formGroup) as any;

        expect(basketballCourt).toMatchObject({});
      });

      it('should return IBasketballCourt', () => {
        const formGroup = service.createBasketballCourtFormGroup(sampleWithRequiredData);

        const basketballCourt = service.getBasketballCourt(formGroup) as any;

        expect(basketballCourt).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBasketballCourt should not enable id FormControl', () => {
        const formGroup = service.createBasketballCourtFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBasketballCourt should disable id FormControl', () => {
        const formGroup = service.createBasketballCourtFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
