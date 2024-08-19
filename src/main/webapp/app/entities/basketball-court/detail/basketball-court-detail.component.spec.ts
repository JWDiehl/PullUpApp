import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { BasketballCourtDetailComponent } from './basketball-court-detail.component';

describe('BasketballCourt Management Detail Component', () => {
  let comp: BasketballCourtDetailComponent;
  let fixture: ComponentFixture<BasketballCourtDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketballCourtDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BasketballCourtDetailComponent,
              resolve: { basketballCourt: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(BasketballCourtDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballCourtDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load basketballCourt on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BasketballCourtDetailComponent);

      // THEN
      expect(instance.basketballCourt()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
