export function insertHelloHeading() {
    const heading = document.createElement("h2");
    heading.textContent = "Hello test from JS!";
    heading.style.color = "#4CAF50";
    heading.style.marginTop = "1rem";
    document.querySelector(".app").appendChild(heading);
  }