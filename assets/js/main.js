/* ============================================================
   IFC — Ice Fruits Chocolate · scripts d'interface
   ============================================================ */
(function () {
  "use strict";

  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(function () {
    /* ---------- En-tête : état au défilement ---------- */
    const header = document.querySelector(".site-header");
    const setScrolled = () => {
      if (!header) return;
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    /* ---------- Navigation mobile ---------- */
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    const backdrop = document.querySelector(".nav-backdrop");

    const closeNav = () => {
      if (!toggle || !links) return;
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
      backdrop && backdrop.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };
    const openNav = () => {
      if (!toggle || !links) return;
      toggle.setAttribute("aria-expanded", "true");
      links.classList.add("is-open");
      backdrop && backdrop.classList.add("is-open");
      document.body.classList.add("nav-open");
    };

    if (toggle && links) {
      toggle.addEventListener("click", () =>
        toggle.getAttribute("aria-expanded") === "true" ? closeNav() : openNav()
      );
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", closeNav)
      );
      backdrop && backdrop.addEventListener("click", closeNav);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeNav();
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 860) closeNav();
      });
    }

    /* ---------- Révélations au défilement ---------- */
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-in"));
    }

    /* ---------- Retour en haut ---------- */
    const toTop = document.querySelector(".to-top");
    if (toTop) {
      const toggleTop = () =>
        toTop.classList.toggle("is-visible", window.scrollY > 600);
      toggleTop();
      window.addEventListener("scroll", toggleTop, { passive: true });
      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );
    }

    /* ---------- Lightbox (galerie + carte) ---------- */
    const triggers = Array.from(
      document.querySelectorAll("[data-lightbox]")
    );
    if (triggers.length) {
      const sources = triggers.map(
        (t) => t.getAttribute("data-full") || t.querySelector("img")?.src
      );
      let current = 0;

      const box = document.createElement("div");
      box.className = "lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-label", "Image agrandie");
      box.innerHTML = `
        <button class="lightbox__close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        <button class="lightbox__nav lightbox__nav--prev" aria-label="Image précédente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
        </button>
        <img alt="" />
        <button class="lightbox__nav lightbox__nav--next" aria-label="Image suivante">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>
        </button>
        <span class="lightbox__count"></span>`;
      document.body.appendChild(box);

      const imgEl = box.querySelector("img");
      const countEl = box.querySelector(".lightbox__count");
      const multiple = sources.length > 1;
      box.querySelector(".lightbox__nav--prev").style.display = multiple ? "" : "none";
      box.querySelector(".lightbox__nav--next").style.display = multiple ? "" : "none";

      const render = () => {
        imgEl.src = sources[current];
        countEl.textContent = multiple ? `${current + 1} / ${sources.length}` : "";
      };
      const open = (i) => {
        current = i;
        render();
        box.classList.add("is-open");
        document.body.classList.add("nav-open");
      };
      const close = () => {
        box.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      };
      const step = (dir) => {
        current = (current + dir + sources.length) % sources.length;
        render();
      };

      triggers.forEach((t, i) =>
        t.addEventListener("click", (e) => {
          e.preventDefault();
          open(i);
        })
      );
      box.querySelector(".lightbox__close").addEventListener("click", close);
      box.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
      box.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));
      box.addEventListener("click", (e) => {
        if (e.target === box) close();
      });
      document.addEventListener("keydown", (e) => {
        if (!box.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft" && multiple) step(-1);
        if (e.key === "ArrowRight" && multiple) step(1);
      });
    }

    /* ---------- Formulaires (Web3Forms + repli mailto) ---------- */
    document.querySelectorAll("form[data-form]").forEach((form) => {
      const status = form.querySelector(".form-status");
      const submitBtn = form.querySelector('[type="submit"]');
      const accessKey = form.querySelector('input[name="access_key"]')?.value || "";
      const placeholder = "REMPLACEZ-PAR-VOTRE-CLE-WEB3FORMS";

      const setStatus = (msg, type) => {
        if (!status) return;
        status.textContent = msg;
        status.className = "form-status is-visible is-" + type;
      };

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Repli e-mail tant que la clé Web3Forms n'est pas configurée
        if (!accessKey || accessKey === placeholder) {
          const data = new FormData(form);
          const to = form.getAttribute("data-mailto") || "contact@ifc-guadeloupe.fr";
          const subject = encodeURIComponent(
            form.getAttribute("data-subject") || "Message depuis le site IFC"
          );
          let body = "";
          data.forEach((value, key) => {
            if (["access_key", "redirect", "botcheck", "subject", "from_name"].includes(key)) return;
            if (typeof value === "string" && value.trim()) {
              body += `${key} : ${value}\n`;
            }
          });
          window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(body)}`;
          setStatus("Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi.", "success");
          return;
        }

        const original = submitBtn ? submitBtn.textContent : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Envoi en cours…";
        }
        setStatus("", "success");
        status && status.classList.remove("is-visible");

        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });
          const json = await res.json();
          if (json.success) {
            form.reset();
            setStatus("Merci ! Votre message a bien été envoyé. Nous revenons vers vous très vite.", "success");
          } else {
            setStatus("Oups, l'envoi a échoué. Écrivez-nous directement à contact@ifc-guadeloupe.fr.", "error");
          }
        } catch (err) {
          setStatus("Connexion impossible. Écrivez-nous directement à contact@ifc-guadeloupe.fr.", "error");
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = original;
          }
        }
      });
    });

    /* ---------- Année courante (pied de page) ---------- */
    const yearEl = document.querySelector("[data-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
