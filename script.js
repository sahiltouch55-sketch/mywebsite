// ================= USER SIGNUP =================
function signup(){

let user = document.getElementById("signupUser").value;
let pass = document.getElementById("signupPass").value;

if(user === "" || pass === ""){
alert("Fill all fields");
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({
username: user,
password: pass
});

localStorage.setItem("users", JSON.stringify(users));

alert("Signup successful");
window.location.href = "login.html";

}


// ================= USER LOGIN =================
function loginUser(){

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let found = users.find(u => u.username === username && u.password === password);

if(found){
alert("Login Successful");

localStorage.setItem("currentUser", username);

window.location.href = "index.html";
}
else{
alert("Invalid Username or Password");
}

}
// ================= USER LOGOUT =================
function logout(){

localStorage.removeItem("loggedInUser");
window.location.href = "login.html";

}


// ================= ADMIN LOGIN =================
function adminLogin(){

let user = document.getElementById("adminUser").value;
let pass = document.getElementById("adminPass").value;

if(user === "admin" && pass === "admin123"){

localStorage.setItem("adminLoggedIn","true");
window.location.href = "admin.html";

} else {

alert("Wrong admin credentials");

}

}


// ================= ADMIN LOGOUT =================
function adminLogout(){

localStorage.removeItem("adminLoggedIn");
window.location.href = "login.html";

}


// ================= ADD COMPLAINT =================
function addComplaint(){

let name = document.getElementById("name").value;
let complaint = document.getElementById("complaint").value;

if(name === "" || complaint === ""){
alert("Fill all fields");
return;
}

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  let complaintId = "C" + Math.floor(Math.random()*10000);
  let date = new Date().toLocaleString();
complaints.push({
  id:complaintld,
name:name,
text:complaint,
  status:"Pending",
  date:date
});

localStorage.setItem("complaints", JSON.stringify(complaints));

loadComplaints();

}


// ================= LOAD COMPLAINT =================
function loadComplaints(){

let list = document.getElementById("complaintList");

if(!list) return;

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
let currentUser = localStorage.getItem("currentUser");
list.innerHTML = "";

complaints.filter(c => c.name === currentUser).forEach((c)=>{
let li = document.createElement("li");

li.innerText =
c.id + " | " +
c.name + " | " +
c.text + " | " +
c.status + " | " +
c.date;

list.appendChild(li);

});

}


// ================= DELETE COMPLAINT =================
function deleteComplaint(index){

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

complaints.splice(index,1);

localStorage.setItem("complaints", JSON.stringify(complaints));

loadComplaints();

}


// ================= PAGE LOAD =================
window.onload = function(){

  loadComplaints();
loadAdminComplaints();
  
};
function loadAdminComplaints(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

let list = document.getElementById("adminComplaintList");
let total = document.getElementById("totalComplaints");

if(!list) return;

list.innerHTML = "";
total.innerText = complaints.length;

complaints.forEach((c,index)=>{

let li = document.createElement("li");

li.innerHTML = c.name + ": " + c.text;

list.appendChild(li);

});

}
// ================= ADMIN LOAD COMPLAINTS =================

function loadAdminComplaints(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

let list = document.getElementById("adminComplaintList");
let total = document.getElementById("totalComplaints");

if(!list) return;

list.innerHTML = "";
total.innerText = complaints.length;

complaints.forEach((c,index)=>{

let tr = document.createElement("tr");

tr.innerHTML =
"<td>"+c.name+"</td>" +
"<td>"+c.text+"</td>" +
"<td>"+c.status+"</td>" +
"<td><button onclick='resolveComplaint("+index+")'>Resolve</button></td>";

list.appendChild(tr);

});
}
function resolveComplaint(index){

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

complaints[index].status = "Resolved";

localStorage.setItem("complaints", JSON.stringify(complaints));

loadAdminComplaints();

}













