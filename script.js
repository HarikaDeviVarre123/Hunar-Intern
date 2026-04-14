const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = (followerX - 16) + 'px';
  cursorFollower.style.top = (followerY - 16) + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursorFollower.style.transform = 'scale(1.5)';
    cursorFollower.style.borderColor = 'rgba(232,255,71,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
    cursorFollower.style.borderColor = 'rgba(232,255,71,0.4)';
  });
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (targetEl) smoothScrollTo(targetEl);
    document.getElementById('navLinks').classList.remove('open');
  });
});

function smoothScrollTo(target) {
  const navHeight = navbar.offsetHeight;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 900;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const ease = easeInOutCubic(Math.min(progress / duration, 1));
    window.scrollTo(0, startPosition + distance * ease);
    if (progress < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 60;
    if (window.scrollY >= sectionTop) current = '#' + section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) navLinksMenu.classList.remove('open');
});

const typedEl = document.getElementById('typed-text');
const phrases = ['Python.', 'Web Dev.', 'Problem Solving.', 'Data Analytics.', 'Building Things.'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1200);

document.querySelectorAll('.view-details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const detailsEl = document.getElementById(targetId);
    const isOpen = detailsEl.classList.toggle('open');
    const btnText = btn.querySelector('span');
    const btnIcon = btn.querySelector('i');
    btnText.textContent = isOpen ? 'Hide Details' : 'View Details';
    btnIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    btn.style.background = isOpen ? 'var(--accent2)' : '';
    btn.style.color = isOpen ? 'white' : '';
    btn.style.borderColor = isOpen ? 'var(--accent2)' : '';
  });
});

const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');
const cards = document.querySelectorAll('.project-card');
let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const totalSlides = Math.ceil(cards.length / getCardsPerView());
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  const cpv = getCardsPerView();
  const cardWidth = cards[0].offsetWidth;
  const gap = 24;
  const offset = currentIndex * (cardWidth + gap) * cpv;
  sliderTrack.style.transform = `translateX(-${offset}px)`;
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  const totalSlides = Math.ceil(cards.length / getCardsPerView());
  currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
  updateSlider();
}

nextBtn.addEventListener('click', () => {
  const totalSlides = Math.ceil(cards.length / getCardsPerView());
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  const totalSlides = Math.ceil(cards.length / getCardsPerView());
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

let autoSlide = setInterval(() => {
  const totalSlides = Math.ceil(cards.length / getCardsPerView());
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}, 4000);

sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
sliderTrack.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    const totalSlides = Math.ceil(cards.length / getCardsPerView());
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 4000);
});

let touchStartX = 0;
sliderTrack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
sliderTrack.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextBtn.click();
    else prevBtn.click();
  }
});

window.addEventListener('resize', () => {
  buildDots();
  currentIndex = 0;
  updateSlider();
});

buildDots();

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1500);
});

const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.getAttribute('data-delay')) || 0;
      setTimeout(() => {
        card.classList.add('visible');
        const fill = card.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.getAttribute('data-width') + '%';
      }, delay);
      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(card => skillObserver.observe(card));

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(document.getElementById('home'));
  });
}