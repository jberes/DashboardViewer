import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IgxIconModule, IgxListModule, IgxButtonModule, IgxRippleModule, IgxToggleModule, IgxSelectModule, IgxInputGroupModule, IgxComboModule, IgxDropDownModule, IgxCardModule, IgxDialogModule, IgxSimpleComboModule, IgxCheckboxModule, IgxGridModule, IgxAvatarModule, IgxTabsModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RevealUIModule } from '@revealbi/ui-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DashboardThumbnailComponent } from './dashboard-thumbnail/dashboard-thumbnail.component';
import { ThumbnailDialogComponent } from './thumbnail-dialog/thumbnail-dialog.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardsComponent,
    DashboardThumbnailComponent,
    ThumbnailDialogComponent,
  ],

  imports: [
    MatDialogModule,
    MatButtonModule,
    RevealUIModule,
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxIconModule,
    IgxListModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxTabsModule,
    FormsModule,
    IgxToggleModule,
    IgxSelectModule,
    IgxInputGroupModule,
    IgxComboModule,
    IgxDropDownModule,
    IgxCardModule,
    IgxDialogModule,
    IgxSimpleComboModule,
    IgxCheckboxModule,
    IgxGridModule,
    IgxAvatarModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRevealSdk,
      multi: true,
    },
    // {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

declare let $: any; 
export function initializeRevealSdk() {
  return () => {
    console.log('initializeRevealSdk');
    $.ig.RevealSdkSettings.setBaseUrl(`${environment.BASE_URL}`);
    const style = window.getComputedStyle(document.body);
    const theme = new $.ig.RevealTheme();
    theme.regularFont = "Roboto Condensed"; //style.getPropertyValue('--ig-font-family').replace(/\s/g, '+') ?? 'sans-serif';
    theme.mediumFont = theme.regularFont;
    theme.boldFont = theme.regularFont;
    // theme.accentColor = '#FFC72C'; 
    // theme.accentColor = '#175f8f'; 
    theme.accentColor = '#CE1141'; 
    theme.chartColors = [
      "#CE1141", 
      "#9ED7CC",
      "#7F7F7F", 
      "#D1B490", 
      "#EAD6BE", 
      "#A6A6A6", 
      "#EB6486", 
      "#35BEA3", 
      "#9ED7CC",
      "#363636" 
    ];
    theme.fontColor = style.getPropertyValue('--ig-surface-500-contrast');
    theme.isDark = theme.fontColor !== 'black';
    theme.dashboardBackgroundColor = `hsl(${style.getPropertyValue('--ig-gray-100')})`;
    theme.visualizationBackgroundColor = `hsl(${style.getPropertyValue('--ig-surface-500')})`;
    theme.useRoundedCorners = false;
    $.ig.RevealSdkSettings.theme = theme;
    $.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true;  
  };
}