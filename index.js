let userForm = document.getElementById("user-form");
var UserEntries = [];

let errors = [];
const retieveEntries = () => {
  let entries = localStorage.getItem("UserEntries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
const displayEntries = () => {
  let entries = retieveEntries();
  const tbleEntries = entries
     .map((entry) => {
      const nameCell = `<td class='border px-5 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-5 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-5 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-5 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const table = ` <table border=1 align=center>
    <tr>
    <th class='px-4 py-2 '>Name </th>
    <th class='px-4 py-2 '>Email </th>
    <th class='px-4 py-2 '>Password </th>
    <th class='px-4 py-2 '>Dob </th>
    <th class='px-4 py-2 '>Accepted Terms </th>
    </tr>${tbleEntries}
</table>`;
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userinput = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;
  var dob = new Date(userinput);  
  var month_diff = Date.now() - dob.getTime();  
  var age_dt = new Date(month_diff);   
  var year = age_dt.getUTCFullYear();  
  var age = Math.abs(year - 1970);
 
  if (age < 18 || age > 55) {
    document.getElementById("dob").style = "border:1px solid red";
    return alert("Your age must be under 18 and 55 years");
  } else {
    document.getElementById("dob").style = "border:none";

    const entry = {
      name,
      email,
      password,
      dob,
      acceptTerms,
    };
    UserEntries = retieveEntries();
    UserEntries.push(entry);
    localStorage.setItem("UserEntries", JSON.stringify(UserEntries));
    displayEntries();
    userForm.reset();
  }
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
