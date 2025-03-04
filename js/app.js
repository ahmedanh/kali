// Global variables
let currentLang = localStorage.getItem('lang') || 'en';
let currentCategory = null;
let toolsData = [];
let translations = {};
let allTools = []; // Added to store all tools data

// Fetch translations
async function loadTranslations() {
    try {
        // Try with different path patterns to handle both server and direct file opening
        let response;
        try {
            response = await fetch('./data/translations.json');
        } catch(e) {
            response = await fetch('../data/translations.json');
        }
        const data = await response.json();
        translations = data;
        updateLanguage(currentLang);
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to basic translations
        translations = {
            'legal_notice': { 
                'en': 'This website is for educational purposes only - all tools belong to their original developers', 
                'ar': 'هذا الموقع لأغراض تعليمية فقط - جميع الأدوات ملك لمطوريها الأصليين'
            },
            'categories': { 
                'en': 'Categories', 
                'ar': 'التصنيفات'
            },
            'documentation': { 
                'en': 'Documentation', 
                'ar': 'التوثيق'
            },
            'search_placeholder': {
                'en': 'Search tools...',
                'ar': 'البحث عن الأدوات...'
            },
            'tools': {
                'en': 'tools',
                'ar': 'أدوات'
            },
            'usage_example': {
                'en': 'Usage Example',
                'ar': 'مثال الاستخدام'
            },
            'all_tools': {
                'en': 'All Tools',
                'ar': 'جميع الأدوات'
            }
        };
    }
}

// Safe translation getter with fallback
function getTranslation(key, lang) {
    try {
        return translations[key]?.[lang] || key;
    } catch (error) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
    }
}

// Update UI language
function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-trans]').forEach(element => {
        const key = element.getAttribute('data-trans');
        element.textContent = getTranslation(key, lang);
    });

    // Update search placeholder
    const searchBox = document.getElementById('searchTools');
    if (searchBox) {
        searchBox.placeholder = getTranslation('search_placeholder', lang);
    }

    // Update category title if a category is selected
    if (currentCategory) {
        document.getElementById('categoryTitle').textContent = currentCategory;
    } else {
        document.getElementById('categoryTitle').textContent = getTranslation('all_tools', lang) || 'All Tools';
    }
}

// Load tools data
async function loadTools() {
    try {
        // Try with different path patterns to handle both server and direct file opening
        let response;
        try {
            response = await fetch('./data/tools.json');
        } catch(e) {
            response = await fetch('../data/tools.json');
        }
        toolsData = await response.json();
        allTools = toolsData; //Added to store all tools data
        displayCategories();
        displayTools(toolsData);
        setupSearch();
    } catch (error) {
        console.error('Error loading tools:', error);
        document.getElementById('toolsList').innerHTML = '<p>Error loading tools data</p>';
    }
}

// Display categories
function displayCategories() {
    const categories = [...new Set(toolsData.map(tool => tool.category))].sort();
    const categoryGrid = document.getElementById('categoryGrid');
    categoryGrid.innerHTML = ''; // Clear existing categories

    // Count tools in each category
    const categoryCounts = {};
    allTools.forEach(tool => {
        if (!categoryCounts[tool.category]) {
            categoryCounts[tool.category] = 0;
        }
        categoryCounts[tool.category]++;
    });

    // Create category cards
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <h3>${category}</h3>
            <p>${categoryCounts[category] || 0} ${getTranslation('tools', currentLang) || 'tools'}</p>
            <i data-feather="chevron-right" class="category-icon"></i>
        `;

        card.addEventListener('click', () => {
            filterToolsByCategory(category);
        });

        categoryGrid.appendChild(card);
    });

    // Initialize feather icons if available
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}


// Display tools
function displayTools(tools) {
    const toolsList = document.getElementById('toolsList');
    toolsList.innerHTML = '';

    tools.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <h3>${tool.tool_name}</h3>
            <p class="description">${tool.description[currentLang] || tool.description.en}</p>
            <div class="category-badge">${tool.category}</div>
        `;

        toolItem.addEventListener('click', () => {
            showToolDetail(tool);
        });

        toolsList.appendChild(toolItem);
    });
}

// Show tool detail popup
function showToolDetail(tool) {
    const toolDetail = document.getElementById('toolDetail');
    const toolDetailContent = document.getElementById('toolDetailContent');

    toolDetailContent.innerHTML = `
        <h2>${tool.tool_name}</h2>
        <div class="description">${tool.description[currentLang] || tool.description.en}</div>
        <h3>${getTranslation('usage_example', currentLang) || 'Usage Example'}</h3>
        <div class="usage">${tool.usage_example}</div>
        <a href="${tool.official_docs}" class="docs" target="_blank">
            ${getTranslation('documentation', currentLang) || 'Documentation'}
        </a>
    `;

    toolDetail.classList.add('active');

    // Close button functionality
    document.querySelector('.close-btn').addEventListener('click', () => {
        toolDetail.classList.remove('active');
    });

    // Close on outside click
    toolDetail.addEventListener('click', (e) => {
        if (e.target === toolDetail) {
            toolDetail.classList.remove('active');
        }
    });
}

// Setup search
function setupSearch() {
    const searchBox = document.getElementById('searchTools');
    searchBox.addEventListener('input', filterTools);
}

// Filter tools based on search and category
function filterTools() {
    const searchTerm = document.getElementById('searchTools').value.toLowerCase();
    let filtered = toolsData;

    // Apply category filter
    if (currentCategory) {
        filtered = filtered.filter(tool => tool.category === currentCategory);
    }

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(tool => 
            tool.tool_name.toLowerCase().includes(searchTerm) ||
            tool.description[currentLang].toLowerCase().includes(searchTerm) ||
            tool.category.toLowerCase().includes(searchTerm)
        );
    }

    displayTools(filtered);
}

// Filter tools by category
function filterToolsByCategory(category) {
    currentCategory = category;
    const filteredTools = allTools.filter(tool => tool.category === category);
    displayTools(filteredTools);

    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = category;

    // Scroll to tools section
    document.querySelector('.tools-container').scrollIntoView({ behavior: 'smooth' });
}

// Language toggle
document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);
    displayTools(toolsData);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load translations first
    loadTranslations().then(() => {
        loadTools();
        setupSearch();
        // Initialize feather icons if available
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }).catch(error => {
        console.error('Error loading translations:', error);
    });
});