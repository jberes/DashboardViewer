import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardCacheService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  getDashboardThumbnail(dashboardId: string, forceRefresh: boolean = false): Observable<any> {
    const url = `${environment.BASE_URL}/dashboards/${dashboardId}/thumbnail`;
    if (!forceRefresh && this.cache.has(dashboardId)) {
      return of(this.cache.get(dashboardId));
    }
    return this.http.get(url).pipe(      
      tap(data => this.cache.set(dashboardId, data))
    );
  }

  clearCache(dashboardId?: string): void {
    if (dashboardId) {
      this.cache.delete(dashboardId);
    } else {
      this.cache.clear();
    }
  }
}
