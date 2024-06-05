using DashboardViewer.Models.RevealServer;
using Reveal.Sdk;
using Reveal.Sdk.Dom;

namespace DashboardViewer.RevealServer
{
    public class RevealServerService : IRevealServerService
    {
        private readonly string _dashboardsFolderPath;

        public RevealServerService()
        {
            _dashboardsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Dashboards");
        }

        public async Task<List<DashboardNames>> GetDashboardNamesList()
        {
            var dashboardNames = new List<DashboardNames>();

            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "Dashboards");
            var files = Directory.GetFiles(folderPath);

            var tasks = files.Select(async file =>
            {
                try
                {
                    var dashboard = new Dashboard(file);
                    var thumbnailInfo = await dashboard.GetInfoAsync(Path.GetFileNameWithoutExtension(file).ToString());
                    var info = await dashboard.GetInfoAsync(Path.GetFileNameWithoutExtension(file));
                    
                    return new DashboardNames
                    {
                        DashboardFileName = Path.GetFileNameWithoutExtension(file),
                        DashboardTitle = RdashDocument.Load(file).Title,
                        ThumbnailInfo = info.Info
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error Reading FileData {file}: {ex.Message}");
                    return null;
                }
            });

            var results = await Task.WhenAll(tasks);
            dashboardNames = results.Where(result => result != null).ToList();

            return dashboardNames;
        }
    }
}

