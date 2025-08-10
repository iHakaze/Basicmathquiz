let quiz=[];
let currentquizNumber = 0;
let score = 0;
let selected = "";
let content = document.querySelector(".content");
let cloading = document.querySelector(".content-loading");
let quizcontent = document.querySelector(".quiz-holder");
let mainMenu = document.querySelector(".content-select-holder");
let timerdiv = document.querySelector(".timer-holder");
const input = document.getElementById("cans");
const startbtn = document.querySelector("#btn_Start");
let interval;
let cnt =0
let Cgen = "";


// Events/Clicks

document.querySelectorAll(".btn_choices").forEach(function(button) {

  button.addEventListener("click", function(e) {
    document.querySelectorAll(".btn_choices").forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    selected = button.value;
    console.log(button.value);

    if(selected !== ""){
      startbtn.disabled =false;
    }
  });
});

  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
  input.addEventListener("focus",function(e){
   
      this.addEventListener("keydown",function(e){
        if(e.key == "Enter"){
           if(input.value != ""){
              answerEntry();
           }
        
        }
     })
    
  })

document.querySelector(".btn_submit").addEventListener("click",function(){
  answerEntry();
})
 startbtn.addEventListener("click",function(){
    mainMenu.style.display="none";
    init();
});

//--------------END OF EVENTS-----------------
// console.log(document.querySelectorAll(".btn_choices"))

function loading(){
  cloading.style.display="block";
  Cgen = setInterval(function(){
    cnt = (cnt + 1) % 4;
    cloading.innerHTML = "Generating"+".".repeat(cnt);   
  },500);

}
function generate(x){
    const max = 10;
    for(let i = 0; i< max; i++){
        let firstnumber = Math.floor(Math.random() * 9)+1;
        let secondnumber = Math.floor(Math.random() * 9) +1;
        let ans = 0;
      if(selected != "/"){
    
              switch(x){
                  case "x": ans = firstnumber * secondnumber; break;
                  case "+":  ans = firstnumber + secondnumber; break;
                  case "-":  ans = firstnumber - secondnumber;break;
              }
     
          quiz.push({"num1":firstnumber,"num2":secondnumber,"ans":ans,userans:""});
      }
      else{
        let dividend = firstnumber * secondnumber;
        ans = firstnumber;
        quiz.push({"num1": dividend,"num2":secondnumber,"ans":ans,userans:""});
      }
    }

    setTimeout(function(){
      clearInterval(Cgen);
      cloading.style.display="none";
      displayquestion(currentquizNumber)
      simulateLoading();
    },3000)
  
}


function displayquestion(x){
  console.log("arrLength",quiz.length);
  console.log("CurrN",currentquizNumber);
  quizcontent.style.display = "block";
  let fn = document.querySelector("#firstnum p");
  let op = document.querySelector("#op p");
  let sn = document.querySelector("#secondnum p");
  fn.innerHTML ="";
  op.innerHTML ="";
  sn.innerHTML ="";
  //console.log(selected)
    if(currentquizNumber <= quiz.length){
      fn.innerHTML = quiz[x].num1;
      op.innerHTML = selected;
      sn.innerHTML = quiz[x].num2;

    }

}
function answerEntry(){
  clearInterval(interval)
   quiz[currentquizNumber].userans = input.value;
   console.log(currentquizNumber,"ans: "+input.value);
  if(currentquizNumber < quiz.length - 1){
    currentquizNumber++;
    input.value = "";
    displayquestion(currentquizNumber)
    simulateLoading()
    console.log(quiz)
  }
  else{
    console.log(currentquizNumber)
    finishquiz();
    score = 0;
  }
}
function finishquiz(){

    for(let num of quiz){
      if(num.ans == num.userans){
        score++;
      }
    }

    quizcontent.style.display="none";
    timerdiv.style.display="none";
  

    let newEle = document.createElement("div");
    newEle.classList.add("result-holder");

    content.appendChild(newEle);

    let rescontent = document.createElement("div")

    rescontent.classList.add("result-content");
    rescontent.innerHTML= `<p>Score: ${score} / ${quiz.length}</p>
    <div class="return_holder"><button class="btn btn-primary btn_return">Return To Menu</button></div>`;

    document.querySelector(".result-holder").appendChild(rescontent);

    document.querySelector(".btn_return").addEventListener("click",function(){
      reset();
      document.querySelector(".result-holder").remove();
    });

}
function simulateLoading() {
  timerdiv.style.display="block";
  const loader = document.querySelector('.line-timer');
  let maxDuration = 15000;//30 sec in millisecond
  let progress = maxDuration;
  let color = "#04fc3e";
  // Reset width
  loader.style.width = '100%';

   interval = setInterval(() => {
    if (progress <= 0) { // Stop at 30%
       clearInterval(interval);
       answerEntry();
       progress = 0;
    } else {
      progress -= 16; 
      const widthPercent = (progress / maxDuration) * 100;
    
      if(widthPercent < 20){
        color = "#ff0101"
      }
      else if(widthPercent < 40){
        color = "#ff8d01"
      }
      else if(widthPercent < 60){
        color = "#fce304"
      }
      else if(widthPercent < 80){
        color = "#d3fc04"
      }
      loader.style.backgroundColor = color;
      loader.style.boxShadow = `0px 0px 1px ${color}`, `0px 0px 4px ${color}`;
      loader.style.width = widthPercent + '%';
    }
  }, 16);
}
function reset(){
  document.querySelectorAll(".btn_choices").forEach(btn =>btn.classList.remove("selected"));
  mainMenu.style.display="block";
  quiz = [];
  selected = "";
  currentquizNumber = 0;
  input.value ="";
  startbtn.disabled =true;
}
function init(){
  loading();
  generate(selected)
}

console.log(quiz)