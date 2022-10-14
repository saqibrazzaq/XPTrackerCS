﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Data;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("api.Entities.Achievement", b =>
                {
                    b.Property<Guid>("AchievementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Page")
                        .HasColumnType("int");

                    b.Property<Guid?>("PartId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Xp")
                        .HasColumnType("int");

                    b.HasKey("AchievementId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("Page");

                    b.HasIndex("PartId");

                    b.ToTable("Achievement");
                });

            modelBuilder.Entity("api.Entities.Level", b =>
                {
                    b.Property<Guid>("LevelId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("MaxExp")
                        .HasColumnType("int");

                    b.Property<int>("MinExp")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)");

                    b.HasKey("LevelId");

                    b.ToTable("Level");
                });

            modelBuilder.Entity("api.Entities.Part", b =>
                {
                    b.Property<Guid>("PartId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("SortOrder")
                        .HasColumnType("int");

                    b.HasKey("PartId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Part");
                });

            modelBuilder.Entity("api.Entities.Player", b =>
                {
                    b.Property<Guid>("PlayerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Experience")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("PlayerId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Player");
                });

            modelBuilder.Entity("api.Entities.PlayerAchievement", b =>
                {
                    b.Property<Guid>("PlayerAchievementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AchievementId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<Guid?>("PlayerId")
                        .IsRequired()
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PlayerAchievementId");

                    b.HasIndex("AchievementId");

                    b.HasIndex("PlayerId", "AchievementId")
                        .IsUnique();

                    b.ToTable("PlayerAchievement");
                });

            modelBuilder.Entity("api.Entities.Achievement", b =>
                {
                    b.HasOne("api.Entities.Part", "Part")
                        .WithMany("Achievements")
                        .HasForeignKey("PartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Part");
                });

            modelBuilder.Entity("api.Entities.PlayerAchievement", b =>
                {
                    b.HasOne("api.Entities.Achievement", "Achievement")
                        .WithMany("PlayerAchievements")
                        .HasForeignKey("AchievementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Entities.Player", "Player")
                        .WithMany()
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Achievement");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("api.Entities.Achievement", b =>
                {
                    b.Navigation("PlayerAchievements");
                });

            modelBuilder.Entity("api.Entities.Part", b =>
                {
                    b.Navigation("Achievements");
                });
#pragma warning restore 612, 618
        }
    }
}
