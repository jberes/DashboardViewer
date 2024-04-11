import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { DashboardNames } from '../models/dashboardNames';
import { VisualizationChartInfo } from '../models/visualization-chart-info';
import { RevealSdkSettings } from '@revealbi/ui';
import { environment } from 'src/environments/environment';

RevealSdkSettings.serverUrl = `${environment.BASE_URL}`;
const API_ENDPOINT = RevealSdkSettings.serverUrl; 

@Injectable({
  providedIn: 'root'
})
export class RevealServerService {
  constructor(
    private http: HttpClient
  ) { }


  public getDashboardsList(): Observable<DashboardNames[]> {
    return this.http.get<DashboardNames[]>(`${API_ENDPOINT}/dashboards/names`);
  }
  
  // public getFileDataList(mode: string = '1'): Observable<FileData[]> {
  //   const params = new HttpParams()
  //     .append('mode', mode);
  //   const options = {
  //     params,
  //   };
  //   return this.http.get<FileData[]>(`${API_ENDPOINT}/dashboards`, options);
  // }

  private cache$: Observable<VisualizationChartInfo[]> | null = null;

  public getVisualizationChartInfoList(forceRefresh: boolean = false): Observable<VisualizationChartInfo[]> {
    if (!this.cache$ || forceRefresh) {
      this.cache$ = this.http.get<VisualizationChartInfo[]>(`${API_ENDPOINT}/dashboards/visualizations/all`).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error fetching visualization chart info list', error);
          this.cache$ = null; 
          return of([]); 
        })
      );
    }
    return this.cache$;
  }

  public clearCache(): void {
    this.cache$ = null;
  }
}
