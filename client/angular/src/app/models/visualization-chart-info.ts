export interface VisualizationChartInfo {
  selected: any;
  dashboardFileName: string;
  dashboardTitle: string;
  vizId: string;
  vizTitle: string;
  vizChartType: string;
  vizImageUrl: string;
  vizLabels: string;
  vizValues: string;
  vizRows: string;
  vizTargets: string;
}

export interface DashboardItem {
  dashboardFileName: string;
  dashboardTitle: string;
  dateCreated: string;
  dateModified: string;
  fakeOwner: string;
  fakeOwnerImageUrl: string;
  fakeDashboardImageUrl: string;
  thumbnailInfo: any; // Use 'any' if the structure of thumbnailInfo is variable; otherwise, define a more specific type
}
