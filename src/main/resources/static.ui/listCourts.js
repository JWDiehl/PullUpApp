const { disconnect } = require("process");

async function fetchData() {
try {
const proxyUrl = 'http://127.0.0.1:5500/src/main/resources/static.ui/pullupadd.html';  
const mainUrl = `http://localhost:8080/api/basketball-courts`
const response = await fetch(proxyUrl + mainUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayData(data);
}catch{
    console.error('There has been a problem with your fetch operation:', error);
  
}

function displayData(data) {
    const container = document.getElementById('court-container');

    container.innerHTML = '';

    data.forEach(court => {
        const div = document.createElement('div');
        div.className = 'court-list';
        // div.textContent = JSON.stringify(court);
        div.innerHTML = `<p>ID: ${court.id}</p> <p>Court: ${court.courtName}</p>  <p>State: ${court.state}</p> <p>ZipCode: ${court.zipCode}</p> <p>Address: ${court.street}</p>`;
        container.appendChild(div);
    });
}
}

fetchData();
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