
// "level": 1,
// "id": 1,
// "hanzi": "爱",
// "pinyin": "ài",
// "translations": [ "to love", "affection", "to be fond of", "to like" ]

// level: 1 id: 1~150
// level: 2 id: 151~300
// level: 3 id: 301~599
// level: 4 id: 600~1200
// level: 5 id: 1201~2500
// level: 6 id: 2501~5000

// https://pixabay.com/ja/ フリー素材
const typeSound = new Audio("./assets/js/audio_typing.mp3");
const correctSound = new Audio("./assets/js/audio_correct.mp3");
const levelSound = new Audio("./assets/js/audio_level.mp3");
const clickSound = new Audio("./assets/js/audio_click.mp3");

const Display1 = document.getElementById("Display1");
const Display2 = document.getElementById("Display2");
const Display3 = document.getElementById("Display3");
const typebox = document.getElementById("typebox");

// addEventListener!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let Qlevel = 0;
let btn = document.getElementsByClassName('btn');
const next = document.getElementById("next");
for (let i of btn) {
  i.addEventListener('click', function () {// levelボタンが押されたら
    levelSound.play();// level設定　音をつける
    levelSound.currentTime = 0;
    Qlevel = i.value;
    let btnbtn = document.querySelector('#next');//追加したい親要素
    btnbtn.innerHTML = '<button id="n_btn"> Next </button>';
    SetQ(i.value);
  })
}
next.addEventListener('click', function () {// Nextボタンが押されたら
  clickSound.play();// Nextボタン　音をつける
  clickSound.currentTime = 0;
  SetQ(Qlevel);
});

typebox.addEventListener("input", () => {// input内容が合ってるか判定
  typeSound.play();// タイプ音をつける
  typeSound.currentTime = 0;

  const a = Display1.querySelectorAll("span");
  const v = typebox.value.split("");
  let correct = true;
  a.forEach((char, i) => {
    if (v[i] == null) {
      char.classList.remove("correct");
      char.classList.remove("incorrect");
      correct = false;
    }
    else if (char.innerText == v[i]) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
    } else {
      char.classList.add("incorrect");
      char.classList.remove("correct");
      correct = false;
    }
  });
  if (correct == true) {
    correctSound.play();
    correctSound.currentTime = 0;
    setTimeout(function () { SetQ(Qlevel) }, 1000);// 1s後に次の問題へ
  }
});

// function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function GetRandom(level) {// ランダムな単語を取得
  let ar = [];
  for (let e of HSKs) {
    let obj = {};
    if (e["level"] == level) {
      obj["level"] = e["level"];
      obj["id"] = e["id"];
      obj["hanzi"] = e["hanzi"];
      obj["pinyin"] = e["pinyin"];
      obj["translations"] = e["translations"];
      ar.push(obj);
    }
  }
  let len = ar.length;
  const Q_minid = ar[0]["id"];
  const Q_maxid = ar[0]["id"] + len;
  let num = Math.floor(Math.random() * (Q_maxid - Q_minid)) + Q_minid;
  console.log("return: ", num, HSKs[num]);
  return HSKs[num];
}

function SetQ(level) {
  console.log("level: ", level);
  const word = GetRandom(level);//ランダムな単語を取得
  const hanzi = word["hanzi"];
  const pinyin = word["pinyin"];
  const translations = word["translations"];
  console.log(hanzi, pinyin, translations[0]);
  Display1.innerText = "";
  hanzi.split("").forEach(char => {// 単語を分解してspanタグを生成
    const Span = document.createElement("span");
    Span.innerText = char;
    Display1.appendChild(Span);
    console.log("Span: ", Span.innerText);
  });
  Display2.innerText = pinyin;
  Display3.innerText = translations;
  typebox.value = null;// タイプボックスの中身を消す
  typebox.focus();// タイプボックスにフォーカスをあてる
}