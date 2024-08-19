import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourtType } from '../court-type.model';
import { CourtTypeService } from '../service/court-type.service';
import { CourtTypeFormService, CourtTypeFormGroup } from './court-type-form.service';

@Component({
  standalone: true,
  selector: 'jhi-court-type-update',
  templateUrl: './court-type-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CourtTypeUpdateComponent implements OnInit {
  isSaving = false;
  courtType: ICourtType | null = null;

  protected courtTypeService = inject(CourtTypeService);
  protected courtTypeFormService = inject(CourtTypeFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourtTypeFormGroup = this.courtTypeFormService.createCourtTypeFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courtType }) => {
      this.courtType = courtType;
      if (courtType) {
        this.updateForm(courtType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courtType = this.courtTypeFormService.getCourtType(this.editForm);
    if (courtType.id !== null) {
      this.subscribeToSaveResponse(this.courtTypeService.update(courtType));
    } else {
      this.subscribeToSaveResponse(this.courtTypeService.create(courtType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourtType>>): void {
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

  protected updateForm(courtType: ICourtType): void {
    this.courtType = courtType;
    this.courtTypeFormService.resetForm(this.editForm, courtType);
  }
}
