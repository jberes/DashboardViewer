using Reveal.Sdk;
using Reveal.Sdk.Data;

namespace RevealSdk.Server
{
    internal class DataSourceProvider : IRVDataSourceProvider
    {
        public Task<RVDataSourceItem> ChangeDataSourceItemAsync(IRVUserContext userContext, string dashboardId, RVDataSourceItem dataSourceItem)
        {
            if (dataSourceItem is RVLocalFileDataSourceItem localDsi)
            {
                localDsi.Uri = "local:/" + localDsi.Id + ".xlsx";
            }
            return Task.FromResult(dataSourceItem);
        }

        public Task<RVDashboardDataSource> ChangeDataSourceAsync(IRVUserContext userContext, RVDashboardDataSource dataSource)
        {
            return Task.FromResult(dataSource);
        }
    }
}