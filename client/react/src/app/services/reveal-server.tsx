import { DashboardNames } from '../models/reveal-server/dashboard-names';
import { API_ENDPOINT } from "../config.ts"

export async function getDashboardNames(): Promise<DashboardNames[]> {
  const response = await fetch(`${API_ENDPOINT}/dashboards/names`);
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const dashboardNames: DashboardNames[] = await response.json();
    return dashboardNames.map((dashboard, index) => ({
    ...dashboard,
    id: `dashboard-${index}` 
  }));
}

