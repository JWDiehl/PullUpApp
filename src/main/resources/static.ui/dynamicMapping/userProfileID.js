
function listAllCourtsByID (){ fetch('http://localhost:8080/api/user-profiles/2', {
  headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDU4NDk1OCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NDk4NTU4fQ.G01iGMhRVInuLVR6coV1eXr0EmE27YXZwxn32lAKlKbD9PlPA5KabVHN1amZ0Xk3DIs7ppz2rqXTSQBVxlzYgQ'}
})
   .then(resp => resp.json())
   .then(data => displayData(data))
   .then(json => console.log(JSON.stringify(json)))}



 function displayData(data){
const container = document.getElementById('profile-containerID');
container.innerHTML = '';
const div = document.createElement('div');
div.textContent = `UserName: ${data.username}, Email: ${data.email}`;
container.appendChild(div);
 }

// console.log('yo');
// let listAllCourts = fetch('http://localhost:8080/api/basketball-courts', {
//   headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDI4OTI4MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0MjAyODgyfQ.HDzJKYkk3nE1LzxwVYgRnJlFQKCBPUDxtapBd909XAUFMdjLtib8exRjLIBkKxcPuQ0rH7lTONWRSUE48pel2g'}
// })
//    .then(resp => resp.json())
//    .then(data => displayData(data))
//    .then(json => console.log(JSON.stringify(json)))


// function displayData(data) {
//   const container = document.getElementById('court-container');

//   container.innerHTML = '';

//   data.forEach(court => {
//       const div = document.createElement('div');
//       div.className = 'court-list';
//       div.textContent = JSON.stringify(court);
//       container.appendChild(div);
//   });
// }