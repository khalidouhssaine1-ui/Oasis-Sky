const WHATSAPP_NUMBER = "212624677610";

const form = document.querySelector("#booking-form");
const stickyButton = document.querySelector("#whatsapp-sticky");
const dateInput = document.querySelector('input[name="bookingDate"]');
const peopleInput = document.querySelector('input[name="people"]');
const stepperButtons = document.querySelectorAll(".stepper-button");
const thankYouSection = document.querySelector("#merci");
const thankYouButton = document.querySelector("#thank-you-whatsapp");

const defaultMessage =
  "Bonjour Oasis Sky Camp, je viens de l'offre Oasis Sky Agafay à 350 Dhs et je veux réserver.";

function whatsappUrl(message = defaultMessage) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

if (stickyButton) {
  stickyButton.href = whatsappUrl();
}

stepperButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!peopleInput) return;

    const step = Number(button.dataset.step);
    const min = Number(peopleInput.min) || 1;
    const currentValue = Number(peopleInput.value) || min;
    peopleInput.value = Math.max(min, currentValue + step);
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const extras = data.getAll("extras");
    const message = [
      "Nouveau prospect depuis l'offre Oasis Sky Camp Agafay",
      "Source: Landing page / Offre 350 Dhs",
      "Message client: Bonjour Oasis Sky Camp, je viens de l'offre Oasis Sky Agafay à 350 Dhs et je veux réserver.",
      "",
      `Nom complet: ${data.get("fullName")}`,
      `Téléphone: ${data.get("phone")}`,
      `Nombre de personnes: ${data.get("people")}`,
      `Date souhaitée: ${data.get("bookingDate")}`,
      `Transport: ${data.get("transport")}`,
      `Extras: ${extras.length ? extras.join(", ") : "Aucun"}`,
    ].join("\n");

    const bookingUrl = whatsappUrl(message);

    if (thankYouSection) {
      thankYouSection.hidden = false;
      thankYouSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (thankYouButton) {
      thankYouButton.href = bookingUrl;
    }

    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  });
}
