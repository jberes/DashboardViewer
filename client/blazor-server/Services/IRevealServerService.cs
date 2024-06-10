using DashboardViewer.Models.RevealServer;

namespace DashboardViewer.RevealServer
{
    public interface IRevealServerService
    {
        Task<List<DashboardNames>> GetDashboardNamesList();
        bool DeleteDashboard(string DashboardFilename);
        bool IsDuplicateDashboard(string DashboardFilename);
    }
}
