using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Pedidos.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Nome do Produto")]
        [Required(ErrorMessage = "Por favor informe o campo {0}")]
        [MaxLength(100, ErrorMessage = "Permitido somente o máximo de 100 caracteres")]
        [Column("nome_produto")]
        public string NomeProduto { get; set; }

        [DisplayName("Valor")]
        [Required(ErrorMessage = "Por favor informe o campo {0}")]
        [DataType(DataType.Currency)]
        [Column("valor")]
        public decimal Valor { get; set; }

        [DisplayName("Data de Vencimento")]
        [Required(ErrorMessage = "Por favor informe o campo {0}")]
        [DataType(DataType.Date)]
        [Column("data_vencimento")]
        public DateTime? DataVencimento { get; set; }

    }
}