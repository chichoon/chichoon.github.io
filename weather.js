const COORDS = "coords";
const API_KEY = "1894bda620f9690a7ac4bc5908094b1c";
//openWeatherMap API KEY

const weather = document.querySelector(".js-weather");
const weatherImg = document.querySelector(".js-weatherImg");

function getWeather(lat, long){ //위도와 경도를 이용하여 실질적으로 날씨를 api로부터 가져오는 함수
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        //latitude와 longitude를 이용해서 open api 이용, 값 가져오기
        ).then(function(item){
            //서버에서 데이터를 모두 받아온 뒤에 수행되도록 then 사용
            //데이터를 다 받아오지도 않은 채로 함수를 실행하면 오류 가능성 있음
            return item.json();
            //item (서버에서 받아온 데이터) 내에서도 필요 없는 걸 쳐내고
            //내부 json body만 받아오도록 함 
        }).then(function(json){
            //위의 함수에서 json 데이터가 로딩 완료되었을 때 실행되도록
            //한번 더 then 사용
            const temperature = json.main.temp;
            const place = json.name;
            const iconID = json.weather[0].icon
            let iconDescription = "";
            weatherImg.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`

            switch(iconID){
                case "01d": iconDescription = "clear day"; break;
                case "01n": iconDescription = "clear night"; break;
                case "02d": iconDescription = "day with few clouds"; break;
                case "02n": iconDescription = "night with few clouds"; break;
                case "03d": iconDescription = "day with scattered clouds"; break;
                case "03n": iconDescription = "night with scattered clouds"; break;
                case "04d": iconDescription = "day with broken clouds"; break;
                case "04n": iconDescription = "night with broken clouds"; break;
                case "09d": iconDescription = "rainy day"; break;
                case "09n": iconDescription = "rainy night"; break;
                case "10d": iconDescription = "rainy day"; break;
                case "10n": iconDescription = "rainy night"; break;
                case "11d": iconDescription = "day with thunderstorm"; break;
                case "11n": iconDescription = "night with thunderstorm"; break;
                case "13d": iconDescription = "snowy day"; break;
                case "13n": iconDescription = "snowy night"; break;
                case "50d": iconDescription = "misty day"; break;
                case "50n": iconDescription = "misty night"; break;
            }
            weather.innerHTML = `</br>Today is ${iconDescription}! </br>${temperature}˚C in ${place}`;
        })
}

function saveCoords(coordsObj){ //localStorage에 좌표 object를 저장하는 함수
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    //object를 json.stringify를 이용하여 string화 시킨 후 저장
}

function handleGeoSuccess(position){ //좌표를 가져오는데 성공했을 경우 실행되는 함수
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        //객체 (Object)에서 키 이름과 키값 변수명이 같을 땐
        //그냥 이렇게 해줘도 latitude : latitude와 같은 결과를 갖는다
    };
    //위도와 경도를 객체 내에 저장
    saveCoords(coordsObj);
    //해당 객체를 localStorage에 저장하는 함수
    getWeather(latitude, longitude);
}

function handleGeoError(){
    alert('failed to get position');
}

function askForCoords(){ //navigator 이용, 현재 위치를 받아오는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    //함수 두 개를 인자로 받는데, 첫 번째는 좌표 불러오기에 성공했을 경우,
    //두 번째는 좌표 불러오기에 실패했을 경우
}

function loadCoords(){ //현재 위치 좌표를 불러오는 함수
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
        //현재 위치 좌표가 저장되어 있지 않다면 새로 불러오기
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        //현재 위치 좌표를 이용해서 날씨를 불러오기
    }
}

function init(){
    loadCoords();

}

init();