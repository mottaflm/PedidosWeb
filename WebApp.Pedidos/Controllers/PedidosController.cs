using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApp.Pedidos.Data;
using WebApp.Pedidos.Models;

namespace WebApp.Pedidos.Controllers
{
    public class PedidosController : Controller
    {
        private AppDbContext db = new AppDbContext();

        // -- LIST -- //
        public async Task<ActionResult> Index()
        {
            return View(await db.Pedidos.ToListAsync());
        }

        // -- CREATE -- //
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,NomeProduto,Valor,DataVencimento")] Pedido pedido)
        {
            if (ModelState.IsValid)
            {
                db.Pedidos.Add(pedido);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(pedido);
        }

        // -- EDIT -- //
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pedido pedido = await db.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return HttpNotFound();
            }
            return View(pedido);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,NomeProduto,Valor,DataVencimento")] Pedido pedido)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pedido).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(pedido);
        }


        // -- DISCOUNT -- //
        public async Task<ActionResult> Discount(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pedido pedido = await db.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return HttpNotFound();
            }
            return View(pedido);
        }

        //Criado novo ActionResult para atender o caso de descontos e alterar o valor na tabela
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Discount([Bind(Include = "Id,NomeProduto,Valor,DataVencimento")] Pedido pedido)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pedido).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(pedido);
        }

        // -- DELETE -- //
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Pedido pedido = await db.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return HttpNotFound();
            }
            return View(pedido);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Pedido pedido = await db.Pedidos.FindAsync(id);
            db.Pedidos.Remove(pedido);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }


        // -- DISPOSE -- //

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
