// ===========================
// KAMTARY PROPERTY - MAIN JS
// ===========================

// Page Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

// Language Switcher
const translations = {
  id: {
    'nav-home': 'Beranda',
    'nav-properties': 'Properti',
    'nav-about': 'Tentang',
    'nav-articles': 'Artikel',
    'nav-contact': 'Kontak',
    'nav-cta': 'Konsultasi Gratis',
    'hero-tag': 'Properti Premium Indonesia',
    'hero-title-1': 'Temukan Hunian',
    'hero-title-2': 'Impian Anda',
    'hero-desc': 'Platform properti enterprise terpercaya dengan portofolio eksklusif di lokasi-lokasi strategis Indonesia.',
    'btn-explore': 'Jelajahi Properti',
    'btn-consult': 'Konsultasi Sekarang',
    'stats-properties': 'Properti Terjual',
    'stats-clients': 'Klien Puas',
    'stats-years': 'Tahun Pengalaman',
    'stats-areas': 'Area Cakupan',
    'section-featured': 'Properti Unggulan',
    'section-featured-title': 'Koleksi Properti',
    'section-featured-sub': 'Temukan properti eksklusif pilihan kami yang dirancang untuk memenuhi standar kehidupan premium Anda.',
  },
  en: {
    'nav-home': 'Home',
    'nav-properties': 'Properties',
    'nav-about': 'About',
    'nav-articles': 'Articles',
    'nav-contact': 'Contact',
    'nav-cta': 'Free Consultation',
    'hero-tag': 'Premium Indonesian Property',
    'hero-title-1': 'Discover Your',
    'hero-title-2': 'Dream Home',
    'hero-desc': 'Trusted enterprise property platform with an exclusive portfolio in Indonesia\'s most strategic locations.',
    'btn-explore': 'Explore Properties',
    'btn-consult': 'Consult Now',
    'stats-properties': 'Properties Sold',
    'stats-clients': 'Happy Clients',
    'stats-years': 'Years Experience',
    'stats-areas': 'Coverage Areas',
    'section-featured': 'Featured Properties',
    'section-featured-title': 'Property Collection',
    'section-featured-sub': 'Discover our handpicked exclusive properties designed to meet your premium living standards.',
  }
};

let currentLang = localStorage.getItem('kamtary_lang') || 'id';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kamtary_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Init language
document.addEventListener('DOMContentLoaded', () => setLanguage(currentLang));

// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = index;
  if (slides[index]) slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
}

dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

if (slides.length > 0) {
  goToSlide(0);
  setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5500);
}

// Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Counter Animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Reading Progress Bar
const progressBar = document.getElementById('readingProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / total * 100) + '%';
  });
}

// Gallery Lightbox
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const galleryMain = document.getElementById('galleryMain');
if (galleryMain) {
  galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      galleryThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      galleryMain.style.opacity = '0';
      setTimeout(() => {
        galleryMain.src = thumb.src;
        galleryMain.style.opacity = '1';
      }, 200);
    });
  });
}

// Smooth Scroll CTA
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact Form with WhatsApp
const contactForms = document.querySelectorAll('.contact-form-js, .sidebar-contact-form');
contactForms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || '';
    const msg = form.querySelector('[name="message"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const waNumber = '6281234567890';
    const defaultMsg = `Halo Kamtary Property, saya ${name} tertarik dengan properti yang Anda tawarkan. ${msg} Nomor saya: ${phone}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  });
});

// Fade-in per paragraph on scroll (article)
document.querySelectorAll('.article-para').forEach(p => observer.observe(p));

// Map animation buttons
document.querySelectorAll('.map-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const mapFrame = document.getElementById('propertyMap');
    if (mapFrame) {
      mapFrame.style.transform = 'scale(1.02)';
      mapFrame.style.transition = 'transform 0.6s ease';
      setTimeout(() => mapFrame.style.transform = 'scale(1)', 600);
    }
  });
});
