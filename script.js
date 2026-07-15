const root = document.documentElement;
const languageButtons = document.querySelectorAll("[data-language-button]");

function setLanguage(language) {
  root.dataset.language = language;
  root.lang = language;
  localStorage.setItem("saeyeon-language", language);
  languageButtons.forEach((button) => {
    const selected = button.dataset.languageButton === language;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

setLanguage(localStorage.getItem("saeyeon-language") === "en" ? "en" : "ko");
languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.languageButton)));

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");
const modalLabel = document.querySelector("#modal-label");

function closeModal() {
  modal.hidden = true;
  modalContent.replaceChildren();
}

document.querySelectorAll("[data-modal-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const template = document.querySelector(`#${button.dataset.modalTarget}`);
    if (!template) return;
    modalContent.replaceChildren(template.content.cloneNode(true));
    modalLabel.textContent = button.dataset.modalTarget.startsWith("award") ? "HONORS" : "ABSTRACT";
    modal.hidden = false;
    modal.querySelector("[data-close-modal]").focus();
  });
});

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest("[data-close-modal]")) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
