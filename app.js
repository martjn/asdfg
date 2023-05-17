// set copyright year to current year
const el = document.getElementById('copyright-year');
const year = new Date().getFullYear();
if(el){
  el.innerHTML = year;
}

//

// navbar button change event
const navBtn = document.querySelector('.navbar-toggler');
let navBtnState = false;

const handleNavBtnState = () => {
  if(navBtnState === false){
    navBtn.childNodes[1].classList.remove('fa-bars');
    navBtn.childNodes[1].classList.add('fa-xmark');
    navBtnState = true;
  }
  else {
    navBtn.childNodes[1].classList.add('fa-bars');
    navBtn.childNodes[1].classList.remove('fa-xmark');
    navBtnState = false;
  }
}

navBtn.addEventListener('click', handleNavBtnState);
//

// mobile view: display scroll to top button when scrolled down
window.onscroll = () => {scrollFunction()};

const scrollFunction = () => {
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;

  if (window.scrollY !== 0 && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
    document.getElementById("bot-scroll-up-btn").style.setProperty("display", "block", "important");
  } else {
    document.getElementById("bot-scroll-up-btn").style.setProperty("display", "none", "important");
  }
  if(documentHeight < windowHeight){
    document.getElementById("bot-scroll-up-btn").style.setProperty("display", "none", "important");
  }
}

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Mobile view: move button elements up on scroll-to-bottom
window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY;
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;
  let bottomOffset = documentHeight - (scrollPosition + windowHeight);

  if (bottomOffset <= 0 && documentHeight > windowHeight) {
    document.querySelector(".bot-btn").classList.add("scrolled-up");
  } else {
    document.querySelector(".bot-btn").classList.remove("scrolled-up");
  }
});

//
document.addEventListener('DOMContentLoaded', scrollFunction);