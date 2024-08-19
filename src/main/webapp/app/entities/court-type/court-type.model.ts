export interface ICourtType {
  id: number;
  typeName?: string | null;
  ballCourtID?: number | null;
}

export type NewCourtType = Omit<ICourtType, 'id'> & { id: null };
