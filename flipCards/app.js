//狀態列
const GAME_STATE = {
    FirstCardAwaits: "FirstCardAwaits",
    SecondCardAwaits: "SecondCardAwaits",
    CardsMatchFailed: "CardMatchFailed",
    CardsMatched: "CardsMatched",
    GameFinished: "GameFinished",
}


//卡牌花色區
const Symbols = [
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png', // 愛心
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png', // 方塊
  'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
]

//卡牌渲染區
const view = {
    getCardElement (index){
        return `<div data-index ="${index}" class="card back"></div>`
    },

    getCardContent(index){
        const cardNumber = this.transformNumber((index % 13) + 1)
        const symbol = Symbols[Math.floor(index / 13)]
        return `
        <p>${cardNumber}</p>
        <img
          src="${symbol}"
          alt=""
        />
        <p>${cardNumber}</p>
        `
    },    

    transformNumber (number){
        switch(number){
            case 1:
                return "A"
                break;
            case 11:
                return "J"
                break;
            case 12:
                return "Q"
                break;
            case 13:
                return "K"
                break;
            default:
                return number;
                break;
        }
    },
    displayCards(indexes){
        const rootElement = document.querySelector("#cards")
        rootElement.innerHTML = indexes.map(index => this.getCardElement(index)).join("")
    },

    flipCards(...cards){
        cards.map(card=>{
        if (card.classList.contains("back")){
            card.classList.remove("back")
            card.innerHTML = this.getCardContent(card.dataset.index)
            return
        }

        card.classList.add("back")
        card.innerHTML = null
    })
    },
    pairCards(...cards){
        cards.map(card=>{
            card.classList.add("paired")
        })
    },
    renderScore(score){
        document.querySelector(".score").textContent = `Score: ${score}`
    },

    renderTriedTimes(times){
        document.querySelector(".tried").textContent = `You've tried: ${times} times`;
    },
    
    appendWrongAnimation(...cards){
        cards.map(card=>{
            card.classList.add("wrong")
            card.addEventListener("animationend", (e)=>
                e.target.classList.remove("wrong"))
        })
    },
    showGameFinished(){
        const div = document.createElement("div")
        div.classList.add("completed")
        div.innerHTML = `
        <p>Complete!</p>
        <p>Score: ${model.score}</p>
        <p>You've tried: ${model.triedTimes} times</p>
      `
        const header = document.querySelector("#header")
        header.before(div)
    }

}

//外掛工具
const utility = {
    getRandomNumberArray (count){
        const number = Array.from(Array(count).keys()) //給出一個照順序排好的指定數量陣列
        for(let index = number.length -1; index > 0; index--){
            let randomNumber = Math.floor(Math.random()*(index + 1));//注意分號 很重要 不能省略
            [number[index],number[randomNumber]] = [number[randomNumber],number[index]]
        }
        return number
    }
}
//model
const model = {
    revealedCards:[],
    isRevealedCardsMatched(){
        return this.revealedCards[0].dataset.index % 13 === this.revealedCards[1].dataset.index % 13
    },
    score: 0,
    triedTimes: 0
}
//控制區
const controller = {
    currentGameState: GAME_STATE.FirstCardAwaits,
    generateCards(){
        view.displayCards(utility.getRandomNumberArray(52))
    },
    dispatchCardAction(card){
        if (!card.classList.contains("back")){
            return
        }
        switch(this.currentGameState){
            case GAME_STATE.FirstCardAwaits:
                view.flipCards(card)
                model.revealedCards.push(card)
                this.currentGameState = GAME_STATE.SecondCardAwaits
                break
            case GAME_STATE.SecondCardAwaits:
                view.renderTriedTimes(++model.triedTimes)
                view.flipCards(card)
                model.revealedCards.push(card)
                if (model.isRevealedCardsMatched()){
                    //配對成功
                    view.renderScore(model.score += 10)
                    this.currentGameState = GAME_STATE.CardsMatched
                    view.pairCards(...model.revealedCards)
                    model.revealedCards = []
                    if (model.score === 260){
                        this.currentGameState = GAME_STATE.GameFinished
                        view.showGameFinished()
                        return
                    }
                    this.currentGameState = GAME_STATE.FirstCardAwaits
                }else{
                    //配對失敗
                    this.currentGameState = GAME_STATE.CardsMatchFailed
                    view.appendWrongAnimation(...model.revealedCards)
                    setTimeout(this.resetCards,1000)
                }
                break
        }
        console.log('this.currentState', this.currentGameState)
    console.log('revealedCards', model.revealedCards.map(card => card.dataset.index))
    },
    
    resetCards(){
        view.flipCards(...model.revealedCards)
        model.revealedCards = []
        controller.currentGameState = GAME_STATE.FirstCardAwaits
    }
}
controller.generateCards()



const cards = document.querySelectorAll(".card")
cards.forEach(card=>{
    card.addEventListener("click", (e)=>{
        controller.dispatchCardAction(card)
    })
})


