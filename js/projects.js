// =====================
// Project Data
// =====================
const projects = [
    // ---------- WEB PROJECTS ----------
    {
        title: "Snazzy - Shoe Store",
        description: "MERN e-commerce platform with JWT auth, cart, admin dashboard, and Stripe payments.",
        image: "images/snazzy.jpg",
        tags: ["React", "Node.js", "MongoDB", "MERN stack"],
        code: "https://github.com/BinadaPasandul/snazzy",
        category: "web-dev"
    },
    {
        title: "InkNest - Blogging Platform",
        description: "ASP.NET Core blog with Identity auth, roles, AJAX comments, SMTP email, and Azure deployment.",
        image: "images/inknest.png",
        tags: ["ASP.NET Core", ".NET", "Azure", "Bootstrap"],
        code: "https://github.com/Hansana477/Blog",
        category: "web-dev"
    },
    {
        title: "Online Gaming Store",
        description: "Java MVC web app with JSP/Servlets, user management, and MySQL.",
        image: "images/gaming.png",
        tags: ["Java", "MySQL", "HTML", "CSS"],
        code: "https://github.com/Hansana477/online-gaming-system",
        category: "java"
    },
    {
        title: "Photography Management System",
        description: "PHP-based system for photographer booking, portfolios, and payments.",
        image: "images/photography.png",
        tags: ["PHP", "JavaScript", "MySQL"],
        code: "https://github.com/Hansana477/CaptureEye",
        category: "web-dev"
    },

    // ---------- CV / DATA SCIENCE PROJECTS ----------
    {
        title: "Customer Shopping Behavior Analysis",
        description: "EDA using Python, SQL Server analysis, and Power BI dashboard for customer insights.",
        image: "images/customer.png",
        tags: ["Python", "SQL Server", "Power BI", "Pandas"],
        code: "https://github.com/Hansana477/Customer-Shopping-Behavior-analysis",
        category: "ml-ai"
    },
    {
        title: "SMS Spam Detection System",
        description: "Naive Bayes ML model with 97% accuracy, deployed using Flask.",
        image: "images/spam.jpg",
        tags: ["Python", "Machine Learning", "Flask", "Scikit-learn"],
        code: "https://github.com/Hansana477/sms-spam-detection",
        category: "ml-ai"
    },
    {
        title: "Weather Prediction System",
        description: "ML + full-stack app using Linear Regression and OpenWeatherMap API.",
        image: "images/weather.png",
        tags: ["Python", "Machine Learning", "MongoDB", "Chart.js"],
        code: "https://github.com/Hansana477/Weather-prediction-system",
        category: "ml-ai"
    },
     {
        title: "Face Recognition Attendance System",
        description: "Automated attendance system using real-time face recognition with OpenCV and CSV logging.",
        image: "images/face.png",
        tags: ["Python", "OpenCV", "Machine Learning", "Attendance System"],
        code: "https://github.com/Hansana477/Face-recognition-attendance-system",
        category: "ml-ai"
    }
];

// =====================
// Display Projects
// =====================
function renderProjects(projectList) {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    if (projectList.length === 0) {
        projectsList.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found</h3>
            </div>
        `;
        return;
    }

    projectList.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}"
                     onerror="this.src='https://via.placeholder.com/400x250?text=${encodeURIComponent(project.title)}'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag =>
                        `<span class="tag" data-tag="${tag}">${tag}</span>`
                    ).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.code}" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        projectsList.appendChild(card);
    });
}

// =====================
// Category Filter
// =====================
function filterByCategory(category) {
    if (category === "all") {
        renderProjects(projects);
    } else {
        renderProjects(projects.filter(p => p.category === category));
    }
}

// =====================
// Tag Click Filter
// =====================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
        const tag = e.target.dataset.tag;
        renderProjects(projects.filter(p => p.tags.includes(tag)));
    }
});

// =====================
// Init
// =====================
document.addEventListener("DOMContentLoaded", () => {
    renderProjects(projects);

    document.querySelectorAll(".filter-buttons button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-buttons button")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterByCategory(btn.dataset.filter);
        });
    });
});
