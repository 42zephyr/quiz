document.addEventListener("DOMContentLoaded",function(){
const btn=document.querySelector("#btnOpenModal");
const block=document.querySelector("#modalBlock");
const closeb=document.querySelector("#closeModal");
const que=document.querySelector("#question");
const answ=document.querySelector("#formAnswers");
const control=document.querySelector("#modalFooter");
const next=document.querySelector("#next");
const prev=document.querySelector("#prev");

let qnumber=0;
		
	btn.addEventListener('click',( )=>{
		console.log(block);
		block.classList.add('d-block');
		playTest();
	})
		
	const playTest=()=>{
		console.log("Test begun");

		closeb.addEventListener('click',()=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			
		})
		
		next.addEventListener('click',( )=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber++;
			block.classList.add('d-block')
			render(qnumber);
		})
	
		prev.addEventListener('click',( )=>{
			answ.innerHTML=``;
			block.classList.remove('d-block');
			qnumber--;
			block.classList.add('d-block')
			render(qnumber);
		})
	
		const render=(number)=>{
			console.log(number);
			que.textContent=questions[qnumber].question;
			console.log(questions[qnumber]);
			questions[qnumber].answers.forEach(i=>{
			answ.innerHTML+=`
			<div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src=${i.url} alt="burger">
                  <span>${i.title}</span>
                </label>
              </div>`
			  
			})
			console.log(qnumber);
			
			if (qnumber<1)
			{
				prev.style.display="none";
			}
			else{prev.style.display="block";}
			if (qnumber<questions.length-1)
			{
				next.style.display="block";
			}
			else{next.style.display="none";}
		
		}
		render(qnumber);
	}
})
const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

