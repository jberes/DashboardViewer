using DashboardViewer.Reveal;
using DashboardViewer.RevealServer;
using IgniteUI.Blazor.Controls;
using Reveal.Sdk;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddControllers().AddReveal(builder =>
{
    builder.AddDashboardProvider<DashboardProvider>();
});

builder.Services.AddServerSideBlazor();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IRevealServerService, RevealServerService>();
RegisterIgniteUI(builder.Services);

void RegisterIgniteUI(IServiceCollection services)
{
    services.AddIgniteUIBlazor(
        typeof(IgbListModule),
        typeof(IgbAvatarModule)
    );
}

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.MapGet("dashboards/{name}/isduplicate", (string name, IRevealServerService revealServerService) =>
{
    return revealServerService.IsDuplicateDashboard(name);
});

app.MapGet("dashboards", () =>
{
    var filePath = Path.Combine(Environment.CurrentDirectory, "Dashboards");
    var files = Directory.GetFiles(filePath);
    return files.Select(x => Path.GetFileNameWithoutExtension(x));
});

app.MapGet("dashboards/{name}/thumbnail", async (string name) =>
{
    var path = Path.Combine(Environment.CurrentDirectory, "Dashboards", name + ".rdash");
    if (File.Exists(path))
    {
        var dashboard = new Dashboard(path);
        var info = await dashboard.GetInfoAsync(Path.GetFileNameWithoutExtension(path));
        return TypedResults.Ok(info);
    }
    else
    {
        return Results.NotFound();
    }
});


// Required for Reveal
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();
