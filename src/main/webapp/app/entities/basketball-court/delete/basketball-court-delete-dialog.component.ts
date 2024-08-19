import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBasketballCourt } from '../basketball-court.model';
import { BasketballCourtService } from '../service/basketball-court.service';

@Component({
  standalone: true,
  templateUrl: './basketball-court-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BasketballCourtDeleteDialogComponent {
  basketballCourt?: IBasketballCourt;

  protected basketballCourtService = inject(BasketballCourtService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.basketballCourtService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
