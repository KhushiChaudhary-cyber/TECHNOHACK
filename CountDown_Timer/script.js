window.onload =() =>{
    document.querySelector('#calculate').addEventListener('click',calculate);
    document.querySelector('#reset').addEventListener('click', reset);
    document.querySelector('#stop').addEventListener('click', stop);
    document.querySelector('#restart').addEventListener('click', restart);
}
  
let interval;

function calculate () {
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const endTime = new Date(date + " " + time);

    if (isNaN(endTime.getTime())){
        console.error('Invalid date or time');
        return;
    }

    clearInterval(interval);

    interval = setInterval(()=> calculateTime(endTime),1000);
}
 document.querySelector('.countdown').classList.add('start');

function calculateTime(endTime){
    const currentTime = new Date();
        const timeLeft = (endTime - currentTime) / 1000;

        if(timeLeft > 0 ){
         const days= document.querySelector('#countdown-days');
         const hours = document.querySelector('#countdown-hours');
         const minutes= document.querySelector('#countdown-minutes');
         const seconds = document.querySelector('#countdown-seconds');
    
         days.innerText=Math.floor(timeLeft /(24*60*60));
         hours.innerText=Math.floor((timeLeft/(60*60))%24);
         minutes.innerText=Math.floor((timeLeft/60)%60);
         seconds.innerText=Math.floor(timeLeft%60);
    } else {
        reset();
        document.querySelector('countdown').classList.remove('start');
    }
}

function reset(){
    clearInterval(interval);
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}

function stop(){
    clearInterval(interval);
}

function restart() {
    calculate();
}