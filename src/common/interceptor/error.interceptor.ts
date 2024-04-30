import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiError, ServiceError } from '../../core/utils/error.manager';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof ApiError) {
          return throwError(
            () =>
              new ApiError(error.status, error.message, 0, error.isOperational),
          );
        } else if (error instanceof ServiceError) {
          console.error(error);
          return throwError(
            () =>
              new ServiceError(error.status, error.message, error.statusCode),
          );
        } else {
          return throwError(() => new Error('Internal server error'));
        }
      }),
    );
  }
}
