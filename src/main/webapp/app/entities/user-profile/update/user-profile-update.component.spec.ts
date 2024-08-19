import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IBasketballCourt } from 'app/entities/basketball-court/basketball-court.model';
import { BasketballCourtService } from 'app/entities/basketball-court/service/basketball-court.service';
import { UserProfileService } from '../service/user-profile.service';
import { IUserProfile } from '../user-profile.model';
import { UserProfileFormService } from './user-profile-form.service';

import { UserProfileUpdateComponent } from './user-profile-update.component';

describe('UserProfile Management Update Component', () => {
  let comp: UserProfileUpdateComponent;
  let fixture: ComponentFixture<UserProfileUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userProfileFormService: UserProfileFormService;
  let userProfileService: UserProfileService;
  let basketballCourtService: BasketballCourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileUpdateComponent],
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
      .overrideTemplate(UserProfileUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserProfileUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userProfileFormService = TestBed.inject(UserProfileFormService);
    userProfileService = TestBed.inject(UserProfileService);
    basketballCourtService = TestBed.inject(BasketballCourtService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call BasketballCourt query and add missing value', () => {
      const userProfile: IUserProfile = { id: 456 };
      const savedCourts: IBasketballCourt[] = [{ id: 13449 }];
      userProfile.savedCourts = savedCourts;

      const basketballCourtCollection: IBasketballCourt[] = [{ id: 5276 }];
      jest.spyOn(basketballCourtService, 'query').mockReturnValue(of(new HttpResponse({ body: basketballCourtCollection })));
      const additionalBasketballCourts = [...savedCourts];
      const expectedCollection: IBasketballCourt[] = [...additionalBasketballCourts, ...basketballCourtCollection];
      jest.spyOn(basketballCourtService, 'addBasketballCourtToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userProfile });
      comp.ngOnInit();

      expect(basketballCourtService.query).toHaveBeenCalled();
      expect(basketballCourtService.addBasketballCourtToCollectionIfMissing).toHaveBeenCalledWith(
        basketballCourtCollection,
        ...additionalBasketballCourts.map(expect.objectContaining),
      );
      expect(comp.basketballCourtsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userProfile: IUserProfile = { id: 456 };
      const savedCourts: IBasketballCourt = { id: 146 };
      userProfile.savedCourts = [savedCourts];

      activatedRoute.data = of({ userProfile });
      comp.ngOnInit();

      expect(comp.basketballCourtsSharedCollection).toContain(savedCourts);
      expect(comp.userProfile).toEqual(userProfile);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserProfile>>();
      const userProfile = { id: 123 };
      jest.spyOn(userProfileFormService, 'getUserProfile').mockReturnValue(userProfile);
      jest.spyOn(userProfileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userProfile });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userProfile }));
      saveSubject.complete();

      // THEN
      expect(userProfileFormService.getUserProfile).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userProfileService.update).toHaveBeenCalledWith(expect.objectContaining(userProfile));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserProfile>>();
      const userProfile = { id: 123 };
      jest.spyOn(userProfileFormService, 'getUserProfile').mockReturnValue({ id: null });
      jest.spyOn(userProfileService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userProfile: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userProfile }));
      saveSubject.complete();

      // THEN
      expect(userProfileFormService.getUserProfile).toHaveBeenCalled();
      expect(userProfileService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserProfile>>();
      const userProfile = { id: 123 };
      jest.spyOn(userProfileService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userProfile });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userProfileService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBasketballCourt', () => {
      it('Should forward to basketballCourtService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(basketballCourtService, 'compareBasketballCourt');
        comp.compareBasketballCourt(entity, entity2);
        expect(basketballCourtService.compareBasketballCourt).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
