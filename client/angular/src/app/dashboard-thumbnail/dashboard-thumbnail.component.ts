import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { DashboardCacheService } from '../services/dashboard-cache.service'

declare let $: any;

@Component({
  selector: 'app-dashboard-thumbnail',
  templateUrl: './dashboard-thumbnail.component.html',
  styleUrls: ['./dashboard-thumbnail.component.scss']
})
export class DashboardThumbnailComponent implements AfterViewInit {
  @ViewChild('thumbnail') thumbnail: any;
  @Input("dashboardId") dashboardId: string = "";

  constructor(private http: HttpClient, private cacheService: DashboardCacheService) { }

  ngAfterViewInit(): void {
    this.loadDashboardThumbnail();
  }

  loadDashboardThumbnail(forceRefresh: boolean = false): void {
    this.cacheService.getDashboardThumbnail(this.dashboardId, forceRefresh).subscribe((data: any) => {
      let thumbnailView = new $.ig.RevealDashboardThumbnailView(this.thumbnail.nativeElement);
      thumbnailView.dashboardInfo = data.info;
    });
  }

  forceRefresh(): void {
    this.loadDashboardThumbnail(true);
  }
}