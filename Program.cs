using BLL.Context;
using BLL.Features.CategoryFeature.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

var myCors = "_mySpecificCors";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myCors,
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<SoosleContext>(options => 
    options.UseSqlServer(
       builder.Configuration.GetConnectionString("DefaultConnection"),
       b => b.MigrationsAssembly(typeof(SoosleContext).Assembly.FullName)));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
        ValidateAudience = false,
        ValidateIssuer = false
    };
});

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

app.UseCors(myCors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.UseSwaggerUI();


app.Run();
