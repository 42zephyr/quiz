document.addEventListener("DOMContentLoaded",function(){
const btn=document.querySelector("#btnOpenModal");
const block=document.querySelector("#modalBlock");
const closeb=document.querySelector("#closeModal");
const que=document.querySelector("#question");
const answ=document.querySelector("#formAnswers");

class quest{
	constructor(q,f,s){
		this.q=q;
		this.vars=[f,s];

	}
}


let first=["./image/burger.png","Standart"]
let second=["image/burgerBlack.png","Black"]
			let q1=new quest("What colour of burgher?",first,second)

	btn.addEventListener('click',( )=>{
		console.log(block);
		block.classList.add('d-block');
		playTest();
	})
	
	
	closeb.addEventListener('click',()=>{
		answ.innerHTML=``;
		block.classList.remove('d-block');
	})
	
	const playTest=()=>{
		console.log("Test begun");
			
		const render=()=>{
			
			que.textContent=q1.q;
			console.log(q1);
			for (let i=0;i<2;i++){
			answ.innerHTML+=`
			<div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${q1.vars[i][0]} alt="burger">
                  <span>${q1.vars[i][1]}</span>
                </label>
              </div>`
			  
			}
		}
		render();
	}
})


