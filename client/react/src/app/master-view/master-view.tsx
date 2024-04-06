import { IgrAvatarModule, IgrCardMediaModule, IgrCardModule, IgrListItem, IgrListModule, IgrList } from 'igniteui-react';
import { useGetDashboardNames } from '../hooks/reveal-server-hooks';
import styles from './master-view.module.css';
import createClassTransformer from '../style-utils';
import { useState } from 'react';
import { RevealView } from "@revealbi/ui-react";
import { RevealViewOptions } from "@revealbi/ui";
import Thumbnail from '../components/Thumbnail';
import { API_ENDPOINT } from "../config.ts"

IgrAvatarModule.register();
IgrListModule.register();
IgrCardModule.register();
IgrCardMediaModule.register();

declare let $: any;
const options: RevealViewOptions = {}

export default function MasterView() {
  const classes = createClassTransformer(styles);
  const revealServerDashboardNames = useGetDashboardNames();

  const [dashboard, setDashboard] = useState('Healthcare');
  $.ig.RevealSdkSettings.setBaseUrl(API_ENDPOINT);

  const handleItemClick = (item) => {
    setDashboard(item);
    console.log(item);
  };

  return (
    <>
      <div className={classes("row-layout master-view-container")}>
        <div className={classes("column-layout group")}>        
          <IgrList key="listKey" className={classes("list")}>
            {revealServerDashboardNames.map((item) => (
              <IgrListItem key={item.id}>
                <div className={classes("dashboardItem")} onClick={() => handleItemClick(item.dashboardFileName)}>
                    <Thumbnail dashboardFileName={item.dashboardFileName} style={{ width: '100px', height: '75px' }} />
                    <div className={classes("dashboardItemText")}>
                        <div slot="title">
                            {item.dashboardTitle.length > 15 ? `${item.dashboardTitle.substring(0, 25)}...` : item.dashboardTitle}
                        </div>
                    </div>
                </div>
            </IgrListItem>
            ))}
          </IgrList>
        </div>
        <div className={classes("column-layout group_1")}>
          <RevealView options={options} dashboard={dashboard} />
        </div>
      </div>
    </>
  );
}
