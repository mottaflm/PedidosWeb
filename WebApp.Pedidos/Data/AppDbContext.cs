using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using WebApp.Pedidos.Models;

namespace WebApp.Pedidos.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext() : base(nameOrConnectionString: "DefaultConnection"){ }

        public DbSet<Pedido> Pedidos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>(); ;
            modelBuilder.Entity<Pedido>().ToTable("Pedidos");

            base.OnModelCreating(modelBuilder);
        }
    }
}