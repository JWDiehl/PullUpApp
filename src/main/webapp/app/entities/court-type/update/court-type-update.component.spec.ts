import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CourtTypeService } from '../service/court-type.service';
import { ICourtType } from '../court-type.model';
import { CourtTypeFormService } from './court-type-form.service';

import { CourtTypeUpdateComponent } from './court-type-update.component';

describe('CourtType Management Update Component', () => {
  let comp: CourtTypeUpdateComponent;
  let fixture: ComponentFixture<CourtTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courtTypeFormService: CourtTypeFormService;
  let courtTypeService: CourtTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourtTypeUpdateComponent],
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
      .overrideTemplate(CourtTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourtTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courtTypeFormService = TestBed.inject(CourtTypeFormService);
    courtTypeService = TestBed.inject(CourtTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const courtType: ICourtType = { id: 456 };

      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      expect(comp.courtType).toEqual(courtType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeFormService, 'getCourtType').mockReturnValue(courtType);
      jest.spyOn(courtTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courtType }));
      saveSubject.complete();

      // THEN
      expect(courtTypeFormService.getCourtType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courtTypeService.update).toHaveBeenCalledWith(expect.objectContaining(courtType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeFormService, 'getCourtType').mockReturnValue({ id: null });
      jest.spyOn(courtTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courtType }));
      saveSubject.complete();

      // THEN
      expect(courtTypeFormService.getCourtType).toHaveBeenCalled();
      expect(courtTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourtType>>();
      const courtType = { id: 123 };
      jest.spyOn(courtTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courtType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courtTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
