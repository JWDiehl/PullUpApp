import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBasketballCourt } from 'app/entities/basketball-court/basketball-court.model';
import { BasketballCourtService } from 'app/entities/basketball-court/service/basketball-court.service';
import { IUserProfile } from '../user-profile.model';
import { UserProfileService } from '../service/user-profile.service';
import { UserProfileFormService, UserProfileFormGroup } from './user-profile-form.service';

@Component({
  standalone: true,
  selector: 'jhi-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class UserProfileUpdateComponent implements OnInit {
  isSaving = false;
  userProfile: IUserProfile | null = null;

  basketballCourtsSharedCollection: IBasketballCourt[] = [];

  protected userProfileService = inject(UserProfileService);
  protected userProfileFormService = inject(UserProfileFormService);
  protected basketballCourtService = inject(BasketballCourtService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: UserProfileFormGroup = this.userProfileFormService.createUserProfileFormGroup();

  compareBasketballCourt = (o1: IBasketballCourt | null, o2: IBasketballCourt | null): boolean =>
    this.basketballCourtService.compareBasketballCourt(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userProfile }) => {
      this.userProfile = userProfile;
      if (userProfile) {
        this.updateForm(userProfile);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userProfile = this.userProfileFormService.getUserProfile(this.editForm);
    if (userProfile.id !== null) {
      this.subscribeToSaveResponse(this.userProfileService.update(userProfile));
    } else {
      this.subscribeToSaveResponse(this.userProfileService.create(userProfile));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>): void {
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

  protected updateForm(userProfile: IUserProfile): void {
    this.userProfile = userProfile;
    this.userProfileFormService.resetForm(this.editForm, userProfile);

    this.basketballCourtsSharedCollection = this.basketballCourtService.addBasketballCourtToCollectionIfMissing<IBasketballCourt>(
      this.basketballCourtsSharedCollection,
      ...(userProfile.savedCourts ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.basketballCourtService
      .query()
      .pipe(map((res: HttpResponse<IBasketballCourt[]>) => res.body ?? []))
      .pipe(
        map((basketballCourts: IBasketballCourt[]) =>
          this.basketballCourtService.addBasketballCourtToCollectionIfMissing<IBasketballCourt>(
            basketballCourts,
            ...(this.userProfile?.savedCourts ?? []),
          ),
        ),
      )
      .subscribe((basketballCourts: IBasketballCourt[]) => (this.basketballCourtsSharedCollection = basketballCourts));
  }
}
