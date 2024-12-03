localStorage.clear();

document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const hobbies = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value).join(', ');

    const employee = { name, gender, dob, email, phone, hobbies };

    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    displayEmployees();
});

function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    const basicTableBody = document.getElementById('basicTable').querySelector('tbody');
    basicTableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.hobbies}</td>
        `;
        basicTableBody.appendChild(row);
    });

    // Advanced Table = Transpose of Basic Table.
    const transposedData = {
        "Name": employees.map(emp => emp.name),
        "DOB": employees.map(emp => emp.dob),
        "Email": employees.map(emp => emp.email),
        "Phone": employees.map(emp => emp.phone),
        "Gender": employees.map(emp => emp.gender),
        "Hobbies": employees.map(emp => emp.hobbies)
    };

    const advancedTableBody = document.getElementById('advancedTable').querySelector('tbody');
    advancedTableBody.innerHTML = '';

    // Rows for advanced table.
    const fields = ['Name', 'DOB', 'Email', 'Phone', 'Gender', 'Hobbies'];

    fields.forEach(field => {
        const row = document.createElement('tr');

        row.innerHTML = `<td><strong>${field}</strong></td>`;

        transposedData[field].forEach(data => {
            row.innerHTML += `<td>${data}</td>`;
        });

        advancedTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', displayEmployees);
