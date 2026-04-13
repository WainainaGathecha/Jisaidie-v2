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

// Render featured listings cards
function renderFeaturedListings() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const featured = businesses.filter(b => b.featured === true);

    container.innerHTML = featured.map(b => `
        <a 
            href="listing.html?id=${b.id}"
            class="group border border-border rounded-xl overflow-hidden bg-surface hover:border-accent transition-all duration-200"
        >
            <div class="w-full h-40 bg-surface-muted overflow-hidden">
                <img 
                    src="${b.images[0]}"
                    alt="${b.name}"
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                >
            </div>
            <div class="p-4 flex flex-col gap-2">
                <span class="self-start text-xs font-semibold text-accent bg-accent-hover px-3 py-1 rounded-full">
                    ${b.category}
                </span>
                <h3 class="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors duration-200">
                    ${b.name}
                </h3>
                <p class="text-xs text-text-secondary">${b.address}</p>
                <div class="flex items-center justify-between mt-1">
                    <div class="flex gap-2  flex-wrap">
                        ${b.tags.slice(0, 2).map(tag => `
                            <span class="text-xs text-text-secondary bg-surface-muted px-2 py-0.5 rounded-full">${tag}</span>
                        `).join('')}
                    </div>
                    <a
                        href="https://wa.me/${b.whatsapp}?text=${encodeURIComponent('Hi, I found you on Jisaidie, I\'d like to enquire about your services.')}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="shrink-0 bg-accent hover:bg-accent-hover text-surface text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                        onclick="event.stopPropagation()"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </a>
    `).join('');
}
renderFeaturedListings();