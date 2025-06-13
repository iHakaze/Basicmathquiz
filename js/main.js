let quiz=[];
let currentquizNumber = 0;
let score = 0;
let selected = "x";
let content = document.querySelector(".content");
let cloading = document.querySelector(".content-loading");
let quizcontent = document.querySelector(".quiz-holder");
let mainMenu = document.querySelector(".content-select-holder");
const input = document.getElementById("cans");
let cnt =0
let Cgen = "";


// Events/Clicks

document.querySelectorAll(".btn_choices").forEach(function(button) {
    button.addEventListener("click", function(e) {
         document.querySelectorAll(".btn_choices").forEach(btn => 
            btn.classList.remove("selected")
          );
        button.classList.add("selected");
        selected = button.value;
        console.log(button.value);
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
document.querySelector("#btn_Start").addEventListener("click",function(){
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
        let firstnumber = Math.floor(Math.random() * 9 + 1);
        let secondnumber = Math.floor(Math.random() * 9);
        let ans = 0;
        switch(x){
            case "x": ans = firstnumber * secondnumber; break;
            case "/":  ans = (firstnumber / secondnumber).toFixed(2); break;
            case "+":  ans = firstnumber + secondnumber; break;
            case "-":  ans = firstnumber - secondnumber;break;
        }
        quiz.push({"num1":firstnumber,"num2":secondnumber,"ans":ans,userans:""});
    }

    setTimeout(function(){
      clearInterval(Cgen);
      cloading.style.display="none";
      displayquestion(currentquizNumber)
    },3000)
  
}


function displayquestion(x){
  quizcontent.style.display = "block";
  let fn = document.querySelector("#firstnum p");
  let op = document.querySelector("#op p");
  let sn = document.querySelector("#secondnum p");
  console.log(selected)
    if(currentquizNumber <= quiz.length){
      fn.innerHTML = quiz[x].num1;
      op.innerHTML = selected;
      sn.innerHTML = quiz[x].num2;

    }
}
function answerEntry(){
   quiz[currentquizNumber].userans = input.value;
   console.log(currentquizNumber,"ans: "+input.value);
  if(currentquizNumber < quiz.length - 1){
    currentquizNumber++;
    input.value = "";
    displayquestion(currentquizNumber)
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
  

    let newEle = document.createElement("div");
    newEle.classList.add("result-holder");

    content.appendChild(newEle);

    let rescontent = document.createElement("div")

    rescontent.classList.add("result-content");
    rescontent.innerHTML= `<p>Score: ${score} / ${quiz.length}</p>
    <div><button class="btn btn-primary btn_return">Return To Menu</button></div>`;

    document.querySelector(".result-holder").appendChild(rescontent);

    document.querySelector(".btn_return").addEventListener("click",function(){
      console.log("hello");
         content.removeChild(content.lastChild);
        reset();
    });

    console.log("Score: "+score+"/"+quiz.length);
}

function reset(){

  mainMenu.style.display="block";
  quiz = [];

}
function init(){
  loading();
  generate(selected)
}

console.log(quiz)