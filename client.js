document.addEventListener('DOMContentLoaded', fetchData);
const baseUrl='http://tmcqdpu3366:3000'

async function fetchData() {
  try {
    // const response = await fetch('/data');
    const response = await fetch(baseUrl+'/data');
    const data = await response.json();

    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.LocationID}</td>
        <td>${item.Category}</td>
        // <td>${item.age}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}
