
// function listAllCourtsByID (){ fetch('http://localhost:8080/api/user-profiles/2', {
//   headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDY3ODA2MSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NTkxNjYxfQ.M8h_oId_EvPgg8lyVuPDJnt8MZMBezfW4qQGslNUHURTk5CX3Zl02CL04tz2Nggs-CqdaemGeb40Xv3MgWt_2'}
// })
//    .then(resp => resp.json())
//    .then(data => displayData(data))
//    .then(json => console.log(JSON.stringify(json)))}



 function displayData(data){
const container = document.getElementById('profile-containerID');
container.innerHTML = '';
const div = document.createElement('div');
const formatDisplay =` <div>
  <p><strong>Username:</strong> ${data.username}</p>
  <p><strong>Saved Courts: </strong></p>
  <ul>
  <li>${data.savedCourts.map(savedCourt => savedCourt.courtName).join(', ')}</li>
  <ul>
  <div>`;
div.innerHTML = formatDisplay;
// `UserName: ${data.username}, 
// SavedCourts: ${data.savedCourts.map(savedCourt => savedCourt.courtName).join(', ')}`;
container.appendChild(div);
 }

//  function listAllCourtsByID (){ fetch('http://localhost:8080/api/basketball-courts/3', {
//   headers: {Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDQ1Nzk0NywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0MzcxNTQ3fQ.SEHL7om-FnN_7jr_s1fyUG-b9Jd-Umqjen364w4R4JQUeasRlr5JbnUoWOPY_v_hGVV6OD-bR_m0t85EKxStXQ'}
// })
//    .then(resp => resp.json())
//    .then(data => displayData(data))
//    .then(json => console.log(JSON.stringify(json)))}

//    function displayData(data){
//     console.log('data', data);
//     const container = document.getElementById('court-containerID');
//     container.innerHTML = '';
//     const div = document.createElement('div');
//     div.textContent = `Court: ${data.courtName}, State: ${data.state}, Zip: ${data.zipCode}, Address: ${data.street}`;
//     container.appendChild(div);
    
//     }


localStorage.setItem('authToken', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDc2Mzc3OSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0Njc3Mzc5fQ.D6JYzuwZBWMELh3OJNVXnQXeb9Dh0HQ5gS6sFW3d2itKEEoB9bOKG8sVdRrElf5JlJwuYXpOYsa2_ifSdkLOoQ');
const token = localStorage.getItem('authToken');
  


  fetch('http://localhost:8080/api/user-profiles/1', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Fetched Court Data:', data); // Log the fetched court data
    displayData(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
