// const sections = document.querySelectorAll("section");
// function setFlexGrow(section, value) {
//   section.style.flexGrow = value;
// }

// function updateFlexGrow(targetSectionId) {
//   if (!targetSectionId) {
//     setFlexGrow(sections[0], "1");
//   } else {
//     sections.forEach((section) => setFlexGrow(section, "0"));
//     const targetSection = document.getElementById(targetSectionId);
//     if (targetSection) {
//       setFlexGrow(targetSection, "1");
//     }
//   }
// }

// const targetSectionId = window.location.hash.slice(1);
// updateFlexGrow(targetSectionId);

// window.addEventListener("hashchange", () => {
//   const targetSectionId = window.location.hash.slice(1);
//   updateFlexGrow(targetSectionId);
// });

// ???
// if (window.location.hash === "") {
//     window.location.hash = "#about";
// }