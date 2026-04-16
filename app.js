
// DATA
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let apps = JSON.parse(localStorage.getItem("apps")) || [];

let dark = localStorage.getItem("dark") === "true";
let lang = localStorage.getItem("lang") || "en";

// APPLY SETTINGS
if(dark) document.body.classList.add("dark");

// NAV
function go(page){
  window.location.href = page;
}

// LOGIN
function login(){
  let u = user.value;
  let p = pass.value;

  if(u==="admin" && p==="1234"){
    window.location.href="dashboard.html";
  } else alert("Wrong");
}

// THEME
function toggleTheme(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

// LANGUAGE
function toggleLang(){
  lang = (lang==="en") ? "ar" : "en";
  localStorage.setItem("lang", lang);
  applyLang();
}

// LANGUAGE TEXT
function applyLang(){

  let isAr = lang==="ar";

  const texts = {
    login: isAr ? "تسجيل الدخول" : "Login",
    doctors: isAr ? "الدكاتره" : "Doctors",
    app: isAr ? "المواعيد" : "Appointments"
  };

  if(document.getElementById("title"))
    title.innerText = texts.login;

  if(document.getElementById("docTitle"))
    docTitle.innerText = texts.doctors;

  if(document.getElementById("appTitle"))
    appTitle.innerText = texts.app;
}

// DOCTORS
function addDoctor(){
  doctors.push({
    name: docName.value,
    spec: docSpec.value
  });

  localStorage.setItem("doctors", JSON.stringify(doctors));
  renderDoctors();
}

function renderDoctors(){
  let t = document.getElementById("docTable");
  if(!t) return;

  t.innerHTML = "";

  doctors.forEach((d,i)=>{
    t.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.spec}</td>
        <td><button onclick="delDoc(${i})">X</button></td>
      </tr>
    `;
  });
}

function delDoc(i){
  doctors.splice(i,1);
  localStorage.setItem("doctors", JSON.stringify(doctors));
  renderDoctors();
}

// APPOINTMENTS
function addApp(){

  let doctorName = document.getElementById("doctorSelect").value;

  apps.push({
    patient: patient.value,
    doctor: doctorName,
    date: date.value
  });

  localStorage.setItem("apps", JSON.stringify(apps));

  renderApps();
}
function renderApps(){
  loadDoctorsToSelect(); // 🔥 أهم سطر

  let t = document.getElementById("appTable");
  if(!t) return;

  t.innerHTML = "";

  apps.forEach((a,i)=>{
    t.innerHTML += `
      <tr>
        <td>${a.patient}</td>
        <td>${a.doctor}</td>
        <td>${a.date}</td>
        <td><button onclick="delApp(${i})">X</button></td>
      </tr>
    `;
  });
}

function delApp(i){
  apps.splice(i,1);
  localStorage.setItem("apps", JSON.stringify(apps));
  renderApps();
}

// INIT
function loadDoctorsToSelect(){
    let select = document.getElementById("doctorSelect");
    if(!select) return;
    
    select.innerHTML = "";
    
    doctors.forEach(d=>{
        select.innerHTML += `<option value="${d.name}">${d.name} - ${d.spec}</option>`;
    });
}
renderDoctors();
renderApps();
applyLang();
renderDoctors?.();
renderApps?.();
loadDoctorsToSelect();