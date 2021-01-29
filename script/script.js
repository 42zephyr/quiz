document.addEventListener("DOMContentLoaded",function(){
const btn=document.querySelector("#btnOpenModal");
const block=document.querySelector("#modalBlock");
const closeb=document.querySelector("#closeModal");
const que=document.querySelector("#question");
const answ=document.querySelector("#formAnswers");
const control=document.querySelector("#modalFooter");
const next=document.querySelector("#next");
const prev=document.querySelector("#prev");
const send=document.querySelector("#send");

let qnumber=0;
		
	btn.addEventListener('click',( )=>{
		console.log(block);
		block.classList.add('d-block');
		getData();
		
	})
	const obj={};
	const getData=()=>{
		formAnswers.textContent='LOAD';
		
		
		setTimeout(()=>{
			formAnswers.textContent='';
			fetch('./questions.json')
				.then(res=>res.json())
				.then(obj=>playTest(obj.questions))
				.catch(err=>{
					formAnswers.textContent="Data error";
					console.error(err)})
			console.log(obj.questions);
		},1000)
	}
	
	const playTest=(questions)=>{
		console.log("Test begun");
		
		const finalanswers=[];
		const fillansw=()=>{
			
			
			const inputs=[...formAnswers.elements].filter((input)=>input.checked||input.id==='numberPhone');
			
			inputs.forEach((input,index)=>{
				if(qnumber>=0&&qnumber<=questions/length-1){
					obj['${index}_${questions[qnumber].question}']=input.value;
				}
				if(qnumber===questions.length){
					obj['numberPhone']=input.value;
				}
			})
			finalanswers.push(obj);
			console.log(finalanswers);
		}
		closeb.addEventListener('click',()=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			
		})
		
		next.addEventListener('click',( )=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber++;
			block.classList.add('d-block')
			//if(qnumber<questions.length){
			render(qnumber);
			fillansw();
		})
	
		prev.addEventListener('click',( )=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber--;
			block.classList.add('d-block')
			render(qnumber);
		})
		
		send.addEventListener('click',()=>{
			fillansw();
			console.log(finalanswers);
		})
		
		const render=(number)=>{
			console.log(number);
			que.textContent=questions[qnumber].question;
			console.log(questions[qnumber]);
			questions[qnumber].answers.forEach(i=>{
			answ.innerHTML+=`
			<div class="answers-item d-flex flex-column-center">
                <input type="${questions[qnumber].type}" id="${i.title}" name="answer" class="d-none" value="${i.title}">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${i.url} alt="burger">
                  <span>${i.title}</span>
                </label>
              </div>`
			  
			})
			console.log(questions[qnumber].type);
			switch(qnumber){
				case 0:prev.style.display="none";
					break;
				case 4:next.style.display="none";
				prev.style.display="none";
				formAnswers.innerHTML=`
					<div class="form-group">
						<label for="numberPhone">Enter your number</label>
						<input type="phone" class="form-control" id="numberPhone">
					<div>
				`;
				send.classList.remove='d-none';
				break;
				case 5:formAnswers.textContent="Thank you";
				setTimeout(()=>{
					block.classList.remove('d-block');
				},2000);
				
				
				break;
				default:prev.style.display="block";
					next.style.display="block";
					send.style.display="none";
					break;
			}
		
		}
		render(qnumber);
	}
})
