# Maratona Explorer 1.0 - 14/06/22
- Para iniciantes

# CSS
- Apresentação visual para o cliente
- Estilos para o HTML
- Cascading Style Sheets
    - Folha de Estilo em Cascata
# Declaração
- Seletor
- Propriedade e Valor

# Conceitos
- Cascata
- Especificidade
- Box Model (div)
- Display block vs inline

# JS
1. Variáveis
 - let estaChovendo = true
 - const meuNome = "Mayke"

2. Tipos de Dados
- String
 - ""
 - ''

- Number
 - 12 - Integer (+ -)
 - 3.2 - Float  (+ -)

- Boolean
 - true ou false
 - const maiorDeDezoito = false

3. Operadores
 - Atribuição (ex: =)
 - atribui valor
   - let n1 = 12
   - let n2 = 3

 - Aritméticos (ex: * / + -)
   - calculos matemáticos simples
 - Comparação  (ex: > < == )
   - transforma a expressão em true ou false

4. Condicional ( if/else )
   - const idade = 17
   - const maiorDeDezoito = idade >= 18

   if (maiorDeDezoito){
      alert("Pode tirar a carteira de motorista")
   } else {
      alert("Não pode tirar")
   }

5. Estrutura de dados
   - Array - Vetor - Lista
      - const temperaturas = [23.3, 32.2, 1, 5]
   - Object
      - const pessoa = {
         nome: "Vinicius",
         idade: 19,
         jogosAtuais: ["FallGuysFree", "Valorant", "TFT"]
      }

6. Function
   - 1. Criação
      - function nomeDaFuncao(){
         console.log('código dentro da função')
      }
   - 2. Execução
      - nomeDaFuncao()

   - Parâmetros
      - function soma (a, b) {
         console.log(a + b)
      }
      - soma(34 ,45)
      - soma(90, 54)

   - Retorno
      - function soma(a, b) {
         return a + b
      }

7. Extensões da linguagem (ex.: Math, Date ...)
   - Math.random() // Gerar número random
   - Math.floor(1.2) // Arredondar pra baixo
   - Math.ceil(1.2) // Arrendondar pra cima
   - Math.PI

8. DOM - Document Object Model
   - window
   - window.alert("alerta")
   - document
   - document.write("texto")
   - document.documentElement.style.background = "black"
