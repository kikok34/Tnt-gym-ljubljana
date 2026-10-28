/**
 * T'N'T GYM LJUBLJANA - MAIN JAVASCRIPT
 * Responsive navigation, interactive timetable, Formspree booking modal & FAQs
 */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileNav();
  initTimetable();
  initBookingModal();
  initFaqAccordion();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    if (!document.getElementById("bookingModal")?.classList.contains("open")) {
      document.body.style.overflow = "";
    }
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener("click", closeDrawer);

  links.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Timetable Rendering & Filtering
   -------------------------------------------------------------------------- */
function initTimetable() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const timetableContainer = document.querySelector(".timetable-mount");

  if (typeof SCHEDULE_DATA === "undefined") return;

  let activeFilter = "all";

  const renderTimetable = () => {
    if (!timetableContainer) return;

    const filtered = activeFilter === "all"
      ? SCHEDULE_DATA
      : SCHEDULE_DATA.filter(item => {
          if (activeFilter === "mma") return item.sport === "mma";
          if (activeFilter === "bjj") return item.sport === "bjj";
          if (activeFilter === "box") return item.sport === "box";
          if (activeFilter === "mt") return item.sport === "mt";
          if (activeFilter === "kids") return item.sport === "kids";
          return item.sport === activeFilter;
        });

    const days = [
      { id: "mon", name: "Ponedeljek" },
      { id: "tue", name: "Torek" },
      { id: "wed", name: "Sreda" },
      { id: "thu", name: "Četrtek" },
      { id: "fri", name: "Petek" },
      { id: "sat", name: "Sobota" }
    ];

    let html = `
      <!-- Mobile-First Stacked Day Cards (visible on phone screens < 768px) -->
      <div class="mobile-schedule-grid">
        ${days.map(d => {
          const dayClasses = filtered.filter(item => item.day === d.id);
          if (dayClasses.length === 0) return "";
          return `
            <div class="mobile-day-card">
              <div class="mobile-day-header">${d.name}</div>
              <div class="mobile-day-slots">
                ${dayClasses.map(item => `
                  <div class="class-slot ${item.sport}"
                       role="button"
                       tabindex="0"
                       onclick="openBookingModal('${escapeHtml(item.sport)}', '${escapeHtml(item.dayName + ' ' + item.time)}')"
                       onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openBookingModal('${escapeHtml(item.sport)}', '${escapeHtml(item.dayName + ' ' + item.time)}');}">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
                      <span class="slot-time">${item.time}</span>
                      <span style="font-size:0.7rem;color:var(--color-brand);font-weight:700;text-transform:uppercase;">Rezerviraj termin →</span>
                    </div>
                    <strong class="slot-title">${escapeHtml(item.title)}</strong>
                    <div class="slot-meta">
                      <span>👤 ${escapeHtml(item.coach)}</span>
                      <span>${escapeHtml(item.level || "")}</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Desktop/Tablet 6-Column Table (visible on >= 768px) -->
      <div class="timetable-wrapper">
        <table class="timetable" aria-label="Urnik vodenih treningov T'n'T Gym">
          <thead>
            <tr>
              ${days.map(d => `<th scope="col">${d.name}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${days.map(d => {
                const dayClasses = filtered.filter(item => item.day === d.id);
                return `
                  <td>
                    ${dayClasses.length === 0 ? '<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:1rem 0;">—</div>' : ''}
                    ${dayClasses.map(item => `
                      <div class="class-slot ${item.sport}"
                           role="button"
                           tabindex="0"
                           onclick="openBookingModal('${escapeHtml(item.sport)}', '${escapeHtml(item.dayName + ' ' + item.time)}')"
                           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openBookingModal('${escapeHtml(item.sport)}', '${escapeHtml(item.dayName + ' ' + item.time)}');}"
                           title="Klikni za prijavo na ${escapeHtml(item.title)}">
                        <span class="slot-time">${item.time}</span>
                        <strong class="slot-title">${escapeHtml(item.title)}</strong>
                        <div class="slot-meta">
                          <span>${escapeHtml(item.coach)}</span>
                        </div>
                      </div>
                    `).join("")}
                  </td>
                `;
              }).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    timetableContainer.innerHTML = html;
  };

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-sport") || "all";
      renderTimetable();
    });
  });

  renderTimetable();
}

/* --------------------------------------------------------------------------
   4. Programme Normalization & Page Default Detection
   -------------------------------------------------------------------------- */
function normalizeProgramValue(rawProgram) {
  if (!rawProgram) return "";
  const val = String(rawProgram).trim().toLowerCase();

  if (val === "bjj" || val.includes("bjj") || val.includes("jiu-jitsu") || val.includes("jiu jitsu")) {
    return "BJJ";
  }
  if (val === "mma" || val.includes("mma") || val.includes("mešane borilne")) {
    return "MMA";
  }
  if (val === "kids" || val.includes("otro") || val.includes("mladi")) {
    return "Otroški boks";
  }
  if (val === "box" || val === "boks" || val.includes("boks")) {
    return "Boks";
  }
  if (val === "mt" || val.includes("kickbox") || val.includes("muay thai") || val.includes("tajski")) {
    return "Kickbox & Muay Thai";
  }
  if (val.includes("nisem prepričan") || val.includes("posvet") || val.includes("svetovanje")) {
    return "Nisem prepričan/-a";
  }
  return "";
}

function getPageDefaultProgram() {
  const bodyProg = document.body.getAttribute("data-page-program");
  if (bodyProg) return normalizeProgramValue(bodyProg);

  const path = (window.location.pathname || "").toLowerCase();
  if (path.endsWith("/bjj.html") || path.endsWith("bjj.html")) return "BJJ";
  if (path.endsWith("/mma.html") || path.endsWith("mma.html")) return "MMA";
  if (path.endsWith("/boks.html") || path.endsWith("boks.html")) return "Boks";
  if (path.endsWith("/kickbox.html") || path.endsWith("kickbox.html")) return "Kickbox & Muay Thai";
  if (path.endsWith("/otroci.html") || path.endsWith("otroci.html")) return "Otroški boks";

  return "";
}

/* --------------------------------------------------------------------------
   5. Formspree Validation & Submission Helper (Shared by Modal & Contact Form)
   -------------------------------------------------------------------------- */
function translateFormspreeError(err) {
  if (!err) return "";
  const field = (err.field || "").toLowerCase();
  const code = (err.code || "").toUpperCase();

  const fieldLabels = {
    ime_in_priimek: "Ime in priimek",
    telefon: "Telefon",
    email: "E-pošta",
    program: "Izberi program",
    stopnja_izkusenj: "Stopnja izkušenj",
    zeleni_termin: "Želeni dan ali termin",
    sporocilo: "Sporočilo",
    privacy_consent: "Soglasje za obdelavo podatkov"
  };

  if (field === "email" || code === "TYPE_EMAIL") {
    return "Prosimo, vnesite veljaven e-poštni naslov.";
  }
  if (code === "REQUIRED_FIELD_MISSING" || code === "EMPTY") {
    if (field && fieldLabels[field]) {
      return `Polje »${fieldLabels[field]}« je obvezno.`;
    }
    return "Prosimo, izpolnite vsa obvezna polja označena z zvezdico (*).";
  }
  if (field && fieldLabels[field]) {
    return `Preverite polje »${fieldLabels[field]}«.`;
  }
  return "";
}

function validateBookingFormClientSide(form) {
  const errors = [];
  let firstInvalidEl = null;

  const markInvalid = (el, msg) => {
    if (el) {
      el.classList.add("is-invalid");
      if (!firstInvalidEl) firstInvalidEl = el;
    }
    errors.push(msg);
  };

  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

  const imeEl = form.elements["ime_in_priimek"];
  const telEl = form.elements["telefon"];
  const emailEl = form.elements["email"];
  const progEl = form.elements["program"];
  const izkEl = form.elements["stopnja_izkusenj"];
  const gdprEl = form.elements["privacy_consent"];

  if (!imeEl || !imeEl.value.trim()) {
    markInvalid(imeEl, "Prosimo, vnesite svoje ime in priimek.");
  }
  if (!telEl || !telEl.value.trim()) {
    markInvalid(telEl, "Prosimo, vnesite svojo telefonsko številko.");
  }
  const emailVal = emailEl ? emailEl.value.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    markInvalid(emailEl, "Prosimo, vnesite veljaven e-poštni naslov.");
  }
  if (!progEl || !progEl.value) {
    markInvalid(progEl, "Prosimo, izberite želeni program.");
  }
  if (!izkEl || !izkEl.value) {
    markInvalid(izkEl, "Prosimo, izberite stopnjo izkušenj.");
  }
  if (!gdprEl || !gdprEl.checked) {
    markInvalid(gdprEl, "Za oddajo prijave označite soglasje za obdelavo podatkov.");
  }

  return {
    valid: errors.length === 0,
    errors,
    firstInvalidEl
  };
}

function attachFormspreeHandler(form, errorBanner, successState) {
  if (!form) return;

  // Clear invalid outline on input change
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () => input.classList.remove("is-invalid"));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Anti-spam honeypot check
    const gotcha = form.elements["_gotcha"];
    if (gotcha && gotcha.value) {
      return;
    }

    if (errorBanner) {
      errorBanner.hidden = true;
      errorBanner.textContent = "";
    }

    // Client-side validation in Slovenian
    const validation = validateBookingFormClientSide(form);
    if (!validation.valid) {
      if (errorBanner) {
        errorBanner.innerHTML = validation.errors.map(msg => `<div>• ${escapeHtml(msg)}</div>`).join("");
        errorBanner.hidden = false;
      }
      if (validation.firstInvalidEl) {
        validation.firstInvalidEl.focus();
      }
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.textContent.trim() : "Rezerviraj brezplačen prvi trening";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Pošiljanje ...";
    }

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        // 1. Reset the form & clear error banner
        form.reset();
        form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
        if (errorBanner) {
          errorBanner.hidden = true;
          errorBanner.textContent = "";
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }

        // 2. Hide the form fields
        form.hidden = true;
        form.style.display = "none";

        // 3. Show the Slovenian success message
        if (successState) {
          successState.hidden = false;
          successState.classList.add("visible");
          successState.style.display = "block";
          const closeBtn = successState.querySelector("[data-close-modal], button");
          if (closeBtn) closeBtn.focus();
        }
      } else {
        let data = null;
        try {
          data = await response.json();
        } catch (_) {
          data = null;
        }

        const baseErrorMsg = "Prijave trenutno ni bilo mogoče poslati. Prosimo, poskusite ponovno ali nas kontaktirajte po telefonu.";
        const extraErrors = [];

        if (data && Array.isArray(data.errors)) {
          data.errors.forEach(err => {
            const translated = translateFormspreeError(err);
            if (translated && !extraErrors.includes(translated)) {
              extraErrors.push(translated);
            }
          });
        }

        if (errorBanner) {
          let html = `<div><strong>${escapeHtml(baseErrorMsg)}</strong></div>`;
          if (extraErrors.length > 0) {
            html += `<div style="margin-top:0.35rem;">${extraErrors.map(m => `• ${escapeHtml(m)}`).join("<br>")}</div>`;
          }
          errorBanner.innerHTML = html;
          errorBanner.hidden = false;
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    } catch (error) {
      if (errorBanner) {
        errorBanner.innerHTML = `<div><strong>Prijave trenutno ni bilo mogoče poslati. Prosimo, poskusite ponovno ali nas kontaktirajte po telefonu.</strong></div>`;
        errorBanner.hidden = false;
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   6. Reusable Booking Modal & CTA Triggers
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const dialog = modal.querySelector(".modal-dialog");
  const closeBtns = modal.querySelectorAll("[data-close-modal]");
  const form = document.getElementById("bookingForm");
  const errorBanner = document.getElementById("bookingErrorBanner") || (form ? form.querySelector(".form-error-banner") : null);
  const successState = document.getElementById("bookingSuccessState");
  let lastFocusedTrigger = null;

  if (errorBanner) {
    errorBanner.hidden = true;
    errorBanner.textContent = "";
  }

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";

    if (errorBanner) {
      errorBanner.hidden = true;
      errorBanner.textContent = "";
    }

    // If modal was closed after a successful submission, restore form visibility for next open
    if (form && (form.hidden || form.style.display === "none")) {
      form.reset();
      form.hidden = false;
      form.style.display = "block";
    }
    if (successState) {
      successState.hidden = true;
      successState.classList.remove("visible");
      successState.style.display = "none";
    }

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  };

  closeBtns.forEach(btn => btn.addEventListener("click", closeModal));

  // Clicking outside the modal dialog closes it
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key closes the modal & Tab traps focus inside modal
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === "Tab" && dialog) {
      const focusable = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]):not(.honeypot):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Attach Formspree submission handler to #bookingForm
  attachFormspreeHandler(form, errorBanner, successState);

  // Global helper to open the modal with programme preselection
  window.openBookingModal = (programName = "", preferredTime = "", triggerEl = null) => {
    if (triggerEl) {
      lastFocusedTrigger = triggerEl;
    } else if (document.activeElement && document.activeElement !== document.body) {
      lastFocusedTrigger = document.activeElement;
    }

    // Close mobile nav drawer if open
    const drawer = document.querySelector(".mobile-nav-drawer.open");
    const backdrop = document.querySelector(".mobile-nav-backdrop.open");
    const toggleBtn = document.querySelector(".menu-toggle.open");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    if (toggleBtn) {
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    if (form) {
      form.hidden = false;
      form.style.display = "block";
      form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    }
    if (errorBanner) {
      errorBanner.hidden = true;
      errorBanner.textContent = "";
    }
    if (successState) {
      successState.hidden = true;
      successState.classList.remove("visible");
      successState.style.display = "none";
    }

    if (form) {
      const programSelect = form.elements["program"];
      const resolvedProgram = normalizeProgramValue(programName) || getPageDefaultProgram();

      if (programSelect) {
        programSelect.value = resolvedProgram || "";
      }

      const timeInput = form.elements["zeleni_termin"];
      if (timeInput && preferredTime) {
        timeInput.value = preferredTime;
      }
    }

    // Set focus to the first form input when modal opens
    setTimeout(() => {
      const firstInput = form ? form.querySelector("#booking-ime, input:not(.honeypot)") : null;
      if (firstInput) {
        firstInput.focus();
      } else if (dialog) {
        dialog.focus();
      }
    }, 30);
  };

  // Trigger phrases required to open the reusable booking modal
  const triggerPhrases = [
    "rezerviraj brezplačen prvi trening",
    "rezerviraj brezplačen trening",
    "rezerviraj termin",
    "rezerviraj datum",
    "book a free training"
  ];

  const shouldTriggerBookingModal = (el) => {
    if (!el) return false;
    // Never hijack a submit button inside a form or a modal close button
    if (el.matches('button[type="submit"], input[type="submit"], [data-close-modal]')) {
      return false;
    }
    if (el.classList.contains("btn-booking-trigger") || el.hasAttribute("data-open-booking")) {
      return true;
    }
    const text = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    return triggerPhrases.some(phrase => text.includes(phrase));
  };

  // Bind all matching buttons and links on the page
  document.querySelectorAll("a, button").forEach(el => {
    if (shouldTriggerBookingModal(el)) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const prog = el.getAttribute("data-program") || "";
        const time = el.getAttribute("data-time") || "";
        window.openBookingModal(prog, time, el);
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          const btn = other.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Standalone Contact/Booking Form (on index.html & kontakt.html)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById("generalContactForm");
  if (!contactForm) return;

  const errorBanner = document.getElementById("contactErrorBanner") || contactForm.querySelector(".form-error-banner");
  const successState = document.getElementById("contactSuccessState");

  if (errorBanner) {
    errorBanner.hidden = true;
    errorBanner.textContent = "";
  }

  attachFormspreeHandler(contactForm, errorBanner, successState);

  const resetBtn = document.getElementById("contactResetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (errorBanner) {
        errorBanner.hidden = true;
        errorBanner.textContent = "";
      }
      if (successState) {
        successState.hidden = true;
        successState.classList.remove("visible");
        successState.style.display = "none";
      }
      contactForm.hidden = false;
      contactForm.style.display = "block";
    });
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
