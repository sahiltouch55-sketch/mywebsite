// Page load hone par complaints load karo
document.addEventListener("DOMContentLoaded", loadComplaints);

function addComplaint() {

    let name = document.getElementById("name").value;
    let complaint = document.getElementById("complaint").value;

    if (name === "" || complaint === "") {
        alert("Please fill all fields");
        return;
    }

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let date = new Date().toLocaleString();

    complaints.push({
        name: name,
        complaint: complaint,
        status: "Pending",
        date: date
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    document.getElementById("name").value = "";
    document.getElementById("complaint").value = "";

    loadComplaints();
}

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push({ name: name, complaint: complaint });

    localStorage.setItem("complaints", JSON.stringify(complaints));

    document.getElementById("name").value = "";
    document.getElementById("complaint").value = "";

    loadComplaints();
}

function loadComplaints() {

    let complaintList = document.getElementById("complaintList");
    if (!complaintList) return;

    complaintList.innerHTML = "";

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    document.getElementById("totalComplaints").innerText = complaints.length;

    complaints.forEach((item, index) => {

        let li = document.createElement("li");

        li.innerHTML =
            "<b>" + item.name + "</b>: " +
            item.complaint +
            " | Status: " + item.status +
            " | Date: " + item.date +
            " <button onclick='resolveComplaint(" + index + ")'>Resolve</button>" +
            " <button onclick='deleteComplaint(" + index + ")'>Delete</button>";

        complaintList.appendChild(li);

    });
}
function deleteComplaint(index) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.splice(index, 1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    loadComplaints();
}
// Signup
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
// Login
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

// Logout
function logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
// Default Admin Account
if (!localStorage.getItem("adminUser")) {
    localStorage.setItem("adminUser", "admin");
    localStorage.setItem("adminPass", "admin123");
}

// Admin Login Function
function adminLogin() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let adminUser = localStorage.getItem("adminUser");
    let adminPass = localStorage.getItem("adminPass");

    if (user === adminUser && pass === adminPass) {
       localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";
    }
}

// Admin Panel Load
document.addEventListener("DOMContentLoaded", function () {
    let adminList = document.getElementById("adminComplaintList");

    if (adminList) {
        adminList.innerHTML = "";
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

        complaints.forEach((item, index) => {
            let li = document.createElement("li");
            li.innerHTML =
                "<b>" + item.name + ":</b> " + item.complaint +
                " <br><button onclick='adminDelete(" + index + ")'>Delete</button>";
            adminList.appendChild(li);
        });
    }
});

// Admin Delete
function adminDelete(index) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.splice(index, 1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    location.reload();
}

// Admin Logout
function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";

}
function loadComplaints() {
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const list = document.getElementById("complaintList");

    if (!list) return;

    list.innerHTML = "";

    complaints.forEach((c, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${c.name}: ${c.complaint}
<button onclick="deleteComplaint(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

window.onload = loadComplaints;

function adminLogout(){
    localStorage.clear()
    window.location.href = "login.html";
}
function resolveComplaint(index) {

    let complaints = JSON.parse(localStorage.getItem("complaints"));

    complaints[index].status = "Resolved";

    localStorage.setItem("complaints", JSON.stringify(complaints));

    loadComplaints();
}
function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
}



















