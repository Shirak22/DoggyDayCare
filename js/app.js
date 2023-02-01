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

let dogs = [];



async function getDogs(URL){
    console.log('start..');
    let prom = await promiseGet(); 
    console.log('prom'); 
    let response = await fetch(URL);
    console.log('response');

    let data = await response.json();
    console.log('data');
 

    data.forEach(dog => {
        dogs.push(dog.name);
    });

    console.log('done');
    
}

getDogs(API_URL);


 function promiseGet(){
    let promise = new Promise((res)=> {
        setTimeout(()=>{
            res('MyPromies'); 
        },5000); 
    }); 

    return promise; 
}




