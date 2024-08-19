import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourtType } from 'app/entities/court-type/court-type.model';
import { CourtTypeService } from 'app/entities/court-type/service/court-type.service';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';
import { UserProfileService } from 'app/entities/user-profile/service/user-profile.service';
import { IBasketballCourt } from '../basketball-court.model';
import { BasketballCourtService } from '../service/basketball-court.service';
import { BasketballCourtFormService } from './basketball-court-form.service';

import { BasketballCourtUpdateComponent } from './basketball-court-update.component';

describe('BasketballCourt Management Update Component', () => {
  let comp: BasketballCourtUpdateComponent;
  let fixture: ComponentFixture<BasketballCourtUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let basketballCourtFormService: BasketballCourtFormService;
  let basketballCourtService: BasketballCourtService;
  let courtTypeService: CourtTypeService;
  let userProfileService: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasketballCourtUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(BasketballCourtUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BasketballCourtUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    basketballCourtFormService = TestBed.inject(BasketballCourtFormService);
    basketballCourtService = TestBed.inject(BasketballCourtService);
    courtTypeService = TestBed.inject(CourtTypeService);
    userProfileService = TestBed.inject(UserProfileService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CourtType query and add missing value', () => {
      const basketballCourt: IBasketballCourt = { id: 456 };
      const courtType: ICourtType = { id: 6468 };
      basketballCourt.courtType = courtType;

      const courtTypeCollection: ICourtType[] = [{ id: 29515 }];
      jest.spyOn(courtTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: courtTypeCollection })));
      const additionalCourtTypes = [courtType];
      const expectedCollection: ICourtType[] = [...additionalCourtTypes, ...courtTypeCollection];
      jest.spyOn(courtTypeService, 'addCourtTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ basketballCourt });
      comp.ngOnInit();

      expect(courtTypeService.query).toHaveBeenCalled();
      expect(courtTypeService.addCourtTypeToCollectionIfMissing).toHaveBeenCalledWith(
        courtTypeCollection,
        ...additionalCourtTypes.map(expect.objectContaining),
      );
      expect(comp.courtTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call UserProfile query and add missing value', () => {
      const basketballCourt: IBasketballCourt = { id: 456 };
      const userProfiles: IUserProfile[] = [{ id: 28295 }];
      basketballCourt.userProfiles = userProfiles;

      const userProfileCollection: IUserProfile[] = [{ id: 25786 }];
      jest.spyOn(userProfileService, 'query').mockReturnValue(of(new HttpResponse({ body: userProfileCollection })));
      const additionalUserProfiles = [...userProfiles];
      const expectedCollection: IUserProfile[] = [...additionalUserProfiles, ...userProfileCollection];
      jest.spyOn(userProfileService, 'addUserProfileToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ basketballCourt });
      comp.ngOnInit();

      expect(userProfileService.query).toHaveBeenCalled();
      expect(userProfileService.addUserProfileToCollectionIfMissing).toHaveBeenCalledWith(
        userProfileCollection,
        ...additionalUserProfiles.map(expect.objectContaining),
      );
      expect(comp.userProfilesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const basketballCourt: IBasketballCourt = { id: 456 };
      const courtType: ICourtType = { id: 10096 };
      basketballCourt.courtType = courtType;
      const userProfiles: IUserProfile = { id: 14522 };
      basketballCourt.userProfiles = [userProfiles];

      activatedRoute.data = of({ basketballCourt });
      comp.ngOnInit();

      expect(comp.courtTypesSharedCollection).toContain(courtType);
      expect(comp.userProfilesSharedCollection).toContain(userProfiles);
      expect(comp.basketballCourt).toEqual(basketballCourt);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasketballCourt>>();
      const basketballCourt = { id: 123 };
      jest.spyOn(basketballCourtFormService, 'getBasketballCourt').mockReturnValue(basketballCourt);
      jest.spyOn(basketballCourtService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basketballCourt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: basketballCourt }));
      saveSubject.complete();

      // THEN
      expect(basketballCourtFormService.getBasketballCourt).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(basketballCourtService.update).toHaveBeenCalledWith(expect.objectContaining(basketballCourt));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasketballCourt>>();
      const basketballCourt = { id: 123 };
      jest.spyOn(basketballCourtFormService, 'getBasketballCourt').mockReturnValue({ id: null });
      jest.spyOn(basketballCourtService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basketballCourt: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: basketballCourt }));
      saveSubject.complete();

      // THEN
      expect(basketballCourtFormService.getBasketballCourt).toHaveBeenCalled();
      expect(basketballCourtService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBasketballCourt>>();
      const basketballCourt = { id: 123 };
      jest.spyOn(basketballCourtService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ basketballCourt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(basketballCourtService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourtType', () => {
      it('Should forward to courtTypeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courtTypeService, 'compareCourtType');
        comp.compareCourtType(entity, entity2);
        expect(courtTypeService.compareCourtType).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUserProfile', () => {
      it('Should forward to userProfileService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userProfileService, 'compareUserProfile');
        comp.compareUserProfile(entity, entity2);
        expect(userProfileService.compareUserProfile).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
