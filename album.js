document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const menu = document.getElementById("menu");

    // メニューを開く
    menuButton.addEventListener("click", () => {
        menu.classList.add("active");
    });

    // メニューを閉じる
    closeButton.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    // メニュー内のリンクを押したら閉じる
    const menuLinks = document.querySelectorAll(".menu a");

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

});