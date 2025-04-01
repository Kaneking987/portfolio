document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  // Intersection Observer pour apparitions fluides
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stopper l'observation après apparition
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // Dégradé de fond dynamique optimisé avec requestAnimationFrame
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = window.scrollY / maxScroll;

    let bgColor;
    if (scrollRatio < 0.5) {
      const factor = scrollRatio / 0.5;
      bgColor = `rgb(${10 + factor * 70}, ${10 + factor * 70}, ${35 + factor * 45})`;
    } else {
      const factor = (scrollRatio - 0.5) / 0.5;
      const value = 80 - factor * 80;
      bgColor = `rgb(${value}, ${value}, ${value})`;
    }
    
    document.body.style.background = bgColor;
    lastScrollY = window.scrollY;
  };

  window.addEventListener("scroll", () => {
    if (Math.abs(window.scrollY - lastScrollY) > 5) {
      requestAnimationFrame(handleScroll);
    }
  });
});
