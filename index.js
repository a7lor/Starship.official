function toggleMenu(open) {
    const menu = document.getElementById("menu");
    if (!menu) return;
    if (open) {
        menu.classList.add("active");
    } else {
        menu.classList.remove("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const menu = document.getElementById("menu");

    const slider = document.getElementById("slider");
    const slides = document.querySelectorAll(".slide");


    /* =========================
       ハンバーガーメニュー
    ========================= */

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            toggleMenu(true);
        });
    }

    if (closeButton && menu) {
        closeButton.addEventListener("click", () => {
            toggleMenu(false);
        });
    }

    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleMenu(false);
        });
    });


    /* =========================
       スライダー
    ========================= */

    if (!slider || slides.length === 0) return;

    let currentIndex = 0;
    let timer;


    /* 画像1枚分 + gap の距離を取得 */

    function getSlideDistance() {

        const slideWidth = slides[0].offsetWidth;

        const sliderStyle = window.getComputedStyle(slider);

        const gap = parseFloat(sliderStyle.gap) || 0;

        return slideWidth + gap;
    }


    /* 指定した画像へ移動 */

    function moveToSlide(index) {

        currentIndex = index;

        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }

        slider.scrollTo({
            left: getSlideDistance() * currentIndex,
            behavior: "smooth"
        });
    }


    /* =========================
       5秒ごとの自動スライド
    ========================= */

    function startAutoSlide() {

        clearInterval(timer);

        timer = setInterval(() => {

            moveToSlide(currentIndex + 1);

        }, 5000);
    }


    startAutoSlide();


    /* =========================
       手動スワイプ・ドラッグ
    ========================= */

    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;


    slider.addEventListener("pointerdown", (e) => {

        isDragging = true;

        startX = e.clientX;
        startScrollLeft = slider.scrollLeft;

        slider.setPointerCapture(e.pointerId);

        clearInterval(timer);
    });


    slider.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        const moveX = e.clientX - startX;

        slider.scrollLeft = startScrollLeft - moveX;
    });


    slider.addEventListener("pointerup", () => {

        if (!isDragging) return;

        isDragging = false;

        const distance = getSlideDistance();

        const nearestIndex = Math.round(
            slider.scrollLeft / distance
        );

        moveToSlide(nearestIndex);

        startAutoSlide();
    });


    slider.addEventListener("pointercancel", () => {

        isDragging = false;

        startAutoSlide();
    });


    /* =========================
       画面サイズ変更
    ========================= */

    window.addEventListener("resize", () => {

        moveToSlide(currentIndex);

    });

});
