// Project data
const projects = [
    {
        title: "Online Gaming Store",
        description: "A gaming store where players can buy games online with user authentication, shopping cart, and payment integration.",
        image: "images/gaming.png",
        tags: ["Java", "HTML", "CSS", "JavaScript", "MySQL"],
        code: "https://github.com/Hansana477/online-gaming-system",
        category: "web-dev"
    },
    {
        title: "Photography Management System",
        description: "A system where photographers can sell their services and customers can book sessions, view portfolios, and make payments.",
        image: "images/photography.png",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        code: "https://github.com/Hansana477/CaptureEye",
        category: "web-dev"
    },
    {
        title: "Wellness Tracker",
        description: "An Android habit tracking app built with Kotlin that helps users build positive habits. Features include daily tracking, progress visualization with charts, reminders, achievement badges, and local data storage using Room Database.",
        image: "images/wellnesstrack.png",
        tags: ["Kotlin", "Android", "Room Database", "Material Design", "MVVM", "Coroutines"],
        code: "https://github.com/hansana-samaraweera/wellness-tracker",
        category: "kotlin"
    },
    {
        title: "Snazzy- Shoe Store",
        description: "A E-commerce store that allows users to browse and purchase shoes online with user authentication, shopping cart, and payment integration.",
        image: "images/snazzy.jpg",
        tags: ["React", "Node.js", "MongoDB", "MERN stack"],
        code: "https://github.com/BinadaPasandul/snazzy",
        category: "web-dev`"
    }
];

// Display projects
function displayProjects(filter = "all") {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    const filteredProjects = filter === "all" 
        ? projects 
        : projects.filter(project => project.category === filter);

    if (filteredProjects.length === 0) {
        projectsList.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found in this category</h3>
                <p>Check back soon for new projects!</p>
            </div>
        `;
        return;
    }

    filteredProjects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.setAttribute("data-category", project.category);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/400x250/7F52FF/ffffff?text=${encodeURIComponent(project.title)}';">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.code}" class="code" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;
        
        projectsList.appendChild(projectCard);
    });
}

// Filter projects
document.addEventListener("DOMContentLoaded", () => {
    displayProjects();
    
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            displayProjects(button.dataset.filter);
        });
    });
});