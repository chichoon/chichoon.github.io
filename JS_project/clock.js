const clockContainer = document.querySelector(".js-clock");
//class명 : js-clock 찾기
const clockTitle = clockContainer.querySelector("h2");
//js-clock 내의 h1 요소 찾기
//한번에 선언할 땐 const 요소1 = 대입1, 요소2 = 대입2 이렇게 해도됨

function getTime(){
    const date = new Date();
    //현재시간을 불러오는 함수
    const minutes = date.getMinutes();
    //현재시간에서 분을 불러오는 함수
    const hours = date.getHours();
    //현재시간에서 시를 불러오는 함수
    const seconds = date.getSeconds();
    //현재시간에서 초를 불러오는 함수
    clockTitle.innerText =`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    //html의 clocktitle string에 현재 시간과 분, 초 표시
    //삼항연산자 (? :) 을 이용해서 시분초가 한자리 수 일 경우 앞에 0 출력 
}

function init(){
    setInterval(getTime, 1000);
    //현재시간 (24시간기준) 이 표시됨
    //setInterval을 주었기 때문에 1초에 한번 시간이 변화
} //initializing 함수
init();