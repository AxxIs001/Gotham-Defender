let currentDoor = {villain: null, hero: null}
let score = 0;
const scoreElement = document.getElementById("score");
let isGameOver = false;

const restart = document.querySelector("#restart");

document.addEventListener("DOMContentLoaded", ()=>{
    const board = document.getElementById("board");
    for(let i=0; i<9; i++){
     const door = document.createElement("div")
        door.id = i.toString();
        board.appendChild(door);
        door.addEventListener("click", (e)=>{
                const selectedDoor = e.target;

                if(isGameOver) return;

                if(selectedDoor.children.length === 0) return
            
                if(currentDoor.villain === selectedDoor){
                    score += 10;
                    scoreElement.textContent = score.toString();
                    clearDoor("villain")
                } else if(currentDoor.hero === selectedDoor){
                    isGameOver = true;
                    scoreElement.textContent = `Game Over: ${score}`;   
                    showRestartButton()   
                    spinCursor(false);
                }
        })
    }
    const customCursor = document.createElement("div");
    customCursor.id = 'custom-cursor';
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (e)=>{
        customCursor.style.left = `${e.pageX - 25}px`;
        customCursor.style.top = `${e.pageY - 25}px`;
    });

    spinCursor(true);
    setInterval(()=> setCharacter("villain"), 1500)
    setInterval(()=> setCharacter("hero"), 2000) 

   
})

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();
const setCharacter = (character) =>{
    if(isGameOver) return;
    clearDoor(character);
    const randomDoorId = getRandomDoorId();
    if(isDoorOccupied(randomDoorId)) return;
    const randomDoor = document.getElementById(randomDoorId);
    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    randomDoor.appendChild(img);
    currentDoor[character] = randomDoor;

    setTimeout(()=> clearDoor(character), 1000)
};

const isDoorOccupied = (randomDoorId)=>{
 return  currentDoor.villain?.id === randomDoorId || currentDoor.hero?.id === randomDoorId
}
const clearDoor = (character)=>{
    if(currentDoor[character]){
        currentDoor[character].innerHTML = "";
    }
}

const showRestartButton = ()=>{
   restart.classList.add("active")
    restart.addEventListener("click", ()=>{
        isGameOver = false;
        score = 0;
        scoreElement.textContent = score.toString();
        restart.classList.remove("active");
        spinCursor(true);
    })
}


const spinCursor = (shouldSpin) =>{
    const customCursor = document.getElementById("custom-cursor")

    if(shouldSpin){
        customCursor.classList.add("spinning");
    }else
    customCursor.classList.remove("spinning");

}