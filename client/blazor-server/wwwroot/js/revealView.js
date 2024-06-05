window.loadRevealView = async function (viewId, dashboardName) {
    let rvDashboard;
    if (dashboardName) {
        rvDashboard = await $.ig.RVDashboard.loadDashboard(dashboardName);
    }

    const revealView = createRevealView(viewId, dashboardName === "Telecomm");
    console.log("dashboardName: " + dashboardName);

    if (!rvDashboard) {
        revealView.startInEditMode = true;

        revealView.onDataSourcesRequested = (callback) => {
            const restDataSource = new $.ig.RVRESTDataSource();
            restDataSource.id = "RestDataSource";
            restDataSource.url = "https://excel2json.io/api/share/8bf0acfa-7fd8-468e-0478-08daa4a8d995";
            restDataSource.title = "Auto Users Data - Global";
            restDataSource.subtitle = "from Excel2Json";
            restDataSource.useAnonymousAuthentication = true;
            callback(new $.ig.RevealDataSources([restDataSource], [], false));
        };
    }

    revealView.onDashboardSelectorRequested = (args) => {
        openDialog(args.callback);
    };

    revealView.onLinkedDashboardProviderAsync = (dashboardId, title) => {
        return $.ig.RVDashboard.loadDashboard(dashboardId);
    };

    revealView.dashboard = rvDashboard;
}

window.createRevealView = function (viewId, singleVisualizationMode) {
    $.ig.RevealSdkSettings.theme = createRevealTheme(viewId, singleVisualizationMode);

    const revealView = new $.ig.RevealView("#" + viewId);

    if (singleVisualizationMode) {
        revealView.singleVisualizationMode = true;
        revealView.showHeader = false;
        revealView.showMenu = false;
    }

    return revealView;
}

window.createRevealTheme = function (viewId, singleVisualizationMode) {
    var theme = $.ig.RevealSdkSettings.theme.clone();
    theme.chartColors = ["#09B1A9", "#003B4A", "#93C569", "#FEB51E", "#FF780D", "#CA365B"];
    theme.regularFont = "Inter";
    theme.mediumFont = "Inter";
    theme.boldFont = "Inter";
    theme.useRoundedCorners = false;
    theme.accentColor = "#09B1A9";

    if (singleVisualizationMode) {
        theme.dashboardBackgroundColor = "white";
    }
    if (viewId === "revealViewNew") {
        theme.dashboardBackgroundColor = "white";
    }
    else {
        theme.dashboardBackgroundColor = "#F5F5F5";
    }
    return theme;
}

window.createDashboardThumbnail = function (id, info) {
    console.log("info " + info);
    $.ig.RevealSdkSettings.theme = createRevealTheme(id, "");
    let thumbnailView = new $.ig.RevealDashboardThumbnailView("#" + id);
    thumbnailView.dashboardInfo = info;
}

function downloadFile(url, filename) {
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openDialog(callback) {
    fetch("/dashboards")
        .then(resp => resp.json())
        .then(data => {
            var container = document.querySelector("#thumbnails");
            container.innerHTML = "";

            data.forEach(id => {
                createThumbnail(container, id, callback);
            });

        }).then(() => {
            const dialog = document.querySelector("#dbSelector");
            dialog.showModal();
        });
}

function createThumbnail(container, id, callback) {
    const button = document.createElement("button");
    button.innerHTML = id;
    button.addEventListener('click', (arg) => {
        callback(id);
        closeDialog();
    });
    button.className = "Reveal-Thumbnail-Box";
    container.appendChild(button);
}

function closeDialog() {
    const dialog = document.querySelector("#dbSelector");
    if (dialog) {
        console.log("Closing dialog:", dialog);
        dialog.close();
    } else {
        console.error("Dialog element not found");
    }
}
