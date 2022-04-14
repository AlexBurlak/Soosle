using BLL.Context;
using BLL.Features.CategoryFeature.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<SoosleContext>(options => 
    options.UseSqlServer(
       builder.Configuration.GetConnectionString("DefaultConnection"),
       b => b.MigrationsAssembly(typeof(SoosleContext).Assembly.FullName)));
builder.Services.AddScoped<IDbContext>(provider => provider.GetService<SoosleContext>());
builder.Services.AddMediatR(typeof(CreateCategoryCommand).GetTypeInfo().Assembly);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseSwagger();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.UseSwaggerUI();


app.Run();
