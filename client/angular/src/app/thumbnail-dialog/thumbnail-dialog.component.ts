import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardItem } from '../models/visualization-chart-info';
import { DialogComponent } from '@revealbi/ui-angular';

@Component({
  selector: 'app-thumbnail-dialog',
  templateUrl: './thumbnail-dialog.component.html',
  styleUrls: ['./thumbnail-dialog.component.scss']
})
export class ThumbnailDialogComponent implements OnInit {
  @ViewChild("dialog") dialog!: DialogComponent;
  @Input() dashboards: DashboardItem[] = [];  

  ngOnInit(): void {
    
  }

  selectDashboard(dashboard: DashboardItem): void {
    this.dialog.close(dashboard);
  }
}
