// const { disconnect } = require("process");


 let listAllSavedCourts = fetch('http://localhost:8080/api/user-profiles?eagerload=true', {
  headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDUzMDc2MCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NDQ0MzYwfQ.8lU7-4Tqp-XeltrWyOdKidQoSoy79cuN6Kflc5p3uRY4VhrCOMKC8gx2OROVk-7JPfFZ-S5VEW_9NJxXL83KQA'}
})
   .then(resp => resp.json())
   .then(data => displayData(data))
   .then(json => console.log(JSON.stringify(json)))




function displayData(data) {
  const container = document.getElementById('favcourt-container');

  container.innerHTML = '';

  data.forEach(court => {
      const div = document.createElement('div');
      div.className = 'favcourt-list';
      div.textContent = `Court: ${data.courtName}, State: ${data.state}, Zip: ${data.zipCode}, Address: ${data.street}`;

      container.appendChild(div);
  });
}
