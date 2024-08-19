import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IBasketballCourt } from '../basketball-court.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../basketball-court.test-samples';

import { BasketballCourtService } from './basketball-court.service';

const requireRestSample: IBasketballCourt = {
  ...sampleWithRequiredData,
};

describe('BasketballCourt Service', () => {
  let service: BasketballCourtService;
  let httpMock: HttpTestingController;
  let expectedResult: IBasketballCourt | IBasketballCourt[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BasketballCourtService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a BasketballCourt', () => {
      const basketballCourt = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(basketballCourt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BasketballCourt', () => {
      const basketballCourt = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(basketballCourt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BasketballCourt', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BasketballCourt', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BasketballCourt', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBasketballCourtToCollectionIfMissing', () => {
      it('should add a BasketballCourt to an empty array', () => {
        const basketballCourt: IBasketballCourt = sampleWithRequiredData;
        expectedResult = service.addBasketballCourtToCollectionIfMissing([], basketballCourt);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(basketballCourt);
      });

      it('should not add a BasketballCourt to an array that contains it', () => {
        const basketballCourt: IBasketballCourt = sampleWithRequiredData;
        const basketballCourtCollection: IBasketballCourt[] = [
          {
            ...basketballCourt,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBasketballCourtToCollectionIfMissing(basketballCourtCollection, basketballCourt);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BasketballCourt to an array that doesn't contain it", () => {
        const basketballCourt: IBasketballCourt = sampleWithRequiredData;
        const basketballCourtCollection: IBasketballCourt[] = [sampleWithPartialData];
        expectedResult = service.addBasketballCourtToCollectionIfMissing(basketballCourtCollection, basketballCourt);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(basketballCourt);
      });

      it('should add only unique BasketballCourt to an array', () => {
        const basketballCourtArray: IBasketballCourt[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const basketballCourtCollection: IBasketballCourt[] = [sampleWithRequiredData];
        expectedResult = service.addBasketballCourtToCollectionIfMissing(basketballCourtCollection, ...basketballCourtArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const basketballCourt: IBasketballCourt = sampleWithRequiredData;
        const basketballCourt2: IBasketballCourt = sampleWithPartialData;
        expectedResult = service.addBasketballCourtToCollectionIfMissing([], basketballCourt, basketballCourt2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(basketballCourt);
        expect(expectedResult).toContain(basketballCourt2);
      });

      it('should accept null and undefined values', () => {
        const basketballCourt: IBasketballCourt = sampleWithRequiredData;
        expectedResult = service.addBasketballCourtToCollectionIfMissing([], null, basketballCourt, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(basketballCourt);
      });

      it('should return initial array if no BasketballCourt is added', () => {
        const basketballCourtCollection: IBasketballCourt[] = [sampleWithRequiredData];
        expectedResult = service.addBasketballCourtToCollectionIfMissing(basketballCourtCollection, undefined, null);
        expect(expectedResult).toEqual(basketballCourtCollection);
      });
    });

    describe('compareBasketballCourt', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBasketballCourt(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareBasketballCourt(entity1, entity2);
        const compareResult2 = service.compareBasketballCourt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareBasketballCourt(entity1, entity2);
        const compareResult2 = service.compareBasketballCourt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareBasketballCourt(entity1, entity2);
        const compareResult2 = service.compareBasketballCourt(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
