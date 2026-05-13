/**
 * Main JavaScript file for Hedi Gardi's portfolio website
 * Handles page initialization, event listeners, and DOM manipulations
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

/**
 * Main initialization function
 */
function initApp() {
  // Remove preload class after page load
  window.addEventListener("load", handlePageLoad);

  // Set up event listeners
  setupEventListeners();

  // Initialize dynamic content
  initDynamicContent();
}

/**
 * Handle page load completion
 */
function handlePageLoad() {
  document.body.classList.remove("is-preload");
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Reset scroll on orientation change
  window.addEventListener("orientationchange", handleOrientationChange);

  // Handle resize events
  window.addEventListener("resize", handleResize);
}

/**
 * Initialize dynamic content
 */
function initDynamicContent() {
  // Set current year in footer
  setCurrentYear();

  // Enable profile image lightbox interaction
  initProfileLightbox();

  // Additional dynamic content can be added here
}

/**
 * Handle orientation change
 */
function handleOrientationChange() {
  window.scrollTo(0, 0);
}

/**
 * Handle window resize
 */
function handleResize() {
  // Add any resize-specific logic here
}

/**
 * Set the current year in the footer copyright
 */
function setCurrentYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Initialize click-to-enlarge behavior for profile image
 */
function initProfileLightbox() {
  const profileImage = document.getElementById("profileImage");
  const lightbox = document.getElementById("imageLightbox");
  const closeButton = document.getElementById("lightboxClose");

  if (!profileImage || !lightbox || !closeButton) {
    return;
  }

  const openLightbox = function () {
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = function () {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "hidden";
  };

  profileImage.addEventListener("click", openLightbox);
  profileImage.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox();
    }
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.dataset.closeLightbox === "true"
    ) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

/**
 * Utility function to check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
