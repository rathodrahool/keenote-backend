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
    // If data is already an API response, return it as is
    if (data && typeof data === 'object' && 'status' in data && 'message' in data && 'data' in data) {
      return data as IApiResponse<T>;
    }
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
    // If data is already an API response, return it as is
    if (data && typeof data === 'object' && 'status' in data && 'message' in data && 'data' in data) {
      return data as IApiResponse<T>;
    }
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

    // If data array contains API responses, extract their data
    const cleanData = data.map(item => {
      if (item && typeof item === 'object' && 'status' in item && 'message' in item && 'data' in item) {
        return (item as unknown as IApiResponse<T>).data;
      }
      return item;
    }) as T[];

    return {
      status: 1,
      message,
      data: cleanData,
      meta,
    };
  }
}
