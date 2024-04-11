import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardNames } from '../models/dashboardNames';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = `${environment.BASE_URL}`;

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
}
