const projects = [
    {
        title: "T20 World Cup 2026 Match Predictor",
        description: "Agentic AI cricket prediction system with LangChain, LangGraph, Flask, Groq API, and real-time sports data integration.",
        image: "images/t20.jpg",
        tags: ["Python", "LangChain", "LangGraph", "Flask", "Groq API"],
        code: "https://github.com/Hansana477/t20predictor",
        category: "ml-ai"
    },
    {
        title: "Pet Identifier & Care Assistant",
        description: "Dog breed classifier and retrieval-augmented care assistant using PyTorch, EfficientNet, Gradio, LangChain, LangGraph, and ChromaDB.",
        image: "images/pet.png",
        tags: ["Python", "PyTorch", "EfficientNet", "LangChain", "RAG"],
        code: "https://github.com/Hansana477/pet-identifier",
        category: "ml-ai"
    },
    {
        title: "Snazzy Shoe Store",
        description: "MERN e-commerce platform with authentication, cart flows, admin tools, and Stripe payments.",
        image: "images/snazzy.jpg",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        code: "https://github.com/BinadaPasandul/snazzy",
        category: "web-dev"
    },
    {
        title: "InkNest Blogging Platform",
        description: "ASP.NET Core blog with identity, role management, AJAX comments, SMTP email, and Azure deployment.",
        image: "images/inknest.png",
        tags: ["ASP.NET Core", ".NET", "Azure", "Bootstrap"],
        code: "https://github.com/Hansana477/Blog",
        category: "web-dev"
    },
    {
        title: "Online Gaming Store",
        description: "Java MVC web application using JSP/Servlets, user management, and MySQL-backed product handling.",
        image: "images/gaming.png",
        tags: ["Java", "MySQL", "HTML", "CSS"],
        code: "https://github.com/Hansana477/online-gaming-system",
        category: "java"
    },
    {
        title: "Photography Management System",
        description: "PHP platform for photographer bookings, portfolio presentation, and payment-related workflows.",
        image: "images/photography.png",
        tags: ["PHP", "JavaScript", "MySQL"],
        code: "https://github.com/Hansana477/CaptureEye",
        category: "web-dev"
    },
    {
        title: "Customer Shopping Behavior Analysis",
        description: "End-to-end analysis workflow with Python, SQL Server, and Power BI for customer insight discovery.",
        image: "images/customer.png",
        tags: ["Python", "SQL Server", "Power BI", "Pandas"],
        code: "https://github.com/Hansana477/Customer-Shopping-Behavior-analysis",
        category: "ml-ai"
    },
    {
        title: "SMS Spam Detection System",
        description: "Machine learning model with Flask deployment for classifying spam messages with high accuracy.",
        image: "images/spam.jpg",
        tags: ["Python", "Machine Learning", "Flask", "Scikit-learn"],
        code: "https://github.com/Hansana477/sms-spam-detection",
        category: "ml-ai"
    },
    {
        title: "Weather Prediction System",
        description: "Prediction and visualization app powered by machine learning, MongoDB, and OpenWeatherMap data.",
        image: "images/weather.png",
        tags: ["Python", "Machine Learning", "MongoDB", "Chart.js"],
        code: "https://github.com/Hansana477/Weather-prediction-system",
        category: "ml-ai"
    },
    {
        title: "Face Recognition Attendance System",
        description: "Real-time attendance system using computer vision, OpenCV, and CSV-based logging automation.",
        image: "images/face.png",
        tags: ["Python", "OpenCV", "Machine Learning", "Automation"],
        code: "https://github.com/Hansana477/Face-recognition-attendance-system",
        category: "ml-ai"
    }
];

const categoryLabels = {
    "ml-ai": "ML / Data Science",
    "web-dev": "Web Development",
    "java": "Java"
};

function renderProjects(projectList) {
    const projectsList = document.getElementById("projects-list");

    if (!projectsList) {
        return;
    }

    projectsList.innerHTML = "";

    if (!projectList.length) {
        projectsList.innerHTML = `
            <article class="panel no-projects">
                <h3>No projects found</h3>
                <p>Try switching filters to explore more of the portfolio.</p>
            </article>
        `;
        return;
    }

    projectList.forEach((project, index) => {
        const card = document.createElement("article");
        card.className = "project-card";
        card.setAttribute("data-tilt", "");
        card.dataset.tiltStrength = "10";
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title} preview" loading="lazy">
            <div class="project-meta">
                <span class="project-category">${categoryLabels[project.category] || project.category}</span>
                <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="project-copy">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-tags">
                ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <a class="project-link" href="${project.code}" target="_blank" rel="noreferrer">
                <i class="fab fa-github"></i>
                View Code
            </a>
        `;
        projectsList.appendChild(card);
    });

    window.initializeTiltCards?.();
}

function filterByCategory(category) {
    if (category === "all") {
        renderProjects(projects);
        return;
    }

    renderProjects(projects.filter((project) => project.category === category));
}

document.addEventListener("DOMContentLoaded", () => {
    renderProjects(projects);

    document.querySelectorAll(".filter-buttons button").forEach((button) => {
        button.addEventListener("click", () => {
            document
                .querySelectorAll(".filter-buttons button")
                .forEach((item) => item.classList.remove("active"));

            button.classList.add("active");
            filterByCategory(button.dataset.filter);
        });
    });
});
