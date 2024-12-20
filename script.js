let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetGame")
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turnO = false;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
let totalCount = 0


const resetGame = () =>{
    turnO = false
    totalCount = 0
    enableBoxes()
    msgContainer.classList.add("hide")
    for (let box of boxes){
        box.classList.remove("clicked")
    }
    totalCount = 0
    
}

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        console.log("box was clicked");
        box.classList.add("clicked")
        if(turnO){
            box.innerHTML = "O"
            turnO = false
            box.style.color = "black"
        }
        else{
            box.innerHTML = "X"
            turnO = true
            box.style.color = "darkblue"

        }
        box.disabled = true
        totalCount++

        let isWinner = checkWinner()

        if(totalCount === 9 && !isWinner){
            gameDraw()
        }
    })
    
})

const gameDraw = ()=>{
    msg.innerHTML = "It's a DRAW"
    msgContainer.classList.remove("hide")
    disableBoxes()
}

const showWinner = (winner) => {
    
    msg.innerHTML = `${winner} won the game!`
    msgContainer.classList.remove("hide")
    disableBoxes()
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false
        box.innerHTML = ""
    }
}

function checkWinner(){
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerHTML
        let pos2val = boxes[pattern[1]].innerHTML
        let pos3val = boxes[pattern[2]].innerHTML
        
        if(pos1val != "" && pos2val != "" && pos3val != "")
        {
            if(pos1val === pos2val && pos2val === pos3val)
            {
                console.log("winner",pos1val);
                
                showWinner(pos1val)
                return true
            }
            
        }
    }
    
}

newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)
