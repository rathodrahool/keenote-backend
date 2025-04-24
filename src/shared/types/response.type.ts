export interface IApiResponse<T> {
  status: number;
  message: string;
  data?: T | [];
  error?: string;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginatedResponse<T> extends IApiResponse<T> {
  meta: IPaginationMeta;
}

export interface IFindAllQuery extends IPaginationMeta {
  search?: string;
  order: { [key: string]: 'asc' | 'desc' | 1 | -1 };
}
