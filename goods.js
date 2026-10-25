document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("goodsGrid");
    const searchInput = document.getElementById("goodsSearch");
    const stockFilter = document.getElementById("stockFilter");
    const sortOrder = document.getElementById("sortOrder");
    const goodsCount = document.getElementById("goodsCount");
    const noGoods = document.getElementById("noGoods");
    const categoryButtons = document.querySelectorAll(".category-button");

    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".goods-card"));
    let selectedCategory = "all";

    function updateGoods() {
        const keyword = searchInput.value.trim().toLowerCase();
        const status = stockFilter.value;
        const sort = sortOrder.value;

        let visibleCards = cards.filter(card => {
            const category = card.dataset.category;
            const cardStatus = card.dataset.status;
            const name = card.dataset.name.toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesKeyword = name.includes(keyword);

            const matchesStatus =
                status === "all" ||
                cardStatus === status;

            return matchesCategory && matchesKeyword && matchesStatus;
        });

        visibleCards.sort((a, b) => {
            if (sort === "price-low") {
                return Number(a.dataset.price) - Number(b.dataset.price);
            }

            if (sort === "price-high") {
                return Number(b.dataset.price) - Number(a.dataset.price);
            }

            if (sort === "name") {
                return a.dataset.name.localeCompare(b.dataset.name);
            }

            return Number(b.dataset.date) - Number(a.dataset.date);
        });

        cards.forEach(card => {
            card.hidden = true;
        });

        visibleCards.forEach(card => {
            card.hidden = false;
            grid.appendChild(card);
        });

        goodsCount.textContent = visibleCards.length;
        noGoods.hidden = visibleCards.length !== 0;
    }

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;

            categoryButtons.forEach(item => {
                item.classList.toggle("active", item === button);
            });

            updateGoods();
        });
    });

    searchInput.addEventListener("input", updateGoods);
    stockFilter.addEventListener("change", updateGoods);
    sortOrder.addEventListener("change", updateGoods);

    updateGoods();

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

