const form = document.querySelector("form");
const employeeList = document.getElementById("employeeList");
const emailInput = document.getElementById("email");
const photoInput = document.getElementById("photo");

const inputFields = {
  firstName: document.getElementById("firstname"),
  lastName: document.getElementById("lastname"),
  email: emailInput,
  hireDate: document.getElementById("hire_date"),
  photo: photoInput,
};

document.querySelectorAll("input").forEach((input) => {
  input.required = true;
});

function validateEmailDomain(email) {
  const validDomain = "@canada.ca";
  if (email && !email.endsWith(validDomain)) {
    emailInput.setCustomValidity(
      `Please match the requested format.\nOnly ${validDomain} employees can register`
    );
  } else {
    emailInput.setCustomValidity("");
  }
}

emailInput.addEventListener("input", () => {
  validateEmailDomain(emailInput.value);
});

function createEmployeeRow({
  firstName,
  lastName,
  email,
  hireDate,
  photoFile,
}) {
  const photoURL = URL.createObjectURL(photoFile);

  const tr = document.createElement("tr");
  tr.classList.add("employee-row");

  const photoCell = document.createElement("td");
  const img = document.createElement("img");
  img.src = photoURL;
  img.alt = `${firstName} ${lastName}`;
  img.classList.add("employee-photo");
  photoCell.appendChild(img);
  tr.appendChild(photoCell);

  [firstName, lastName, email, hireDate].forEach((text) => {
    const td = document.createElement("td");
    td.textContent = text;
    tr.appendChild(td);
  });

  const actionCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this employee?")) {
      tr.remove();
    }
  });

  actionCell.appendChild(deleteBtn);
  tr.appendChild(actionCell);

  return tr;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const employeeData = {
    firstName: inputFields.firstName.value.trim(),
    lastName: inputFields.lastName.value.trim(),
    email: inputFields.email.value.trim(),
    hireDate: inputFields.hireDate.value,
    photoFile: inputFields.photo.files[0],
  };

  if (!employeeData.photoFile) {
    alert("Please upload a profile photo.");
    return;
  }

  const employeeRow = createEmployeeRow(employeeData);
  employeeList.appendChild(employeeRow);
  form.reset();
});
