document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, {
    threshold: 0.2
  });

  // Select multiple elements directly without changing HTML
  const targets = [
    document.querySelector('.about-card'),
    document.querySelector('.projects-section'),
    document.querySelector('.certification-section'),
    document.querySelector('.contact-section')
  ];

  targets.forEach(el => {
    if (el) {
      observer.observe(el);
    } else {
      console.warn("⚠️ Element not found for animation:", el);
    }
  });
});

function openModal(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = img.src;
  modal.classList.add("show");
}

function closeModal(event) {
  const modal = document.getElementById("imageModal");
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal-close")
  ) {
    modal.classList.remove("show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  // Toggle mobile menu
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  // Close mobile menu on click inside menu (links)
  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      navItems.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Close menu if clicking outside
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("show") && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  });

  // Scroll spy function
  const updateActiveLink = () => {
    let scrollPos = window.scrollY + 100;
    let foundActive = false;

    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
            foundActive = true;
          }
        });
      }
    });

    // If at the bottom, keep #contact active
    if (!foundActive && window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      navItems.forEach(link => link.classList.remove("active"));
      const contactLink = document.querySelector('.nav-links a[href="#contact"]');
      if (contactLink) contactLink.classList.add("active");
    }
  };

  // Run on scroll
  window.addEventListener("scroll", updateActiveLink);

  // ✅ Run once on page load to set the correct active link after refresh
  updateActiveLink();
});

 