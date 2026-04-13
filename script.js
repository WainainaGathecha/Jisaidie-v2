// shared interaction code
// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
})

// Render Categories
function renderCategories() {
    const container = document.getElementById('category-grid');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <a
            href="search.html?category=${cat.slug}"
            class="category-card group border border-border rounded-xl flex flex-col items-center justify-center bg-surface gap-2 py-6 px-4 transition-all duration-200 hover:bg-surface-muted"
        >
            <div class="bg-surface-muted group-hover:bg-bg w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200">
                <i data-lucide="${cat.icon}" class="w-5 h-5 text-text-primary font-medium text-center transition-colors duration-200"></i>
            </div>
            <span class="text-xs text-text-secondary group-hover:text-text-primary font-medium text-center transition-colors duration-200">
                ${cat.label}
            </span>
        </a>
    `).join('');

    lucide.createIcons();
}

renderCategories();