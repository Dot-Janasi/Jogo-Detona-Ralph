alert("Primeiro jogo desenvolvido por mim :D");

const state = {
    view: { /*demos uma sentido semantico para eles, pois quando precisarmos usa-los fica organizado e vamos saber que eles sao as coisas visuais do jogo*/
        squares: document.querySelectorAll(".square"), /*serve para acharmos com o javaScript todos os elementos que estiverem com a classe "square"*/ 
        enemy: document.querySelector(".enemy"), /*sem o All no fim da queryselector ele só seleciona uma e nao varias classes*/
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },

    values: {
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        LostLife: 0,
        life: 3,
    },
    
    actions: {
        timerId: setInterval(randomSquare, 1000), /*essa funcao é responsavel por movimentar o Ralph a cada alguns segundos/ minutos */
        countDownTimerId: setInterval(countDown, 1000), /*esse cara a cada 1000 milisegundos diminui o tempo*/
    },
};

function resete(){
    // Resetando os valores de tempo, vidas e resultado
  state.values.curretTime = 60; // Exemplo: 60 segundos de tempo inicial
  state.values.curretLife = 3;  // Exemplo: 3 vidas iniciais
  state.values.result = 0;       // Resetando a pontuação para 0

  // Atualizando a interface do usuário com os novos valores
  state.view.timeLeft.textContent = state.values.curretTime;
  state.view.life.textContent = state.values.curretLife;
  state.view.score.textContent = state.values.result;

  // Resetando o inimigo
  randomSquare();

  // Reiniciando os intervalos
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);

  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timerId = setInterval(randomSquare, 1000);

  // Removendo os ouvintes antigos, se houver
  removeListeners();

  // Adicionando os ouvintes novamente
  addListenerHitBox();
}

function countDown(){ /*essa funcao e responsavel por criar a conttagem recressiva para acabar o timer*/
    state.values.curretTime --;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0 || state.values.life <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Sua pontuação final foi de: " + state.values.result);
        resete();
    }
}

function playSounds (audioName) { /*essa função tem a responsabilidade que quando chamada dentro das outras funcoes aplicar sons guardados na nossa pasta de sons*/
    let audio = new Audio(`./src/audios/${audioName}.mp3`); 
    audio.volume = 0.3;
    audio.play();
}

function randomSquare /*essa função é responsavel por escolher aleatoriamente um quadrado (em ingles "square") e fazer nosso enemy(detona Ralph) aparecer*/() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); /*este comando e responsavel por remover o Ralph de todos os quadrados limpando e fazendo nao dar erros*/
    });

    let randomNumber = Math.floor(Math.random() * 9/*essa funcao pega apenas a parte inteira de um numero aleatorio de 1 ate 9*/); /* "Math" é uma classe do javaScript para conceitos matematicos  e "floor" é uma função que arredonda os numeros*/
    let randomSquare = state.view.squares[randomNumber]; /*pego o quadrado sorteado com o randomNumber*/
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; /* esse comando guarda a posição onde o mouse acerta o ralph aleatoriamente */
}

function addListenerHitBox() {/*conceito universal para esperar ações quando executadas*/
   state.view.squares.forEach((square) => {
    square.addEventListener("mousedown" , () =>{ /* mousedown é pq acionamos esse evento quando clicamos com o mouse*/
        if(square.id === state.values.hitPosition) { /*se o lugar onde mouse tocou for o mesmo em que esta o Ralpf : */
            state.values.result++ /*quando acerta ganha um ponto*/
            state.view.score.textContent = state.values.result; /*mostra no score o ponto ganho */
            state.values.hitPosition = null; /*depois do ponto ganho, a volta pra nulo pra nao clicarem de novo no mesmo lugar e "farmarem" varios pontos consecutivamente*/
            playSounds("coinMario");
        } else {
            state.values.life--; /*quando erra perde uma vida */
            state.view.lifes.textContent = state.values.life;/*mostra para o usuario a vida perdida */    
            playSounds("death");
          }
    })
   }) 
} ;

function main() {/*funçaõ principal*/ 
   addListenerHitBox();
   function removeListeners() {
    state.view.squares.forEach((square) => {
      square.removeEventListener("mousedown", () => { });  // Remover todos os ouvintes antigos
    });
};

}

main();