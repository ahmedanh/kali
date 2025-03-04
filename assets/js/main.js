
document.addEventListener('DOMContentLoaded', function() {
    // Current language - default is Arabic
    let currentLang = 'ar';
    
    // Toggle language function
    function toggleLanguage() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        
        // Update HTML lang and dir attributes
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        
        // Update all elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
        
        // Update language toggle button
        document.getElementById('language-toggle').textContent = translations[currentLang]['lang_switch'];
        
        // Update legal notice
        document.querySelector('.legal-notice').textContent = translations[currentLang]['legal_notice'];
        
        // Re-render tools with new language
        renderTools(getToolsByCategory('all'));
    }
    
    // Attach event to language toggle button
    document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
    
    // Render tools function
    function renderTools(tools) {
        const container = document.getElementById('tools-container');
        container.innerHTML = '';
        
        tools.forEach(tool => {
            const isDangerous = isDangerousTool(tool.danger_level);
            
            const toolElement = document.createElement('div');
            toolElement.className = `tool-card ${isDangerous ? 'dangerous-tool' : ''}`;
            
            // Category tag
            const categoryTag = document.createElement('span');
            categoryTag.className = 'category-tag';
            categoryTag.textContent = tool.category;
            toolElement.appendChild(categoryTag);
            
            // Tool header with name and danger level
            const header = document.createElement('h3');
            header.textContent = tool.tool_name;
            
            const dangerLevel = document.createElement('span');
            dangerLevel.className = 'danger-level';
            dangerLevel.textContent = tool.danger_level;
            header.appendChild(dangerLevel);
            
            toolElement.appendChild(header);
            
            // Description
            const description = document.createElement('p');
            description.textContent = tool.description[currentLang];
            toolElement.appendChild(description);
            
            // Code example
            const codeExample = document.createElement('pre');
            codeExample.className = 'code-example';
            codeExample.textContent = tool.usage_example;
            toolElement.appendChild(codeExample);
            
            // Tool links
            const links = document.createElement('div');
            links.className = 'tool-links';
            
            // Documentation link
            const docsLink = document.createElement('a');
            docsLink.href = tool.official_docs;
            docsLink.className = 'tool-btn';
            docsLink.textContent = translations[currentLang]['documentation'];
            docsLink.target = '_blank';
            links.appendChild(docsLink);
            
            // Tutorial link
            const tutorialLink = document.createElement('a');
            tutorialLink.href = tool.video_tutorial;
            tutorialLink.className = 'tool-btn';
            tutorialLink.textContent = translations[currentLang]['tutorial'];
            tutorialLink.target = '_blank';
            links.appendChild(tutorialLink);
            
            toolElement.appendChild(links);
            
            // PDF export button
            const pdfButton = document.createElement('button');
            pdfButton.className = 'tool-btn pdf-btn';
            pdfButton.textContent = translations[currentLang]['save_as_pdf'];
            pdfButton.addEventListener('click', () => generatePDF(tool));
            toolElement.appendChild(pdfButton);
            
            container.appendChild(toolElement);
        });
    }
    
    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            let tools;
            
            switch(category) {
                case 'network':
                    tools = getToolsByCategory('Network Analysis');
                    break;
                case 'vulnerability':
                    tools = getToolsByCategory('Vulnerability Scanning');
                    break;
                case 'password':
                    tools = getToolsByCategory('Password Cracking');
                    break;
                case 'wireless':
                    tools = getToolsByCategory('Wireless Attacks');
                    break;
                case 'forensic':
                    tools = getToolsByCategory('Forensic Analysis');
                    break;
                default:
                    tools = toolsData;
            }
            
            renderTools(tools);
            
            // Scroll to tools section
            document.querySelector('.featured-tools').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Function to generate PDF for a tool
    function generatePDF(tool) {
        // This would normally use a library like jsPDF
        // For now, let's just show an alert
        alert(`Generating PDF for ${tool.tool_name}`);
        
        // In a real implementation:
        // 1. Create a new jsPDF instance
        // 2. Add tool information
        // 3. Save the PDF with tool name
    }
    
    // Initial render of all tools
    renderTools(toolsData);
    
    // Apply translations on initial load
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Email display animation
    setInterval(() => {
        const emailElement = document.querySelector('.email-display');
        emailElement.style.opacity = emailElement.style.opacity === '1' ? '0' : '1';
    }, 5000);
    
    // Lazy load implementation for performance
    if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // This would load images or other heavy content
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Observe all tool cards
        document.querySelectorAll('.tool-card').forEach(card => {
            lazyLoadObserver.observe(card);
        });
    }
    
    // Cache API implementation for better performance
    if ('caches' in window) {
        // This would cache API responses or static assets
        // Simplified example - not implemented fully here
    }
});
