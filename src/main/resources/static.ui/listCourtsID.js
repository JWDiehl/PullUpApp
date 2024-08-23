// const { disconnect } = require("process");



// const proxyUrl = 'http://127.0.0.1:5500/src/main/resources/static.ui/pullupadd.html';  
// const mainUrl = `http://localhost:8080/api/basketball-courts`

// const apiUrl = mainUrl;
// let token =  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDI4OTI4MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0MjAyODgyfQ.HDzJKYkk3nE1LzxwVYgRnJlFQKCBPUDxtapBd909XAUFMdjLtib8exRjLIBkKxcPuQ0rH7lTONWRSUE48pel2g'; // Retrieve token from storage

// fetch('https://reqbin.com/echo', {
//   credentials: 'include'
// })
//    .then(resp => resp.text())
//    .then(html => console.log(html))

// document.addEventListener('DOMContentLoad', () => {

//   const button = document.getElementById('fetch-btn2');
//   if(button){
//   button.addEventListener('click', listAllCourtsByID);
//   }
//   else{console.log('Button not found');}
//   });
  

function listAllCourtsByID (){ fetch('http://localhost:8080/api/basketball-courts/3', {
  headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDQ1Nzk0NywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0MzcxNTQ3fQ.SEHL7om-FnN_7jr_s1fyUG-b9Jd-Umqjen364w4R4JQUeasRlr5JbnUoWOPY_v_hGVV6OD-bR_m0t85EKxStXQ'}
})
   .then(resp => resp.json())
   .then(data => displayData(data))
   .then(json => console.log(JSON.stringify(json)))}


// console.log(data);

// setTimeout(document.getElementById("myButton").setAttribute(onClick, listAllCourtsByID(), 2000));
   
// fetch(apiUrl,{
//   method: 'GET',
//   headers: {
//     Authorization: 'Bearer 
//     {eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDI4OTI4MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0MjAyODgyfQ.HDzJKYkk3nE1LzxwVYgRnJlFQKCBPUDxtapBd909XAUFMdjLtib8exRjLIBkKxcPuQ0rH7lTONWRSUE48pel2g}'}
  
// })
//   .then(response => response.json())
//   .then(data => console.log('Data:', data))
//   .catch(error => console.error('Error:', error));

// const promises = [
//     fetch(proxyUrl),
//     fetch(mainUrl)
//   ];
  
//   Promise.all(promises)
//     .then(results => {
//       // Use `results` here
//       results.forEach((response, index) => {
//         console.log(`Response ${index + 1}:`, response);
//       });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
  


// fetch(mainUrl+proxyUrl)
// .then(response => response.json())
// .then(data => displayData(data))
// .catch(error => console.error('There has been a problem with your fetch operation:', error));

// async function fetchData() {
// // try {
// const proxyUrl = 'http://127.0.0.1:5500/src/main/resources/static.ui/pullupadd.html';  
// const mainUrl = `http://localhost:8080/api/basketball-courts`
// const response = await fetch(mainUrl+proxyUrproxyUrl) 


//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       displayData(data);
// }catch{
//     console.error('There has been a problem with your fetch operation:');

 function displayData(data){
const container = document.getElementById('court-containerID');
container.innerHTML = '';
const div = document.createElement('div');
div.textContent = `Court: ${data.courtName}, State: ${data.state}, Zip: ${data.zipCode}, Address: ${data.street}`;
container.appendChild(div);

}


document.addEventListener('DOMContentLoad', () => {

  const button = document.getElementById('fetch-btn2');
  if(button){
  button.addEventListener('click', () => {console.log('Fetching data...'); listAllCourtsByID();});
  }
  else{console.log('Button not found');}
  });
  
// }
// function displayData(data) {
//   const container = document.getElementById('court-containerID');

//   container.innerHTML = '';

//   data.forEach(court => {
//       const div = document.createElement('div');
//       div.className = 'court-listID';
//       div.textContent = JSON.stringify(court);
//       // div.innerHTML = `<p>ID: ${court.id}</p> <p>Court: ${court.courtName}</p>  <p>State: ${court.state}</p> <p>ZipCode: ${court.zipCode}</p> <p>Address: ${court.street}</p>`;
//       container.appendChild(div);
//   });
// }
// document.addEventListener('DOMContentLoad', () => {

// const button = document.getElementById('fetch-btn2');
// if(button){
// button.addEventListener('click', listAllCourtsByID);
// }
// else{console.log('Button not found');}
// });


// .addEventListener('click',displayData);
// function displayData(data) {
//     const container = document.getElementById('court-container');

//     container.innerHTML = '';

//     data.forEach(court => {
//         const div = document.createElement('div');
//         div.className = 'court-list';
//         // div.textContent = JSON.stringify(court);
//         div.innerHTML = `<p>ID: ${court.id}</p> <p>Court: ${court.courtName}</p>  <p>State: ${court.state}</p> <p>ZipCode: ${court.zipCode}</p> <p>Address: ${court.street}</p>`;
//         container.appendChild(div);
//     });
// }
// }

// fetchData();
// console.log('fetchData has been called');


// async function fetchData() {
//     try {
//         const response = await fetch(`http://localhost:8080/api/basketball-courts`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         const container = document.getElementById('court-container');

//         container.innerHTML = '';

//         data.forEach(court => {
//             const courtList = document.createElement('li');
//             courtList.textContent = 'ID: ${BasketballCourt.id}, Court: ${BasketballCourt.courtName},State: ${BasketballCourt.state} ZipCode: ${BasketballCourt.zipCode}, Address: ${BasketballCourt.streetAddress}, Longitude: ${BasketballCourt.longitude}, Latitude: ${BasketballCourt.latitude}, CourtType: ${BasketballCourt.courtType} Capacity: ${BasketballCourt}';
//             container.appendChild(courtList);
            

        
//     } );
// }
//     catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//     }
// }