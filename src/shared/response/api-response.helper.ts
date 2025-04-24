import {
  IApiResponse,
  IPaginatedResponse,
  IPaginationMeta,
} from '../types/response.type';

export class ApiResponseHelper {
  static success<T>(
    data: T | [],
    message: string = 'Success',
  ): IApiResponse<T> {
    return {
      status: 1,
      message,
      data,
    };
  }

  static created<T>(
    data: T,
    message: string = 'Created successfully',
  ): IApiResponse<T> {
    return {
      status: 1,
      message,
      data,
    };
  }

  static error(message: string, status: number = 0): IApiResponse<null> {
    return {
      status,
      message,
      data: [],
    };
  }

  static paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success',
  ): IPaginatedResponse<T[]> {
    const totalPages = Math.ceil(total / limit);

    const meta: IPaginationMeta = {
      total,
      page,
      limit,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };

    return {
      status: 1,
      message,
      data,
      meta,
    };
  }
}
