// Theme toggle, mobile menu, project filter and contact form handling.
// Each block checks that its elements exist, so the same file works on every page.

// ---- Theme toggle ----------------------------------------------------------------

const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const next = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
  }
}

if (themeToggle) {
  // the inline script in <head> already picked the starting theme
  applyTheme(document.documentElement.dataset.theme || "light");

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // storage can be blocked in private mode, the theme still changes for this visit
    }
  });
}

// ---- Mobile navigation -------------------------------------------------------

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

function setMenu(open) {
  siteNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  // close the menu after picking a link or pressing Escape
  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

// ---- Footer year ---------------------------------------------------------------

const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Project filter ------------------------------------------------------------

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn === button));
    });

    projects.forEach((project) => {
      const matches = selected === "all" || project.dataset.category === selected;
      project.hidden = !matches;
    });
  });
});

// ---- Contact form ----------------------------------------------------------------

const form = document.querySelector("#contact-form");

if (form) {
  const statusEl = document.querySelector("#form-status");

  const rules = {
    name: (value) => (value.length < 2 ? "Please enter your name." : ""),
    email: (value) => {
      if (!value) return "Please enter your email address.";
      const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return looksValid ? "" : "That email address doesn't look right. Check it and try again.";
    },
    message: (value) => {
      if (value.length < 10) return "Your message needs at least 10 characters.";
      return "";
    },
  };

  function showError(input, message) {
    const field = input.closest(".field");
    const errorEl = field.querySelector(".field-error");
    field.classList.toggle("has-error", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    errorEl.textContent = message;
  }

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const message = rule(input.value.trim());
    showError(input, message);
    return message === "";
  }

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = "form-status is-" + type;
  }

  // check a field once the visitor leaves it, and clear the error as they fix it
  form.querySelectorAll("input[name], textarea[name]").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("has-error")) validateField(input);
    });
  });

  // No backend: after validation the message opens in the visitor's email app.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll("input[name], textarea[name]")];
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      showStatus("Fix the highlighted fields and send again.", "error");
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }

    const data = new FormData(form);
    const subject = "Portfolio message from " + data.get("name").trim();
    const body = data.get("message").trim() + "\n\n" + data.get("name").trim() + "\n" + data.get("email").trim();

    window.location.href =
      "mailto:" + form.dataset.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    showStatus("Opening your email app. Press send there to deliver the message.", "success");
  });
}
