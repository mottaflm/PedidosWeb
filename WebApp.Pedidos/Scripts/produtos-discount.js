$(document).ready(LoadElementsEvents());

var valorAtual;

//Carrega todos elementos e eventos da página
function LoadElementsEvents(){

    //Setando a variavel global com o valor atual do produto (para multiplos usos)
    valorAtual = document.getElementById("result-novo-valor").value;

    //Pegando os elementos de Radio e Input para poder setar os eventos
    var radioButtons = document.getElementsByName("radio-options");
    var valueInput = document.getElementById("input-group-valor-desconto").children[1];

    //No caso temos só 2 opções, se necessário podemos refatorar a inicialização dos eventos em loop
    radioButtons[0].onclick = function(){
        UpdateValues();
    };
    radioButtons[1].onclick = function(){
        UpdateValues();
    };

    //Inicalizando evento do Input
    valueInput.onchange = function(){
        CheckInputValue(radioButtons, valueInput.value);
    };

    //Realizando o primeiro update dos valores
    UpdateValues();

    //Inicializando evento de checagem de caracteres especiais
    SetSpecialInputCheck();
}

//Evento OnChange para quando trocar o valor do Input
function CheckInputValue(radioButtons, value){

    if(value.length > 0){

        if(radioButtons[0].checked){
            CalculatePercentValue(value);
        }
        if(radioButtons[1].checked){
            CalculateFixedValue(value);
        }
    }
    else{
        UpdateValues();
    }
}

//Regra 1: Calculando o valor com desconto por porcentagem.
function CalculatePercentValue(value){

    //Convertendo para float
    var floatValue = parseFloat(value);

    //Valor tem que ser porcentagem valida
    if(floatValue > 100 || floatValue < 0){
        alert("Valor de porcentagem deve ser entre 0 e 100!");
        UpdateValues();
        return;
    }
    
    //Convertendo valor atual para float
    var valorAtualFloat = parseFloat(valorAtual);

    //Fazendo o calculo de porcentagem
    var result = valorAtualFloat - ((floatValue * valorAtualFloat) / 100);

    //Setando o elemento do novo valor e formatando já para para formato de moeda brasileira
    var valorNovo = document.getElementById("result-novo-valor");
    valorNovo.value = FormatInput(result);

}

//Regra 2: Calculando o valor com desconto de valor fixo.
function CalculateFixedValue(value){

    //Convertendo para float
    var floatValue = parseFloat(value);

    //Convertendo valor atual para float
    var valorAtualFloat = parseFloat(valorAtual);

    //Valor não pode ser maior que o atual ou menor que 0
    if(floatValue > valorAtualFloat || floatValue < 0){
        alert("Valor informado deve ser entre 0 e "+ valorAtualFloat +"!");
        UpdateValues();
        return;
    }

    //Calculando diferença
    var result = valorAtualFloat - floatValue;

    //Setando o elemento do novo valor e formatando já para para formato de moeda brasileira
    var valorNovo = document.getElementById("result-novo-valor");
    valorNovo.value = FormatInput(result);
}

//Atualização visual dos valores
function UpdateValues(){

    //Recebendo os Radios
    var radioButtons = document.getElementsByName("radio-options");

    //Aplicando os valores do input conforme radio selecionado
    var inputs = document.getElementById("input-group-valor-desconto");
    var inputAddonSymbol = inputs.children[0];
    var inputValue = inputs.children[1];

    inputValue.value = '';

    if(radioButtons[0].checked){
        inputAddonSymbol.innerText = '%';
    }
    if(radioButtons[1].checked){
        inputAddonSymbol.innerText = 'R$';
    }

    //Aplicando o valor atual em novo valor para redefinição
    var novoValor = document.getElementById("result-novo-valor");
    novoValor.value = valorAtual;
    
}

//Previne a inserção dos caracteres: -, +, e, E
//Solução encontrada no StackOverflow e adaptada para o código
function SetSpecialInputCheck(){

    var inputBox = document.getElementById("input-group-valor-desconto").children[1];

    var invalidChars = [
    "-",
    "+",
    "e",
    "E",
    ];

    inputBox.addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    });
}

//Formatando para moeda brasileira
function FormatInput(value){
    return value.toLocaleString('pt-br', {minimumFractionDigits: 2}).replace(/[.]/gi,'');
}