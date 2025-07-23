// contact.js for From Zero to Zeta

// Example enhancement: copy email to clipboard button

document.addEventListener("DOMContentLoaded", () => {
  const emailLink = document.querySelector("a[href^='mailto']");

  if (emailLink) {
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy Email";
    copyBtn.style.marginLeft = "1rem";
    copyBtn.style.padding = "0.25rem 0.5rem";
    copyBtn.style.fontSize = "0.9rem";
    copyBtn.style.cursor = "pointer";

    emailLink.parentNode.insertBefore(copyBtn, emailLink.nextSibling);

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(emailLink.textContent.trim());
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy Email";
      }, 1500);
    });
  }
});
