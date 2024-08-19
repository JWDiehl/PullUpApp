import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourtType } from 'app/entities/court-type/court-type.model';
import { CourtTypeService } from 'app/entities/court-type/service/court-type.service';
import { IUserProfile } from 'app/entities/user-profile/user-profile.model';
import { UserProfileService } from 'app/entities/user-profile/service/user-profile.service';
import { BasketballCourtService } from '../service/basketball-court.service';
import { IBasketballCourt } from '../basketball-court.model';
import { BasketballCourtFormService, BasketballCourtFormGroup } from './basketball-court-form.service';

@Component({
  standalone: true,
  selector: 'jhi-basketball-court-update',
  templateUrl: './basketball-court-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BasketballCourtUpdateComponent implements OnInit {
  isSaving = false;
  basketballCourt: IBasketballCourt | null = null;

  courtTypesSharedCollection: ICourtType[] = [];
  userProfilesSharedCollection: IUserProfile[] = [];

  protected basketballCourtService = inject(BasketballCourtService);
  protected basketballCourtFormService = inject(BasketballCourtFormService);
  protected courtTypeService = inject(CourtTypeService);
  protected userProfileService = inject(UserProfileService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BasketballCourtFormGroup = this.basketballCourtFormService.createBasketballCourtFormGroup();

  compareCourtType = (o1: ICourtType | null, o2: ICourtType | null): boolean => this.courtTypeService.compareCourtType(o1, o2);

  compareUserProfile = (o1: IUserProfile | null, o2: IUserProfile | null): boolean => this.userProfileService.compareUserProfile(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basketballCourt }) => {
      this.basketballCourt = basketballCourt;
      if (basketballCourt) {
        this.updateForm(basketballCourt);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basketballCourt = this.basketballCourtFormService.getBasketballCourt(this.editForm);
    if (basketballCourt.id !== null) {
      this.subscribeToSaveResponse(this.basketballCourtService.update(basketballCourt));
    } else {
      this.subscribeToSaveResponse(this.basketballCourtService.create(basketballCourt));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasketballCourt>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(basketballCourt: IBasketballCourt): void {
    this.basketballCourt = basketballCourt;
    this.basketballCourtFormService.resetForm(this.editForm, basketballCourt);

    this.courtTypesSharedCollection = this.courtTypeService.addCourtTypeToCollectionIfMissing<ICourtType>(
      this.courtTypesSharedCollection,
      basketballCourt.courtType,
    );
    this.userProfilesSharedCollection = this.userProfileService.addUserProfileToCollectionIfMissing<IUserProfile>(
      this.userProfilesSharedCollection,
      ...(basketballCourt.userProfiles ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courtTypeService
      .query()
      .pipe(map((res: HttpResponse<ICourtType[]>) => res.body ?? []))
      .pipe(
        map((courtTypes: ICourtType[]) =>
          this.courtTypeService.addCourtTypeToCollectionIfMissing<ICourtType>(courtTypes, this.basketballCourt?.courtType),
        ),
      )
      .subscribe((courtTypes: ICourtType[]) => (this.courtTypesSharedCollection = courtTypes));

    this.userProfileService
      .query()
      .pipe(map((res: HttpResponse<IUserProfile[]>) => res.body ?? []))
      .pipe(
        map((userProfiles: IUserProfile[]) =>
          this.userProfileService.addUserProfileToCollectionIfMissing<IUserProfile>(
            userProfiles,
            ...(this.basketballCourt?.userProfiles ?? []),
          ),
        ),
      )
      .subscribe((userProfiles: IUserProfile[]) => (this.userProfilesSharedCollection = userProfiles));
  }
}
