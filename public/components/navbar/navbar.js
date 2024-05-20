document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('nav a');
    console.log(links);
    var currentPath = window.location.pathname;
    console.log(currentPath);

    links.forEach(link => {
        if(link.getAttribute('href') === "../../" + currentPath) {
            link.classList.add('active');
        }
    });
});

