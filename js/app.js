//https://doggydaycare.zocom.workers.dev/dogs

//data > > > > 
// {
//     dogs: [{
//         "name": "Molly",
//         "sex": "female",
//         "breed": "briard",
//         "img": "https://images.dog.ceo/breeds/briard/n02105251_6840.jpg",
//         "present": false,
//         "age": 4,
//         "chipNumber": "IEH455006",
//         "owner": {
//             "name": "Wilmer",
//             "lastName": "Svensson",
//             "phoneNumber": "0769239356"
//         }
//     }
//     ]
// }



//---------------------||||||||||||||||||||||||||||||---------------------

let API_URL = 'https://majazocom.github.io/Data/dogs.json';




async function setUp(){
    let data = await getDogs(API_URL); 
    let modal = document.querySelector('#modal'); 
    
    document.querySelector('main > button').addEventListener('click', ()=>{
        renderCards(data); // render all cards 
        let cardContainer = document.querySelectorAll('.card'); 
        
        cardContainer.forEach(card =>{
            card.addEventListener('click', (e)=>{
                let card_id = e.target.parentNode.parentNode.getAttribute('data-id') !== null ? e.target.parentNode.parentNode.getAttribute('data-id'): '';
                let selectedDog = checkID(data, card_id); //dog as object
                
                modal.innerHTML = '';
                modal.innerHTML = renderDetailsCard(selectedDog);
                modal.style.display = 'block';
                let closeBtn = document.querySelector('.modal__close'); // 
                closeBtn.addEventListener('click',()=>{
                    modal.style.display = 'none';
                });
             
                window.addEventListener('click',(event)=>{  
                    if(event.target == modal){
                        modal.style.display = 'none' ;
                    }
                     
                });
            });
        });
    });

 
   
   
}   



async function getDogs(URL){
    try{
        let response = await fetch(URL); 
        let data = await response.json();
        return data; 

    }catch(error){
            
        console.error(error);
    }
}

function renderCards(data){
    let container = document.createElement('section'); 
    container.classList.add('cards__container'); 
    
    data.forEach(dog => {
        container.innerHTML += renderCard(dog);
    });

    let main = document.querySelector('main');
    main.innerHTML = `
    <header>
        <h1>Our dogs </h1>
    </header>
    `;


    main.appendChild(container);
}

function checkID(arr, id){
   const result =  arr.find(({chipNumber})=> chipNumber === id); 
   return result;
   //{
    //         "name": "Molly",
    //         "sex": "female",
    //         "breed": "briard",
    //         "img": "https://images.dog.ceo/breeds/briard/n02105251_6840.jpg",
    //         "present": false,
    //         "age": 4,
    //         "chipNumber": "IEH455006",
    //         "owner": {
    //             "name": "Wilmer",
    //             "lastName": "Svensson",
    //             "phoneNumber": "0769239356"
    //         }
    //     }
}

function renderCard(dog){
    let result = `
    <article data-id ="${dog.chipNumber}" class="card">
        <section class="card__header">
            <img class="card__img" src="${dog.img}" alt="${dog.name}">
        </section>
        <section class="card__body">
            <h2 class="card__body-age">${dog.age}yr</h2>
            <h1 class="card__body-name">${dog.name}</h1>
            <p class="card__body-description">${dog.breed}</p>
            <p class="card__body-owner">OWNER: ${dog.owner.name} ${dog.owner.lastName}</p>
        </section>
    </article>
        `; 

        return result; 
}

function renderDetailsCard(dog){
    let result = `
    
    <article data-id ="${dog.chipNumber}" class="card_details">
     <span class="modal__close">&times;</span>
        <section class="card__header">
            <img class="card__img" src="${dog.img}" alt="${dog.name}">
        </section>
        <section class="card__body">
            <h2 class="card__body-age">${dog.age}yr</h2>
            <h1 class="card__body-name">${dog.name}</h1>
            <p class="card__body-description">
              <b>breed:</b>  ${dog.breed} <br>
              <b>sex:</b> ${dog.sex} <br>
              <b>chip number</b>: ${dog.chipNumber} <br>
            </p>
            <p class="card__body-owner"><b>OWNER:</b> ${dog.owner.name} ${dog.owner.lastName} <br><b> tel:</b>${dog.owner.phoneNumber}</p>
        </section>
    </article>
        `; 

        return result; 
}

setUp();