using api.ActionFilters;
using api.Data;
using api.Repository;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder
                    //.AllowAnyOrigin()
                    .WithOrigins(
                        "https://localhost:3000",
                        "http://localhost:3000",
                        "http://192.168.18.100:3000")
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));
        }

        public static void ConfigureSqlContext(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(x => x.UseSqlServer(
                configuration.GetConnectionString("XpTrackerCSDbConnection")));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureValidationFilter(this IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddScoped<ValidationFilterAttribute>();
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IPartService, PartService>();
            services.AddScoped<IAchievementService, AchievementService>();
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<ILevelService, LevelService>();
        }

        public static void MigrateDatabase(this IServiceCollection services)
        {
            var dbContext = services.BuildServiceProvider().GetRequiredService<AppDbContext>();
            dbContext.Database.Migrate();

        }
    }
}
