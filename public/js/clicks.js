let singInNav = document.getElementById("singInNav");
let physicalRegNav = document.getElementById("physicalRegNav");
let companyRegNav = document.getElementById('companyRegNav');

let singInBox = document.getElementById("singInBox");
let physicalPersReg = document.getElementById("physicalPersReg");
let compReg = document.getElementById("compReg");

singInNav.onclick = () => {
    singInBox.style.display = "flex";
    physicalPersReg.style.display = "none";
    compReg.style.display = "none";
}

physicalRegNav.onclick = () => {
    singInBox.style.display = "none";
    physicalPersReg.style.display = "flex";
    compReg.style.display = "none";
}

companyRegNav.onclick = () => {
    singInBox.style.display = "none";
    physicalPersReg.style.display = "none";
    compReg.style.display = "flex";
}