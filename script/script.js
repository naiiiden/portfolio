const targetSectionId = window.location.hash.slice(1);
const sections = document.querySelectorAll("section");

if (!targetSectionId) {
  sections[0].style.flexGrow = "1";
} else {
  sections.forEach((section) => (section.style.flexGrow = "0"));
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.style.flexGrow = "1";
  }
}

const sectionLinks = document.querySelectorAll('section a[href*="#"]');
sectionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sections.forEach((section) => (section.style.flexGrow = "0"));
    const targetSection = document.getElementById(link.getAttribute("href").slice(1));
    if (targetSection) {
      targetSection.style.flexGrow = "1";
    }
  });
});

window.addEventListener("hashchange", () => {
  const targetSectionId = window.location.hash.slice(1);
  const sections = document.querySelectorAll("section");

  if (!targetSectionId) {
    sections[0].style.flexGrow = "1";
  } else {
    sections.forEach((section) => (section.style.flexGrow = "0"));

    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.style.flexGrow = "1";
    }
  }
});