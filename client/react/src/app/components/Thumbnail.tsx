import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { API_ENDPOINT } from "../config.ts"

declare var $: any;

export interface ThumbnailProps {
    dashboardFileName: string;
    style?: CSSProperties;
}

export default function Thumbnail({ dashboardFileName, style }: ThumbnailProps) {
    const [dashboardInfo, setDashboardInfo] = useState(null);
    const defaultStyle: CSSProperties = { height: '100%', width: '100%', position: 'relative'};
    const combinedStyle: CSSProperties = { ...defaultStyle, ...style };
    const uniqueId = useMemo(() => `rvThumb-${Math.random().toString(36).substr(2, 9)}`, []);
    const dvRef = useRef<any>(null);

    useEffect(() => {
        fetch(API_ENDPOINT + "/dashboards/" + dashboardFileName + "/thumbnail")
            .then(response => response.json())
            .then(data => {
                setDashboardInfo(data.info);
            });
    }, [dashboardFileName]);

    useEffect(() => {
        if (!dvRef.current && dashboardInfo) {
            dvRef.current = new $.ig.RevealDashboardThumbnailView(`#${uniqueId}`);
            dvRef.current.dashboardInfo = dashboardInfo;    
        }

        return () => {
            dvRef.current = null;
        }    
    }, [dashboardInfo, uniqueId]);

    if (!dashboardInfo) return null;

    return (
        <div id={uniqueId} style={combinedStyle} ></div>
    );    
}