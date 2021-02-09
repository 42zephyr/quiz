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
var firebaseConfig = {
						apiKey: "AIzaSyD90Z8q06bxdpLjWX9HtkmrxpmAeu9i_f0",
						authDomain: "quiz-b9e53.firebaseapp.com",
						databaseURL: "https://quiz-b9e53-default-rtdb.firebaseio.com",
						projectId: "quiz-b9e53",
						storageBucket: "quiz-b9e53.appspot.com",
						messagingSenderId: "488640005104",
						appId: "1:488640005104:web:3c9835297fa64f927b9335",
						measurementId: "G-WP2MNRB6QJ"
						  };

						  
						  
let qnumber=0;
		
	btn.addEventListener('click',( )=>{
		console.log(block);
		block.classList.add('d-block');
		getData();
		
	})
	const obj={};
	const getData=()=>{
		formAnswers.textContent='LOAD';
		next.style.display="none";
		prev.style.display="none";
		send.style.display="none";
		setTimeout(()=>{firebase.initializeApp(firebaseConfig);
		next.style.display="block";
			firebase.database().ref().child('questions').once('value')
						  .then(snap=>playTest(snap.val()))		
			formAnswers.textContent='';

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
			checkAnsw();
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber++;
			block.classList.add('d-block')
			//if(qnumber<questions.length){
			render(qnumber);
			//fillansw();
		})
		const checkAnsw=()=>{
			const obj={};
			
			const inputs = [...formAnswers.elements].filter((input)=>input.checked||input.id==="numberPhone");
			inputs.forEach((input,index)=>{
				if(qnumber<4)
				obj[`${index}_${questions[qnumber].question}`]=input.value;
				else{
				obj['numPhone']=input.value;
				}
			})
			console.log(obj);
			finalanswers.push(obj);
			console.log(finalanswers);
		}
		prev.addEventListener('click',( )=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber--;
			block.classList.add('d-block')
			render(qnumber);
		})
		
		send.addEventListener('click',()=>{
			checkAnsw();
			firebase
			.database()
			.ref()
			.child('contacts')
			.push(finalanswers)
		})
		
		const render=(number)=>{
			console.log(number);
			if(number<4){
				que.textContent=questions[qnumber].question;
			console.log(questions[qnumber]);
			questions[qnumber].answers.forEach(i=>{
			answ.innerHTML+=`
			<div class="answers-item d-flex flex-column-center">
                <input type="${questions[qnumber].type}" id="${i.title}" name="answer" class="d-none" value="${i.title}">
                <label for="${i.title}" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${i.url} alt="burger">
                  <span>${i.title}</span>
                </label>
              </div>`
			console.log(questions[qnumber].type);  
			send.style.display="none";
			})
			}
			else{

			  formAnswers.innerHTML=`
					<div class="form-group">
						<label for="numberPhone">Enter your number</label>
						<input type="phone" class="form-control" id="numberPhone">
					<div>
				`;
				
			}
			
			
			switch(number){
				case 0:prev.style.display="none";
					break;
				case 4://next.style.display="none";
				prev.style.display="none";next.style.display="block";
				send.style.display="block";
				send.classList.remove='d-none';
				que.textContent='Заполните форму';
				break;
				case 5:
				que.textContent='Спасибо за прохождение';
				prev.style.display="block";
				next.style.display="none";
				send.style.display="none";
				formAnswers.textContent="Thank you";
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
