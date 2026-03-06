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
function login(){

let user = document.getElementById("loginUser").value;
let pass = document.getElementById("loginPass").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let validUser = users.find(u => u.username === user && u.password === pass);

if(validUser){

localStorage.setItem("loggedInUser", user);
window.location.href = "index.html";

}else{

alert("Invalid credentials");

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

localStorage.setItem("adminLoggedIn", "true");
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


// ================= ADD COMPLAINT =================
function addComplaint(){

let name = document.getElementById("name").value;
let complaint = document.getElementById("complaint").value;

if(name === "" || complaint === ""){
alert("Fill all fields");
return;
}

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

complaints.push({
name:name,
complaint:complaint
});

localStorage.setItem("complaints", JSON.stringify(complaints));

loadComplaints();

}


// ================= LOAD COMPLAINT =================
function loadComplaints(){

let list = document.getElementById("complaintList");

if(!list) return;

let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

list.innerHTML = "";

complaints.forEach((c,index)=>{

let li = document.createElement("li");

li.innerHTML = c.name + ": " + c.complaint +
' <button onclick="deleteComplaint('+index+')">Delete</button>';

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
};

