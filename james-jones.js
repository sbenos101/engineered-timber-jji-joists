document.addEventListener("DOMContentLoaded", () => {

  const fadeLeftItems = document.querySelectorAll(".james-jones-text-fade-left");
  const fadeLeftObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(fadeLeftItems).indexOf(entry.target);
        entry.target.style.animationDelay = `${index * 0.15}s`;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeLeftItems.forEach(el => fadeLeftObserver.observe(el));

  const fadeTopItems = document.querySelectorAll(".jji-joist-fade-from-top");
  const fadeTopObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fadeTopItems.forEach(el => fadeTopObserver.observe(el));

  const logoStroke = document.querySelector(".james-jones-logo .svg-text-stroke");
  const videoWrapper = document.querySelector(".video-responsive");
  let logoIntervalRun = false;
  const mainObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains('svg-text-stroke') && !logoIntervalRun) {
        let currentLogo = entry.target;
        const runLogoAnimation = () => {
          const newLogo = currentLogo.cloneNode(true);
          newLogo.classList.add("animate");
          currentLogo.parentNode.replaceChild(newLogo, currentLogo);
          currentLogo = newLogo;
        };
        runLogoAnimation();
        setInterval(runLogoAnimation, 8000);
        logoIntervalRun = true;
      }
      if (entry.target === videoWrapper) {
        videoWrapper.classList.add("visible");
        obs.unobserve(videoWrapper);
      }
      if (!entry.target.classList.contains('svg-text-stroke') && entry.target !== videoWrapper) {
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  if (logoStroke) mainObserver.observe(logoStroke);
  if (videoWrapper) mainObserver.observe(videoWrapper);

  const logoIcons = document.querySelectorAll(".james-jones-logo-icon-only");
  if (logoIcons.length > 0) {
    const iconObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    logoIcons.forEach(icon => iconObserver.observe(icon));
  }

  const readMoreBtns = document.querySelectorAll('.read-more-read-less-jji-joist-button');
  readMoreBtns.forEach(btn => {
    const fadeContainer = btn.previousElementSibling;
    if (fadeContainer && (
      fadeContainer.classList.contains('jji-joist-fade-container') ||
      fadeContainer.classList.contains('jji-joist-availability-fade-container')
    )) {
      btn.addEventListener("click", () => {
        fadeContainer.classList.toggle("expanded");
        btn.textContent = fadeContainer.classList.contains("expanded") ? "Read Less" : "Read More";
      });
    }
  });
  const understandingBtns = document.querySelectorAll('.read-more-read-less-jji-joist-button-understanding-jji-joists');
  understandingBtns.forEach(btn => {
    const fadeContainer = btn.previousElementSibling;
    if (fadeContainer && fadeContainer.classList.contains('jji-joist-fade-container-understanding-jji-joists')) {
      btn.addEventListener("click", () => {
        fadeContainer.classList.toggle("expanded");
        btn.textContent = fadeContainer.classList.contains("expanded") ? "Read Less" : "Read More";
      });
    }
  });
});
