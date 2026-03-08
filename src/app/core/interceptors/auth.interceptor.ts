import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const session = authService.currentSessionValue;

    if (session?.accessToken && req.url.startsWith(environment.apiBaseUrl)) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        return next(authReq);
    }

    return next(req);
};
