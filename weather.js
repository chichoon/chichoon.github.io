const COORDS = 'coords';

function askForCoords(){ //api를 이용해서 현재 위치를 받아옴
    navigator.geolocation.getCurrentPosition()
}

function loadCoords(){ //현재 위치 좌표를 불러오는 함수
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
        //현재 위치 좌표가 저장되어 있지 않다면 새로 불러오기
    } else {
        getWeather();
        //현재 위치 좌표를 이용해서 날씨를 불러오기
    }
}

function init(){
    loadCoords();

}

init();