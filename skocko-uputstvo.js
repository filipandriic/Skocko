function GoToSettings() {
    let pa1 = document.getElementById("playerAccept1");
    let pa2 = document.getElementById("playerAccept2");

    if (pa1.checked && pa2.checked) {
        pa1.checked = false;
        pa2.checked = false;
        window.location.href = "skocko-podesavanja.html";
    }
}