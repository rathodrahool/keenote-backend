export interface ISoftDelete {
  softDelete(): Promise<any>;
  restore(): Promise<any>;
  deleted?: boolean;
  deleted_at?: Date;
}
