// Site configuration: Replace these values before publishing the live website.
const WHATSAPP_NUMBER = "27790808422";

// Smooth scrolling: Moves users to sections without a jump and closes the mobile menu.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  });
});

// WhatsApp integration: Builds direct WhatsApp demo links from each button's custom message.
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.whatsapp || "Hi, I want to book a free AI automation demo.";
  const encodedMessage = encodeURIComponent(message);

  link.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener");
});

// Mobile menu: Opens, closes, and supports Escape for better keyboard accessibility.
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");

function closeMobileMenu() {
  document.body.classList.remove("menu-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const menuIsOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });
}

// FAQ accordion: Keeps questions keyboard-friendly and updates ARIA state correctly.
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answerId = button.getAttribute("aria-controls");
    const answer = document.querySelector(`#${answerId}`);
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    if (answer) {
      answer.hidden = isOpen;
    }
  });
});

// Scroll reveal: Adds the visible state when elements enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// Animated counters: Counts KPI numbers up once the metric sections are visible.
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  if (counter.dataset.animated === "true") {
    return;
  }

  counter.dataset.animated = "true";
  const target = Number(counter.dataset.target || "0");
  const duration = 900;
  const startTime = performance.now();

  function updateCounter(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    counter.textContent = currentValue.toLocaleString("en-ZA");

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);

  window.setTimeout(() => {
    counter.textContent = target.toLocaleString("en-ZA");
  }, duration + 100);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}

window.setTimeout(() => {
  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animateCounter(counter);
    }
  });
}, 200);

// Pricing card hover effect: Keeps pointer and keyboard focus interactions consistent.
document.querySelectorAll(".pricing-card").forEach((card) => {
  const showHighlight = () => card.classList.add("is-hovered");
  const hideHighlight = () => card.classList.remove("is-hovered");

  card.addEventListener("mouseenter", showHighlight);
  card.addEventListener("mouseleave", hideHighlight);
  card.addEventListener("focusin", showHighlight);
  card.addEventListener("focusout", hideHighlight);
});

// Card pointer effect: Adds a subtle premium tilt on devices with precise pointers.
if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -3;
      const rotateY = ((x / rect.width) - 0.5) * 3;

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// AI chatbot demo: Local simulation for common client questions.
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatWindow = document.querySelector("#chatWindow");

const chatbotAnswers = [
  {
    keywords: ["price", "pricing", "cost", "package", "rand", "r999"],
    answer: "Pricing starts at R999 setup plus R499/month for a focused Starter automation. Growth is R1,999 setup plus R999/month, and Business is R3,499 setup plus R1,999/month."
  },
  {
    keywords: ["booking", "appointment", "calendar", "schedule"],
    answer: "A booking automation can collect customer details, suggest appointment slots, confirm the booking, notify your team, and send reminders before the appointment."
  },
  {
    keywords: ["service", "services", "what do you do", "offer"],
    answer: "SimpleFlow AI builds AI chatbots, WhatsApp automations, lead capture systems, booking workflows, email automations, and customer follow-up systems."
  },
  {
    keywords: ["whatsapp", "message", "reply", "auto reply"],
    answer: "WhatsApp automations can reply instantly, ask qualifying questions, save leads, alert the owner, and trigger follow-ups so fewer inquiries are missed."
  },
  {
    keywords: ["lead", "leads", "capture", "sheets", "google"],
    answer: "Lead capture systems save customer inquiries into a clean sheet or CRM-style workflow, including name, contact details, service interest, source, and follow-up status."
  },
  {
    keywords: ["time", "launch", "fast", "how long"],
    answer: "A simple automation can often be mapped, built, and tested within a few days once the workflow and tools are confirmed."
  }
];

function addChatMessage(message, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${sender}`;
  bubble.innerHTML = `<p>${message}</p>`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getChatbotResponse(question) {
  const normalizedQuestion = question.toLowerCase();
  const match = chatbotAnswers.find((item) =>
    item.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "A good first automation is usually the task you repeat every day: answering common questions, saving leads, confirming bookings, or following up with customers. Tell me your business type and I can suggest a workflow.";
}

if (chatForm && chatInput && chatWindow) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = chatInput.value.trim();

    if (!question) {
      return;
    }

    addChatMessage(question, "user");
    chatInput.value = "";

    window.setTimeout(() => {
      addChatMessage(getChatbotResponse(question), "bot");
    }, 420);
  });
}

// Contact form validation: Checks the required business fields before sending to Formspree.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const submitButton = document.querySelector("#submitButton");

const validators = {
  name: (value) => value.trim().length >= 2 || "Please enter your name.",
  business: (value) => value.trim().length >= 2 || "Please enter your business name.",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email address.",
  phone: (value) => /^[0-9+\s()-]{7,}$/.test(value.trim()) || "Please enter a valid phone number.",
  problem: (value) => value.trim().length >= 10 || "Please describe the business problem in a little more detail."
};

function setFieldState(field, message) {
  const formGroup = field.closest(".form-group");
  const errorMessage = formGroup.querySelector(".error-message");

  if (message === true) {
    formGroup.classList.remove("has-error");
    errorMessage.textContent = "";
    return true;
  }

  formGroup.classList.add("has-error");
  errorMessage.textContent = message;
  return false;
}

function validateField(field) {
  const validator = validators[field.name];

  if (!validator) {
    return true;
  }

  return setFieldState(field, validator(field.value));
}

function setFormStatus(message, isError = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
}

function setFormLoading(isLoading) {
  contactForm.classList.toggle("is-loading", isLoading);
  submitButton.disabled = isLoading;
}

if (contactForm && formStatus && submitButton) {
  contactForm.querySelectorAll("input, textarea").forEach((field) => {
    if (field.name === "_gotcha") {
      return;
    }

    field.addEventListener("input", () => {
      validateField(field);
      setFormStatus("");
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honeypot = contactForm.querySelector('input[name="_gotcha"]');

    if (honeypot && honeypot.value) {
      contactForm.reset();
      return;
    }

    const fields = Array.from(contactForm.querySelectorAll("input, textarea"))
      .filter((field) => field.name !== "_gotcha");
    const formIsValid = fields.map(validateField).every(Boolean);

    if (!formIsValid) {
      setFormStatus("Please fix the highlighted fields.", true);
      return;
    }

    setFormLoading(true);
    setFormStatus("Sending your request...");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed.");
      }

      contactForm.reset();
      setFormStatus("Thank you, I will contact you soon.");
    } catch (error) {
      setFormStatus("Something went wrong. Please try WhatsApp or send the form again.", true);
    } finally {
      setFormLoading(false);
    }
  });
}
