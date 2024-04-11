import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardNames } from '../models/dashboardNames'
import { DialogComponent } from '@revealbi/ui-angular';

@Component({
  selector: 'app-thumbnail-dialog',
  templateUrl: './thumbnail-dialog.component.html',
  styleUrls: ['./thumbnail-dialog.component.scss']
})
export class ThumbnailDialogComponent implements OnInit {
  @ViewChild("dialog") dialog!: DialogComponent;
  @Input() dashboards: DashboardNames[] = [];  

  ngOnInit(): void {}

  selectDashboard(dashboard: DashboardNames): void {
    this.dialog.close(dashboard);
  }
}