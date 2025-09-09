let time = document.getElementById("seconds");
let startButton = document.getElementById("start");
let reset = document.getElementById("reset");
let display = document.getElementById("display");

startButton.addEventListener("click",() => {startCountdown(time.value)});
function startCountdown(seconds){
    time.value = ''; 
    
    let countdown = setInterval(() => {
        reset.addEventListener("click", () => {
            seconds.value = 0;
            reset.value =1;
            display.innerHTML = '';
        });
        
        if(seconds%60 < 10){
            display.innerHTML = `${Math.floor(seconds/60)}:0${seconds%60}`;
        }
        else if (seconds >= 600){
            display.innerHTML = `${Math.floor(seconds/60)}:${seconds%60}`;
        }
        else{
            display.innerHTML = `0${Math.floor(seconds/60)}:${seconds%60}`;
        }
        seconds--;
        if(seconds <= 0){
            clearInterval(countdown);
            alert("Time's up!");
        }
        else if (reset.value == 1){
            clearInterval(countdown);
            display.innerHTML = '';
            reset.value = 0;
        }
    }, 1000);
}