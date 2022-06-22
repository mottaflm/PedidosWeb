$(document).ready(LoadTable());

//Carrega a tabela de informações dos produtos
function LoadTable(){

    var table = document.getElementById("table-produtos");

    //Não queremos pegar o <th> então pulamos o item 0
    for (var i = 1; i < table.rows.length; i++) {

        var row = table.rows.item(i).cells;

        //Iremos verificar a informação de cada linha da tabela, então podemos zerar para a próxima iteração
        var rowData = [];

        //Populando a array com os <td>'s
        for(var j = 0; j < row.length; j++){
            rowData.push(row.item(j));
        }

        VerifyExpiredDate(rowData);
    }
    
}

//Regra de negócio para ajustar a tabela conforme cores
function VerifyExpiredDate(rowData){
    
    //Pegando a string do elemento da linha com a data
    var dateString = rowData[rowData.length - 2].innerText;

    //Fazemos o split
    var [dia, mes, ano] = dateString.split('/');

    //Construimos um novo formato de data compreensivel pelo JS (Mês - 1 pq o JS não entende o 0 antes do numero)
    var formatedDate = new Date(+ano, +mes - 1, +dia);

    var currentDate = new Date();

    //Zerar os valores de tempo pois não olhamos para eles
    currentDate.setHours(0, 0, 0, 0);

    //Setamos a quantidade de dias alvo
    var targetDays = 3;

    //Convertemos a data alvo para valor numérico (dias * horas * minutos * segundos * milésimos)
    var targetDate = currentDate.getTime() + (targetDays * 24 * 60 * 60 * 1000);

    //Se a data na tabela for menor que a atual
    if(formatedDate < currentDate){
        StyleRow(rowData, "text-danger", true);
        DisableDiscountButton(rowData[rowData.length - 1]);
    }
    //Se a data na tabela for menor ou igual que a regra parametrizada
    else if(formatedDate <= targetDate){
        StyleRow(rowData, "text-warning", false);
    }
    //Caso remanescente
    else{
        StyleRow(rowData, "text-success", false);
    }
}

//Estiliza a linha, passando a mesma como array, a classe que deseja adicionar e se deseja destacar o texto da data ou não
function StyleRow(rowData, addedClass, highlightDate){

    //Estilizando os textos com a classe de bootstrap informada
    for(var i = 0; i < rowData.length - 1; i++){

        if(rowData[i].id === "date-vencimento"){
            rowData[i].className += addedClass

            //Destacando o valor de vencimento
            if(highlightDate){
                var date = rowData[i];
                date.innerHTML = "<b>"+ date.innerText +"</b>"
            }
        }
    }
}

//Varre os botões de ações e desabilita o especifico de desconto
function DisableDiscountButton(rowButtons){

    var buttons = rowButtons.children;

    for(var i = 0; i < buttons.length; i++){

        if(buttons[i].id === "btn-desconto"){
            buttons[i].className += " disabled";
        }

    }
}