// const { disconnect } = require("process");


//  let listAllSavedCourts = fetch('http://localhost:8080/api/user-profiles?eagerload=true', {
//   headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDYxOTY0NCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NTMzMjQ0fQ.AF28OBy4yaQUHj9dX0hVywpzpMB_uTJP4tBsb8CNZdLLosu428AYg99Jt09oaBlVCrTPZlwSgdvthf8En9YhZQ'},
//   'Content-Type': 'application/json'

// })

localStorage.setItem('authToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDYxOTY0NCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NTMzMjQ0fQ.AF28OBy4yaQUHj9dX0hVywpzpMB_uTJP4tBsb8CNZdLLosu428AYg99Jt09oaBlVCrTPZlwSgdvthf8En9YhZQ');
const token = localStorage.getItem('authToken');

fetch('http://localhost:8080/api/user-profiles?eagerload=true', {
  headers: {
    'Authorization': `Bearer ${token}`,
   
  },
})
   .then(resp => resp.json())
   .then(data => displayData(data))
   .then(json => console.log(JSON.stringify(json)))


   function displayData(data) {
    const container = document.getElementById('favcourt-container');
  
    container.innerHTML = '';
  
    data.forEach(court => {
        const div = document.createElement('div');
        // div.className = 'court-list';
        // div.textContent = JSON.stringify(court);
        // div.innerHTML = `<p>ID: ${court.id}</p> <p>Court: ${court.courtName}</p>  <p>State: ${court.state}</p> <p>ZipCode: ${court.zipCode}</p> <p>Address: ${court.street}</p>`;
        // const filterCourt = {
        //   username: court.username,
        //   savedCourt: court.savedCourts

        // };
        // div.innerHTML = `</p>UserName: ${court.username}</p>
        // <p>Saved Courts: ${filterCourt.savedCourt.map(savedCourt => savedCourt.courtName).join(', ')}</p>`;
        const userAndCourt = `${court.username}: ${court.savedCourts.map(savedCourt => savedCourt.courtName).join(', ')}`;
        div.innerHTML = `<p>${userAndCourt}</p>`;
        container.appendChild(div);
    });
  }
// function displayData(data) {
//   const container = document.getElementById('favcourt-container');

//   container.innerHTML = '';

//   data.forEach(court => {
//       const div = document.createElement('div');
//       div.className = 'favcourt-list';
//       div.textContent = `Court: ${data.courtName}, State: ${data.state}, Zip: ${data.zipCode}, Address: ${data.street}`;

//       container.appendChild(div);
//   });
// 
