// --- Initialize AOS (Animate On Scroll) ---
document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) {
        AOS.init({ duration: 600 });
    }
});
// --- EmailJS Contact Form ---
// Replace these with your actual EmailJS values
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Load EmailJS SDK
const emailjsScript = document.createElement('script');
emailjsScript.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
emailjsScript.onload = function() {
    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
};
document.head.appendChild(emailjsScript);

document.addEventListener('DOMContentLoaded', function () {
    // Contact form handler
    const contactForm = document.getElementById('contact-form');
    const toastSuccess = document.getElementById('toast-success');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!window.emailjs) return;
            const formData = {
                from_name: contactForm.name.value,
                reply_to: contactForm.email.value,
                message: contactForm.message.value
            };
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
                .then(function() {
                    contactForm.reset();
                    if (toastSuccess) {
                        toastSuccess.classList.add('show');
                        setTimeout(() => { toastSuccess.classList.remove('show'); }, 4000);
                    }
                })
                .catch(function(error) {
                    alert('Sorry, there was an error sending your message.');
                });
        });
    }

    // --- Enable smooth scrolling for the whole document ---
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', () => {
      const fromTop = window.scrollY + 80;
      document.querySelectorAll('nav a').forEach(link => {
        const section = document.querySelector(link.hash);
        if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
});
// Simple script for portfolio site
console.log('Portfolio site loaded.');

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.navbar ul');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // --- Projects Section ---
    const projects = [
        {
            title: 'Sales Dashboard',
            description: 'Interactive dashboard for sales analytics using Python, SQL, and Power BI. Visualizes KPIs and trends for business decisions.',
            tech: ['Python', 'SQL', 'Power BI'],
            repoLink: 'https://github.com/ashik/sales-dashboard',
            demoLink: 'https://dashboard-demo.com'
        },
        {
            title: 'Customer Segmentation',
            description: 'Clustering customer data to identify segments and personalize marketing. Used Python, scikit-learn, and Tableau.',
            tech: ['Python', 'scikit-learn', 'Tableau'],
            repoLink: 'https://github.com/ashik/customer-segmentation',
            demoLink: 'https://tableau.com/views/customer-segmentation'
        },
        {
            title: 'Retail Inventory Optimizer',
            description: 'Automated inventory optimization for retail chains. SQL, Python, and Excel integration for real-time stock management.',
            tech: ['Python', 'SQL', 'Excel'],
            repoLink: 'https://github.com/ashik/inventory-optimizer',
            demoLink: 'https://inventory-demo.com'
        },
        {
            title: 'Financial Forecasting',
            description: 'Time series forecasting for financial data using Python and Prophet. Generates reports and visualizations for stakeholders.',
            tech: ['Python', 'Prophet'],
            repoLink: 'https://github.com/ashik/financial-forecasting',
            demoLink: 'https://finance-demo.com'
        }
    ];


    // Build the technology filter dropdown
    function buildTechFilter() {
      const select = document.getElementById('techSelect');
      if (!select) return;

      // Grab existing tags from projects array, but exclude 'scikit-learn' and 'Prophet'
      const tags = new Set(['All']);
      projects.forEach(p => p.tech.forEach(t => {
        if (t !== 'scikit-learn' && t !== 'Prophet') tags.add(t);
      }));

      // Clear old options
      select.innerHTML = '';

      // Create option elements
      tags.forEach(tag => {
        const opt = document.createElement('option');
        opt.value = tag;
        opt.textContent = tag;
        select.appendChild(opt);
      });
    }

    buildTechFilter();

    // Render project cards
    // Add data-aos to dynamically created .card elements
    function renderProjects(filter) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;
        grid.innerHTML = '';
        let filtered = projects;
        if (filter && filter !== 'all') {
            filtered = projects.filter(p => p.tech.includes(filter));
        }
        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-aos', 'fade-up');

            const title = document.createElement('div');
            title.className = 'project-title';
            title.textContent = project.title;

            const desc = document.createElement('div');
            desc.className = 'project-desc';
            desc.textContent = project.description.length > 80 ? project.description.slice(0, 77) + '...' : project.description;

            const techList = document.createElement('div');
            techList.className = 'project-tech';
            project.tech.forEach(t => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.textContent = t;
                techList.appendChild(badge);
            });

            const actions = document.createElement('div');
            actions.className = 'project-actions';
            const repoBtn = document.createElement('a');
            repoBtn.className = 'btn secondary';
            repoBtn.href = project.repoLink;
            repoBtn.target = '_blank';
            repoBtn.rel = 'noopener';
            repoBtn.textContent = 'GitHub';
            const demoBtn = document.createElement('a');
            demoBtn.className = 'btn primary';
            demoBtn.href = project.demoLink;
            demoBtn.target = '_blank';
            demoBtn.rel = 'noopener';
            demoBtn.textContent = 'Live Demo';
            actions.appendChild(repoBtn);
            actions.appendChild(demoBtn);

            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(techList);
            card.appendChild(actions);
            grid.appendChild(card);
        });
    }

    document.getElementById('techSelect').addEventListener('change', e => {
      renderProjects(e.target.value);
    });
    renderProjects('all');
});
