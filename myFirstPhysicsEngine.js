let inDownPos = false;
let jumping = false;
let horizontalDirection = "neutral"
let timeLeftInJump = 0;
let ableToDie = false;
let livesLeft = 5;
let dead = false;
ableToDie = true;
setTimeout(()=>{
    setInterval(applyGravity, 10)
    setInterval(updateMovement, 3)
    setInterval(checkBorders, 1)
    setInterval(checkStuffOffScreen, 1)
    setInterval(shootFromTurrets, 1500)
    setInterval(moveBullets, 100)
    setTimeout(()=>{ableToDie = true;},10000)
    setInterval(checkIfDead,1)
   // console.log(window.outerWidth)// 1536
    //console.log(window.outerHeight)//824
}, 150)
function touchingAFloor(){
    let objHeight = makeShort(getComputedStyle(document.querySelector(".player")).height)
    let afterTop = makeShort(getComputedStyle(document.querySelector(".player")).top)
    let floors = document.getElementsByClassName("floor")
    for(let i = 0; i < floors.length; i++){
        let objLeft = makeShort(getComputedStyle(document.querySelector(".player")).left)
        let objRight = makeShort(getComputedStyle(document.querySelector(".player")).width) + objLeft
        let floorLeft = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).left)
        let floorRight = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).width) + floorLeft
        let floorTop = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).top)
        if((objRight > floorLeft) && (objLeft < floorRight)){
            
        if(((afterTop + objHeight + 5 >= floorTop) && (afterTop + objHeight - 5 <= floorTop))){
            return true;
        }
    }
    }
    return false;
}
function applyGravity(){
    if(!dead){
    let gravityEffect = 3//Math.round(2 + (0.5 * playerSpeed))
    if(!jumping){
    let ele = "player"
    ele = "." + ele
    let startTop = makeShort(getComputedStyle(document.querySelector(ele)).top)
    startTop += gravityEffect;
    document.querySelector(ele).style.top = startTop + "px";
    let objHeight = makeShort(getComputedStyle(document.querySelector(ele)).height)
    let afterTop = makeShort(getComputedStyle(document.querySelector(ele)).top)
    let floors = document.getElementsByClassName("floor")
    for(let i = 0; i < floors.length; i++){
        let floorTop = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).top)
        let objLeft = makeShort(getComputedStyle(document.querySelector(ele)).left)
        let objRight = makeShort(getComputedStyle(document.querySelector(ele)).width) + objLeft
        let floorLeft = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).left)
        let floorRight = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).width) + floorLeft
        if((objRight > floorLeft) && (objLeft < floorRight)){
        if((afterTop + objHeight) > floorTop && (afterTop < floorTop)){
            document.querySelector(ele).style.top = (afterTop - (gravityEffect)) + "px"
        }
    }
    }
    




}}}
let playerSpeed = 1;
let playerSpeedIncreaser = 0.001;
let turretsToMoveInTop = []
function updateMovement(){
    if(!dead){
    if(horizontalDirection === "right"){
        
            goDirection("player", "right", Math.round(playerSpeed))
        playerSpeed += 0.0001
    } else if(horizontalDirection === "left"){
        
            goDirection("player", "left", Math.round(playerSpeed))
            playerSpeed += 0.0001
        
    }
}
    
}
function checkBorders(){
    let floors = document.getElementsByClassName("floor")
    for(let i = 0; i < floors.length; i++){
        let objTop = makeShort(getComputedStyle(document.querySelector(".player")).top)
        let objBottom = makeShort(getComputedStyle(document.querySelector(".player")).height) + objTop
        let objLeft = makeShort(getComputedStyle(document.querySelector(".player")).left)
        let objRight = makeShort(getComputedStyle(document.querySelector(".player")).width) + objLeft
        let floorTop = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).top)
        let floorLeft = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).left)
        let floorRight = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).width) + floorLeft
        let floorBottom = makeShort(getComputedStyle(document.querySelector("#" + floors[i].id)).height) + floorTop
        if((objBottom > floorTop) && (objTop < floorBottom)){// on same vertical level
            if(objLeft < floorRight && objRight > floorRight){//coming in from right
                document.querySelector(".player").style.left = objLeft + 10 + "px"
                
            }
            else if(objRight > floorLeft && objLeft < floorLeft){// coming in from left
                
                document.querySelector(".player").style.left = objLeft - 10 + "px"
            }else if(objRight < floorRight && objLeft > floorLeft){
                
                document.querySelector(".player").style.top = objTop - 10 + "px"
            }
        }
        
    }
}
function checkStuffOffScreen(){
    let floors = document.getElementsByClassName("floor")
    // setting floors
    for(let i = 0; i < floors.length; i++){
        let floorID = "#" + floors[i].id
        let floorRight = makeShort(getComputedStyle(document.querySelector(floorID)).left) + makeShort(getComputedStyle(document.querySelector(floorID)).width)
        let playerLeft = makeShort(getComputedStyle(document.querySelector(".player")).left)
        if(playerLeft - floorRight > 300){// if needs to be reset
            // setting new position and width/length
            let times100 = Math.floor(Math.random() * 400)
            let times300 =  Math.floor(Math.random() * 400)
            if(Math.abs(times300 - times100) >= 150){
                times100 = 75;
                times300 = 75;
            }
            
            if(i === 0){
                document.querySelector(floorID).style.left = makeShort(getComputedStyle(document.querySelector("#" + "f4")).left) + times100 + makeShort(getComputedStyle(document.querySelector("#" + "f4")).width) + "px"
                document.querySelector(floorID).style.top = makeShort(getComputedStyle(document.querySelector("#" + "f4")).top) + times300 - times100 +  makeShort(getComputedStyle(document.querySelector("#" + "f4")).height) + "px"
            }else{
                document.querySelector(floorID).style.left = makeShort(getComputedStyle(document.querySelector("#" + floors[i-1].id)).left) + times100 + makeShort(getComputedStyle(document.querySelector("#" + floors[i - 1].id)).width) + "px"
                document.querySelector(floorID).style.top = makeShort(getComputedStyle(document.querySelector("#" + floors[i-1].id)).top) + times300 - times100+ makeShort(getComputedStyle(document.querySelector("#" + floors[i-1].id)).height) + "px"
            }
            document.querySelector(floorID).style.width = Math.floor(Math.random() * 575 + 25) + "px"
            document.querySelector(floorID).style.height = Math.floor(Math.random() * 50 + 25) + "px"
        }
    }
    // setting turrets
    let turrets = document.getElementsByClassName("turret")
    for(let i = 0; i <  turrets.length; i++){
        let turretID = "#" + turrets[i].id
        let turretRight = makeShort(getComputedStyle(document.querySelector(turretID)).left) + makeShort(getComputedStyle(document.querySelector(turretID)).width)
        let playerLeft = makeShort(getComputedStyle(document.querySelector(".player")).left)
        if(playerLeft - turretRight > 700){
            document.querySelector(turretID).style.left = makeShort(getComputedStyle(document.querySelector(".player")).left) + 350  +Math.floor(Math.random() * 200) + "px"
            let floors = document.getElementsByClassName("floor")
            for(let i =0; i < floors.length; i++){
                let floorID = "#" + floors[i].id
                let floorLeft = makeShort(getComputedStyle(document.querySelector(floorID)).left)
                let floorRight = makeShort(getComputedStyle(document.querySelector(floorID)).width) + floorLeft
                let doIt = false;
                if((playerLeft + 50 > floorLeft) && (playerLeft < floorRight)){// same horizontal level
                    doIt = true;
                }else{
                    playerLeft += 50;
                    if((playerLeft + 50 > floorLeft) && (playerLeft < floorRight)){// same horizontal level
                        doIt = true;
                    }
                }
                if(doIt){
                   // let playerFloorDiff = makeShort(getComputedStyle(document.querySelector(".player")).top) + makeShort(getComputedStyle(document.querySelector(".player")).height) - makeShort(getComputedStyle(document.querySelector(floorID)).top);
                    document.querySelector(turretID).style.top = makeShort(getComputedStyle(document.querySelector(floorID)).top) - 300 + "px"
                }
        }
        }
    }
}
let idNumber = 0
function shootFromTurrets(){
    if(!dead){
    let turrets = document.getElementsByClassName("turret")
    let possibleColors = ["red", "green", "blue", "purple", "black", "cyan"]
    for(let i = 0; i < turrets.length; i++){
        let turretID = "#" + turrets[i].id
        let turretLeft = makeShort(getComputedStyle(document.querySelector(turretID)).left)
        let turretTop = makeShort(getComputedStyle(document.querySelector(turretID)).top)
        let color = possibleColors[Math.floor(Math.random() * possibleColors.length)]
        let element = document.createElement("div")
        let id = "b" + idNumber;
        element.setAttribute("id",id)
        element.classList.add = "bullet"
        element.className = "bullet"
        element.style.position = "absolute"
        element.style.borderRadius = "100%"
        element.style.width = "25px"
        element.style.height = "25px"
        element.style.left = turretLeft  + 13+ "px"
        element.style.top = turretTop  + 13+ "px"
        element.style.backgroundColor = color
        document.body.appendChild(element)
        idNumber++;
        
    }
}}
function findAngle(player, bullet){
    let opp = player[0] - bullet[0]
    let adj = player[1] - bullet[1]
    if(opp === 0 && adj === 0){
        return "sameSpot"
    } else if(opp === 0){
        if(adj > 0){
            return "down    "
        } 
        return "up      "
    } else if(adj === 0){
        if(opp > 0){
            return "right   "
        }
        return "left    "
    }
    let myReturn;
    let angle;
    if(adj > 0){
    angle = Math.round((Math.atan(opp/adj)) * 180 / Math.PI)
    myReturn = Math.abs(angle)
    }else if(adj < 0){
    opp = player[1] - bullet[1]
    adj = player[0] - bullet[0]
    //console.log("swapped")
    angle = Math.round((Math.atan(opp/adj)) * 180 / Math.PI)
    if(opp > 0 || adj > 0){
        opp = player[0] - bullet[0]
        adj = player[1] - bullet[1]
    }
    myReturn = Math.abs(angle)
    }
    if(opp > 0 && adj > 0){
        return "dr" + myReturn
    } else if(opp > 0 && adj < 0){
        return "ur" + myReturn
    } else if(opp < 0 && adj > 0){
        return "dl" + myReturn
    } else if(opp < 0 && adj < 0){
        return "ul" + myReturn
    }
}
function gameOver(){
    document.querySelector(".endScreen").style.visibility = "visible"
    document.querySelector(".endScreen").style.top = makeShort(getComputedStyle(document.querySelector(".player")).top) - 200 + "px"
    document.querySelector(".endScreen").style.left = makeShort(getComputedStyle(document.querySelector(".player")).left) - 300 + "px"
}
let deletedBullets = []

function checkIfDead(){
    window.scrollTo(makeShort(getComputedStyle(document.querySelector(".player")).left) - 1536/2, makeShort(getComputedStyle(document.querySelector(".player")).top - 824/2))
    let ableToProcede = true;
    let bullets = document.getElementsByClassName("bullet")
    for(let i = 0; i < bullets.length; i++){
    let bulletID = "#" + bullets[i].id
    for(let l = 0; l < deletedBullets.length; l++){
        if(deletedBullets[l] === bullets[i].id){
            ableToProcede = false
        }
    }
    if(ableToProcede){
    //console.log(bulletID)
    //console.log("#b0")
    if(ifTouching("player", bulletID)){
        if(ableToDie){
        livesLeft--;
        }
        document.querySelector(bulletID).remove()
        deletedBullets.push(bulletID)
        if(livesLeft <= 0){
            console.log("dead")
            dead = true;
            gameOver()
        }
    }
}
}
}
let increasingAmmounts = [18.435,15.255,11.31]
function getTotalAngle(number){
    if(number < 0){
        return 0
    }
    let oneMoreTime=  false;
    let doTheStatement = true;
    let increaseB = true;
    let b =0;
    let returnVal = 0;
    for(let i = 0; i < number; i++){
        returnVal += increasingAmmounts[b]
        if(increaseB){
        b++;
        } else{
            b--;
        }
        if(doTheStatement){
        if(b === 2 || oneMoreTime){
            if(oneMoreTime){
                oneMoreTime = false;
                doTheStatement = false;
            }
            oneMoreTime = true;
            b = 2;
            increaseB = false;
        }
    }
    }
    return returnVal;
}
function doTheLogic(i){
    if( i >= 1){
        //console.log(((getTotalAngle(i) - getTotalAngle(i - 1)) / 2) + getTotalAngle(i - 1) + "        " + i)
        return ((getTotalAngle(i) - getTotalAngle(i - 1)) / 2) + getTotalAngle(i - 1);
    }else{
        return 9.2175
    }
    
}
function getMeasurements(uniAngle){
let universalAngle =uniAngle;
while(universalAngle > 90){
universalAngle -= 90
}
let ogWay = false;
if((uniAngle>=90 && uniAngle< 180) || (uniAngle >= 270 && uniAngle < 360)){
    ogWay = true;
   
}
let goForwards = true;
let leftIncrement = 0;
let topIncrement = 0;
if(ogWay){
    leftIncrement = 3;
}else{
    topIncrement = 3;
}
doThis = true;
let i = 0;
while(doThis){
    i++;
    if(universalAngle >= doTheLogic(i)){
        if(doTheLogic(i) >= 45){
            goForwards = false;
            
        }if(goForwards && i !== 0){
            if(ogWay){
            topIncrement ++;
            leftIncrement = 3;
            } else{
                topIncrement = 3;
                //console.log("backwards")
                leftIncrement++;
            }
        }else{
            if(ogWay){
            topIncrement = 3;
            leftIncrement --;
            } else{
                leftIncrement = 3;
                topIncrement --;
            }
        }
    }else{
        doThis = false;
    }
}
myStoringVar = 0;
if(uniAngle <= 90){
    topIncrement =  0 - topIncrement
} else if(uniAngle <= 180){
    
} else if(uniAngle <= 270){
    leftIncrement = -leftIncrement
} else if(uniAngle <= 360){
    leftIncrement = -leftIncrement
    topIncrement = -topIncrement
}
return [leftIncrement,topIncrement]
}

function moveBullets(){
    let ableToProcede = true;
    let bullets = document.getElementsByClassName("bullet")
    for(let i = 0; i < bullets.length; i++){
        for(let l = 0; l < deletedBullets.length; l++){
            if(deletedBullets[l] === bullets[i].id){
                ableToProcede = false
            }
        }
        if(ableToProcede){
        let bulletID = "#" + bullets[i].id
        let player = {
            left:makeShort(getComputedStyle(document.querySelector(".player")).left),
            top:makeShort(getComputedStyle(document.querySelector(".player")).top)
        }
        let bullet = {
            left:makeShort(getComputedStyle(document.querySelector(bulletID)).left),
            top:makeShort(getComputedStyle(document.querySelector(bulletID)).top)
        }
        
        let directionB = findAngle([player.left,player.top],[bullet.left,bullet.top])
        console.log(findAngle([player.left,player.top],[bullet.left,bullet.top]).slice(0,2))
        if(directionB.length !== 8){// should always be 8 for other lengths
            if(bulletID){
                let indiAngle = Number(findAngle([player.left,player.top],[bullet.left,bullet.top]).slice(2,findAngle([player.left,player.top],[bullet.left,bullet.top]).length))
                let universalAngle = 0;
                let simpledirection = findAngle([player.left,player.top],[bullet.left,bullet.top]).slice(0,2)
                let leftIncrement = 0;
                let topIncrement = 0;
                
                if(simpledirection === "ur"){
                    universalAngle = (90 - indiAngle)
                } else if(simpledirection === "dr"){
                    universalAngle = 90 + (90 - indiAngle)
                } else if(simpledirection  === "dl"){
                    universalAngle = 180 + indiAngle
                } else if(simpledirection === "ul"){
                    universalAngle = 270 + indiAngle
                }
                //console.log(universalAngle)
               let multiplier = 1.5
               if(player.left - bullet.left >= 750){
                document.querySelector(bulletID).remove()
               }
               
                leftIncrement = Math.round(getMeasurements(universalAngle)[0] * multiplier)
                topIncrement = Math.round(getMeasurements(universalAngle)[1] * multiplier)
               // console.log(leftIncrement)
               // console.log(topIncrement)
                document.querySelector(bulletID).style.left = makeShort(getComputedStyle(document.querySelector(bulletID)).left) + leftIncrement + "px"
                document.querySelector(bulletID).style.top = makeShort(getComputedStyle(document.querySelector(bulletID)).top) + topIncrement + "px"
            }
        }else{
          let result = findAngle([player.left,player.top],[bullet.left,bullet.top])
          console.log(result)  
          switch(result){
            case "right   ": 
                document.querySelector(bulletID).style.left = makeShort(getComputedStyle(document.querySelector(bulletID)).left) + 4 + "px"
            case "left    ":
                document.querySelector(bulletID).style.left = makeShort(getComputedStyle(document.querySelector(bulletID)).left) - 4 + "px"
            case "up      ":
                document.querySelector(bulletID).style.top = makeShort(getComputedStyle(document.querySelector(bulletID)).top) - 4 + "px"
            case "down    ":
                document.querySelector(bulletID).style.top = makeShort(getComputedStyle(document.querySelector(bulletID)).top) + 4 + "px"
          }
        }
    
    }

    }
}
var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
    if (map[39] || event.key === 'l'){
        //right
       /* */
        horizontalDirection = "right"
    }
    else if (map[37] || event.key === 'j'){
        //left
        /*for(let i = 0; i < 10; i++){
            goDirection("player", "left", 1)
        }*/
        horizontalDirection = "left"
    }
    else if (map[38]  || event.key === 'i'){
        //up
        inDownPos = false;
        goDirection("player", "up", 37.5)
    } else if(map[32]){
        horizontalDirection = "neutral"
    }

    if (map[40] || event.key === 'k'){
        //down
        if(!inDownPos && !jumping){
        inDownPos = true;
        document.querySelector(".player").style.top = `${(makeShort(getComputedStyle(document.querySelector(".player")).top) + 25)}px`
        document.querySelector(".player").style.height = "25px"
        }
    } else{
        if(inDownPos){
        inDownPos = false;
        document.querySelector(".player").style.top = `${(makeShort(getComputedStyle(document.querySelector(".player")).top) - 25)}px`
        document.querySelector(".player").style.height = "50px"
        }
    }
    if(jumping){
        document.querySelector(".player").style.height = "50px"
    }
}

async function jump(){
    jumping = true;
    let jumpHeight = 250;
    /*let beganShort = false;
    if(makeShort(getComputedStyle(document.querySelector(".player")).height) === 25){
        beganShort = true;
    }*/
    let updateFrequency = 3;
    let b = 1
    let continueWithLoop = true;
    let startingPos = makeShort(getComputedStyle(document.querySelector(".player")).top)
    for(let i = startingPos; i >= startingPos - jumpHeight ; i--){
        if(continueWithLoop){
        if(i >= (startingPos - jumpHeight)){// if it still needs to go up
            setTimeout(()=>{document.querySelector(".player").style.top = i + "px"}, updateFrequency * b)
            if(updateFrequency * b >= 753){
                continueWithLoop = false;
            }
        }
        b++;
    }
    }
    setTimeout(()=>{
        jumping = false; 
    }, 1056)
}
function goDirection(ele, direction, speed){
    ele = "." + ele
    let  info  = {
        'left' : makeShort(getComputedStyle(document.querySelector(ele)).left),
        'top' : makeShort(getComputedStyle(document.querySelector(ele)).top),
        'width':makeShort(getComputedStyle(document.querySelector(ele)).width),
        'length':makeShort(getComputedStyle(document.querySelector(ele)).length),
    }
    if(direction === "right"){
        info.left += speed
    } else if(direction === "left"){
        info.left -= speed
    }
    if(direction === "up" && !jumping){
        if(touchingAFloor()){
            jump()
        }
    }


    document.querySelector(".player").style.left = `${info.left}px`
    document.querySelector(".player").style.top = `${info.top}px`
}
function ifTouching(eleN1, eleN2){
    let closeEnough = 10;
    eleN1 = "."+eleN1
    let addedAmount = Math.round(closeEnough / 2)
   // eleN2 = eleN2
    let ele1 = {
        width:makeShort(getComputedStyle(document.querySelector(eleN1)).width) ,
        height:makeShort(getComputedStyle(document.querySelector(eleN1)).height) ,
        top:makeShort(getComputedStyle(document.querySelector(eleN1)).top),
        left:makeShort(getComputedStyle(document.querySelector(eleN1)).left)
    }
    let ele2 = {
        height:makeShort(getComputedStyle(document.querySelector(eleN2)).height) ,
        width:makeShort(getComputedStyle(document.querySelector(eleN2)).width),
        top:makeShort(getComputedStyle(document.querySelector(eleN2)).top),
        left:makeShort(getComputedStyle(document.querySelector(eleN2)).left)
    }
    if(ele2.top < ele1.top + ele1.height && (ele2.top + ele2.height) > (ele1.top)){// same vertical level
        if((ele1.left + ele1.width) > ele2.left && ele1.left < (ele2.left + ele2.width)){//same horizontal level
            return true;
        }
    }
    return false;
}
function makeShort(prePos){
    switch(prePos.length){
        case 3:
            shortPos = parseInt(`${prePos[0]}`)
            break;
        case 4:
            shortPos = parseInt(`${prePos[0]}${prePos[1]}`)
            break;
        case 5:
            shortPos = parseInt(`${prePos[0]}${prePos[1]}${prePos[2]}`)
            break;
        case 6:
            shortPos = parseInt(`${prePos[0]}${prePos[1]}${prePos[2]}${prePos[3]}`)
            break;
        case 7:
            shortPos = parseInt(`${prePos[0]}${prePos[1]}${prePos[2]}${prePos[3]}${prePos[4]}`)
            break;
    }
    return shortPos
}
