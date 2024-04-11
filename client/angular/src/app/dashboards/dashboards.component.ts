import { Component, ElementRef, Renderer2, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardNames } from '../models/dashboardNames';
import { RevealServerService } from '../services/reveal-server.service';
import { ThumbnailDialogComponent } from '../thumbnail-dialog/thumbnail-dialog.component';
import { DialogComponent } from '@revealbi/ui-angular';

declare let $: any;

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, OnDestroy {

  @ViewChild('revealView') revealDashBoard!: ElementRef;
  @ViewChild('thumbnails', { static: true }) thumbnailsContainer!: ElementRef;
  @ViewChild("cancelDialog") cancelDialog!: DialogComponent;
  @ViewChild("linkDialog") linkDialog!: ThumbnailDialogComponent;

  showAddDashboardButton: boolean = true;
  availableDashboards: any[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  public dashboardFileName?: string;
  public dashboardNames: DashboardNames[] = [];
  public revealDashBoard1: any;
  private prevSelected: any;
  isGroup7Visible: boolean = true;

  toggleGroup7Visibility(): void {
    this.isGroup7Visible = !this.isGroup7Visible;
    const button = document.querySelector('.toggle-group7-btn');
    button?.setAttribute('data-content', this.isGroup7Visible ? '>' : '<');
    window.dispatchEvent(new Event('resize'));
  }

  constructor(
    private revealServerService: RevealServerService,
  ) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.revealServerService.getDashboardsList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
      this.dashboardNames = data;
        if (this.dashboardNames.length > 0) {
          this.listItemClick(this.dashboardNames[0]);
        }
      },
      error: (_err: any) => this.dashboardNames = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public listItemClick(item: DashboardNames) {
    if (this.prevSelected) {
      this.prevSelected.selected = false;
    }
    item.selected = true;
    this.prevSelected = item;
    console.log(item);

    $.ig.RVDashboard.loadDashboard(item.dashboardFileName, (dashboard: any) => {
      const _revealDashboard = new $.ig.RevealView(this.revealDashBoard.nativeElement);
      _revealDashboard.dashboard = dashboard;
      _revealDashboard.interactiveFilteringEnabled = true;

      _revealDashboard.onDashboardSelectorRequested = (args: { callback: any; }) => {
        this.openDialog(args.callback);
      }

      _revealDashboard.onLinkedDashboardProviderAsync = (dashboardId: any, title: any) => {
        return $.ig.RVDashboard.loadDashboard(dashboardId);
      };

      _revealDashboard.onSave = (rv: any, args: any) => {
        console.log("Saved from Edit");
        args.saveFinished();
        this.loadDashboardData(); 
      };

      _revealDashboard.onMenuOpening = (visualization: any, args: { menuItems: any[]; }) => {
          const customButton1 = new $.ig.RVMenuItem("Custom Btn1", new $.ig.RVImage("https://users.infragistics.com/Reveal/Images/mail-png.png", "Icon"), () => {
            alert('Custom Button 1 Clicked');
          });
      
          const customButton2 = new $.ig.RVMenuItem("Custom Btn2", new $.ig.RVImage("https://users.infragistics.com/Reveal/Images/fav-png.png", "Icon"), () => {
            alert('Custom Button 2 Clicked');
          });
          args.menuItems.push(customButton1, customButton2);
      };
    });
  }

  openDialog(callback: (id: any) => void): void {
    this.revealServerService.getDashboardsList().subscribe({
      next: (data) => {
        this.availableDashboards = data;
        this.linkDialog.dialog.show().then((result:any) => {          
          if (typeof result !== "string") {
            callback(result.dashboardFileName);
          }
        });
      },
      error: (error) => {
        console.error('Failed to load dashboards', error);
      }
    });
  }

  async onCancel() {
    const result = await this.cancelDialog.show();
    if (result === "confirm") {
      if (this.dashboardNames.length > 0) {
        this.listItemClick(this.dashboardNames[0]);
      }
      this.showAddDashboardButton = true;
    }
  }

  public onAddDashboard() {
    this.showAddDashboardButton = false;
    this.startAddingDashboard();
  }

  private startAddingDashboard() {
    var revealView = new $.ig.RevealView(this.revealDashBoard.nativeElement);
    revealView.startInEditMode = true;
    revealView.interactiveFilteringEnabled = true

    revealView.onDataSourcesRequested = (callback: (arg0: any) => void) => {
      
      var lDsi = new $.ig.RVLocalFileDataSourceItem();
      lDsi.id = "Northwind Traders Corp Sales";
      var excelDsi = new $.ig.RVExcelDataSourceItem(lDsi);
      excelDsi.title = "Northwind Traders Corp Data";  

      var lDsi1 = new $.ig.RVLocalFileDataSourceItem();
      lDsi1.id = "NorthwindInvoices";
      var excelDsi1 = new $.ig.RVExcelDataSourceItem(lDsi1);
      excelDsi1.title = "Northwind Invoices";  

      callback(new $.ig.RevealDataSources([],
          [excelDsi, excelDsi1], false));
    };

    revealView.onDashboardSelectorRequested = (args: { callback: any; }) => {
      this.openDialog(args.callback);
    }

    revealView.onLinkedDashboardProviderAsync = (dashboardId: any, title: any) => {
      return $.ig.RVDashboard.loadDashboard(dashboardId);
    };

    revealView.onSave = (rv: any, args: any) => {
      args.saveFinished();
      this.showAddDashboardButton = true;
      this.loadDashboardData(); 
    };
  }
}