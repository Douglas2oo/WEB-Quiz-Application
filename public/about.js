var slideIndex1 = 0;
var slideIndex2 = 0;
var slideIndex3 = 0;


function showSlides1() {
    var i;
    var slides = document.getElementsByClassName("mySlides1");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex1++;
    if (slideIndex1 > slides.length) { slideIndex1 = 1; }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex1 - 1].style.display = "block";
    dots[slideIndex1 - 1].className += " active";
    setTimeout(showSlides1, 3000); // The switchover time is 3 seconds
}

function showSlides2() {
    var i;
    var slides = document.getElementsByClassName("mySlides2");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex2++;
    if (slideIndex2 > slides.length) { slideIndex2 = 1; }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex2 - 1].style.display = "block";
    dots[slideIndex2 - 1].className += " active";
    setTimeout(showSlides2, 3000); // The switchover time is 3 seconds
}

function showSlides3() {
    var i;
    var slides = document.getElementsByClassName("mySlides3");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex3++;
    if (slideIndex3 > slides.length) { slideIndex3 = 1; }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex3 - 1].style.display = "block";
    dots[slideIndex3 - 1].className += " active";
    setTimeout(showSlides3, 3000); // The switchover time is 3 seconds
}

showSlides1();
showSlides2();
showSlides3();