const main = document.querySelector("main")
const root = document.querySelector(":root")
const input = document.getElementById("input")
const resultInput = document.getElementById("result")
/*Permite que o usuário digite somente caracteres permitidos.*/
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //Array com todos os caracteres permitidos.


document.querySelectorAll('.charKey').forEach(function(charKeyBtn) { //QuerySelectorAll, seleciona todos os elementos da classe indicada. forEach executa a função especificada para cada elemento individualmente.
  charKeyBtn.addEventListener('click', function() { //Adiciona uma função tipo click;
    const value = charKeyBtn.dataset.value // Pega o valor do atributo data-value de cada <button> dentro do html;
    input.value += value //Associa o valor de input ao botão.
  })
})

document.getElementById('clear').addEventListener('click', function () { //Criar função para a tecla "C" que limpa todos os elementos do input.
  input.value = '' //Adiciona um valor vazio dentro do input, quando o botão for selecionado.
  input.focus() //Método focus, serve para focar no input e deixar o cursor automaticamente selecionado.
})

input.addEventListener('keydown', function (ev) { // Evento keydown é quando uma tecla é selecionada.
  ev.preventDefault() //preventDefault previne que apareça algo no input quando o usuário digitar uma tecla. 
  if (allowedKeys.includes(ev.key)) { // includes, verifica se a tecla apertada está entre os caracteres permitidos.
    input.value += ev.key //se a tecla estiver entre os caracteres permitidos então ela aparece no valor do input.
    return
  }   
  if (ev.key === 'Backspace') { 
    input.value = input.value.slice(0, -1) //método slice, serve para cortar caracteres de uma lista, (0, -1) significa a porção específica que deseja cortar.
  }
  if (ev.key === 'Enter') {
    calculate() 
  }
}) 

//Função para calcular todos os valores.

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
  resultInput.value ='ERROR' // essas duas linhas vão funcionar como padrão caso não seja possível calcular um resultado.
  resultInput.classList.add('error')

  const result = eval(input.value) //função eval, serve para avaliar a linha de código Js e executar o código que estiver dentro de input.
  
  resultInput.value = result //exibir resultado
  resultInput.classList.remove('error') //  remove a classe padrão de erro
}

//Função copiar resultado

document.getElementById('copyToClipboard').addEventListener('click', function(ev) {
  const button = ev.currentTarget // currentTarget, é o botão que acionou o evento
  if (button.innerText === 'Copy') { //Se o texto do botão é igual a copy
    button.innerText = 'Copied!' // Avisa ao usuário que o resultado foi copiado
    button.classList.add('success') //Adiciona uma classe de CSS ao botão
    window.navigator.clipboard.writeText(resultInput.value) //navigator, copia o resultado dentro da área de transferência.
  } else {
    button.innerText = 'Copy'
    button.classList.remove('success') // ao clicar no botão Copy novamente ele retorna ao normal.
  }
})

//Trocar tema

document.getElementById("themeSwitcher").addEventListener("click", function() {
  if (main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9') //metodo setProperty, troca as propriedades do estilo especificado dentro de :root no CSS.
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})

