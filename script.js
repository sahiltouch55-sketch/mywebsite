// ================= USER SIGNUP =================
function signup(){
let user = document.getElementById("signupUser")?.value;
let pass = document.getElementById("signupPass")?.value;

if(!user || !pass){
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
let username = document.getElementById("username")?.value;
let password = document.getElementById("password")?.value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let found = users.find(u => u.username === username && u.password === password);

if(found){
alert("Login Successful");
localStorage.setItem("currentUser", username);
window.location.href = "index.html";
}else{
alert("Invalid Username or Password");
}
}


// ================= USER LOGOUT =================
function logout(){
localStorage.removeItem("currentUser");
window.location.href = "login.html";
}


// ================= ADMIN LOGIN =================
function adminLogin(){
let user = document.getElementById("adminUser")?.value;
let pass = document.getElementById("adminPass")?.value;

if(user === "admin" && pass === "admin123"){
localStorage.setItem("adminLoggedIn","true");
window.location.href = "admin.html";
}else{
alert("Wrong admin credentials");
}
}


// ================= ADMIN LOGOUT =================
function adminLogout(){
localStorage.removeItem("adminLoggedIn");
window.location.href = "login.html";
}


// ================= ADD COMPLAINT (MYSQL) =================

function addComplaint(){

let name = localStorage.getItem("currentUser");
let complaint = document.getElementById("complaint").value;

if(name === "" || complaint === ""){
alert("Fill all fields");
return;
}

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

let newComplaint = {
id: "C" + Math.floor(Math.random()*10000),
name: name,
text: complaint,
status: "Pending",
date: new Date().toLocaleString()
};

complaints.push(newComplaint);

localStorage.setItem("complaints", JSON.stringify(complaints));

alert("Complaint Submitted ✅");

loadComplaints();
}

// ================= LOAD USER COMPLAINTS =================
function loadAdminComplaints(){

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

console.log("ADMIN DATA:", complaints); // debug

let list = document.getElementById("adminComplaintList");
let total = document.getElementById("totalComplaints");

if(!list) return;

list.innerHTML = "";

if(total){
total.innerText = complaints.length;
}

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
// ================= ADMIN LOAD COMPLAINTS =================
function loadAdminComplaints(){

let list = document.getElementById("adminComplaintList");
let total = document.getElementById("totalComplaints");

if(!list) return;

fetch("http://localhost:3000/all")
.then(res => res.json())
.then(data => {

list.innerHTML = "";
if(total) total.innerText = data.length;

data.forEach((c,index)=>{

let tr = document.createElement("tr");

tr.innerHTML =
"<td>"+c.name+"</td>" +
"<td>"+c.text+"</td>" +
"<td>"+c.status+"</td>" +
"<td><button onclick='resolveComplaint("+index+")'>Resolve</button></td>";

list.appendChild(tr);

});

});

}


// ================= RESOLVE COMPLAINT (FRONTEND ONLY) =================
function resolveComplaint(index){
alert("Connect this to backend for real update");
}


// ================= PAGE LOAD =================
window.onload = function(){
loadAdminComplaints();
};
