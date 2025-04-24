import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseHelper } from '../response/api-response.helper';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, typeof ApiResponseHelper>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<typeof ApiResponseHelper> {
    return next.handle().pipe(
      map((data) => {
        // If the response is already in our format, return it as is
        if (data && data.statusCode && data.message) {
          return data;
        }
        // Otherwise wrap it in our success response format
        return ApiResponseHelper.success(data);
      }),
    );
  }
}
