const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
//.js-form은 class명, input은 form 내의 형식명

const USER_LS = "currentUser", //local storage 위치명
    SHOWING_CN = "showing"; //css 클래스명

function saveName(text){ //local storage에 사용자명 (form에서 받은 input) 을 저장하기 위한 함수
    localStorage.setItem(USER_LS, text);
    //local storage에 위치한 currentUser라는 보관함에 text 저장
}

function handleSubmit(event){ //form 값을 화면에 띄우기 위한 함수
    event.preventDefault();
    //해당 이벤트 (submit)의 default Behavior인 텍스트 날려먹기를 방지
    //이 메소드를 등록함으로써 form에 적어서 엔터 쳐도 텍스트가 증발 안 함
    const currentValue = input.value;
    //form에 저장된 값을 currentValue에 대입
    paintGreeting(currentValue);
    //currentValue를 화면상에 text로 출력하는 함수
    saveName(currentValue);
    //currentValue를 local storage에 저장하여 나중에 쓸 수 있도록 하는 함수
}

function askForName(){
    form.classList.add(SHOWING_CN);
    //form의 클래스에 showing을 추가하여 화면상에 form이 나타나게 함
    //왜냐면 showing 클래스는 css에서 정의되어 있듯 검은색으로 display되게 해줌
    form.addEventListener("submit", handleSubmit);
    //해당 form을 채워 submit할 경우 (엔터를 누를 경우) 
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    //form의 클래스에 showing을 삭제하여 화면에 안 보이게 함
    greeting.classList.add(SHOWING_CN);
    //css용 클래스명인 showing을 greeting 요소의 클래스에 추가
    greeting.innerText = `Hello, ${text} !`;
    //greeting 요소의 text를 변경하여 출력하는 함수
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    //currentUser라는 storage에서 아이템을 꺼내옴
    if(currentUser === null){ //저장된 값이 없을 때
        askForName();
    } else { //저장된 값이 있을 때
        paintGreeting(currentUser);
        //local storage에 저장된 값을 정의한 함수를 이용해 출력
    }
}



function init(){
    loadName();
}
init();