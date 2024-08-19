import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBasketballCourt, NewBasketballCourt } from '../basketball-court.model';

export type PartialUpdateBasketballCourt = Partial<IBasketballCourt> & Pick<IBasketballCourt, 'id'>;

export type EntityResponseType = HttpResponse<IBasketballCourt>;
export type EntityArrayResponseType = HttpResponse<IBasketballCourt[]>;

@Injectable({ providedIn: 'root' })
export class BasketballCourtService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/basketball-courts');

  create(basketballCourt: NewBasketballCourt): Observable<EntityResponseType> {
    return this.http.post<IBasketballCourt>(this.resourceUrl, basketballCourt, { observe: 'response' });
  }

  update(basketballCourt: IBasketballCourt): Observable<EntityResponseType> {
    return this.http.put<IBasketballCourt>(`${this.resourceUrl}/${this.getBasketballCourtIdentifier(basketballCourt)}`, basketballCourt, {
      observe: 'response',
    });
  }

  partialUpdate(basketballCourt: PartialUpdateBasketballCourt): Observable<EntityResponseType> {
    return this.http.patch<IBasketballCourt>(`${this.resourceUrl}/${this.getBasketballCourtIdentifier(basketballCourt)}`, basketballCourt, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBasketballCourt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBasketballCourt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBasketballCourtIdentifier(basketballCourt: Pick<IBasketballCourt, 'id'>): number {
    return basketballCourt.id;
  }

  compareBasketballCourt(o1: Pick<IBasketballCourt, 'id'> | null, o2: Pick<IBasketballCourt, 'id'> | null): boolean {
    return o1 && o2 ? this.getBasketballCourtIdentifier(o1) === this.getBasketballCourtIdentifier(o2) : o1 === o2;
  }

  addBasketballCourtToCollectionIfMissing<Type extends Pick<IBasketballCourt, 'id'>>(
    basketballCourtCollection: Type[],
    ...basketballCourtsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const basketballCourts: Type[] = basketballCourtsToCheck.filter(isPresent);
    if (basketballCourts.length > 0) {
      const basketballCourtCollectionIdentifiers = basketballCourtCollection.map(basketballCourtItem =>
        this.getBasketballCourtIdentifier(basketballCourtItem),
      );
      const basketballCourtsToAdd = basketballCourts.filter(basketballCourtItem => {
        const basketballCourtIdentifier = this.getBasketballCourtIdentifier(basketballCourtItem);
        if (basketballCourtCollectionIdentifiers.includes(basketballCourtIdentifier)) {
          return false;
        }
        basketballCourtCollectionIdentifiers.push(basketballCourtIdentifier);
        return true;
      });
      return [...basketballCourtsToAdd, ...basketballCourtCollection];
    }
    return basketballCourtCollection;
  }
}
