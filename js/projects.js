// Sample project data (replace with your actual projects)
const projects = [
    {
        title: "Online Gaming Store",
        description: "A gaming store players can buy games",
        image: "images/gaming.png",
        tags: [ "Java", "Html", "CSS", "JS", ],
        demo: "#",
        code: "#",
        category: "web-developing"
    },
    {
        title: "Photography Management System",
        description: "A system photographers can sell their service customers can buy it.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        tags: ["Html", "CSS", "JS", "PHP"],
        demo: "#",
        code: "#",
        category: "web-developing"
    },
  
];

// Display projects
function displayProjects(filter = "all") {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    const filteredProjects = filter === "all" 
        ? projects 
        : projects.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";
        projectCard.setAttribute("data-category", project.category);
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" class="demo">Live Demo</a>
                    <a href="${project.code}" class="code">View Code</a>
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