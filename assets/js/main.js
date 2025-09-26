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
  console.log("Page loaded successfully");
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Prevent scrolling on touch devices (if intended)
  window.addEventListener("touchmove", handleTouchMove, { passive: false });

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

  // Additional dynamic content can be added here
}

/**
 * Handle touch move events to prevent scrolling
 * @param {Event} e - Touch move event
 */
function handleTouchMove(e) {
  e.preventDefault();
}

/**
 * Handle orientation change
 */
function handleOrientationChange() {
  window.scrollTo(0, 0);
  console.log("Orientation changed, scroll reset");
}

/**
 * Handle window resize
 */
function handleResize() {
  // Add any resize-specific logic here
  console.log("Window resized");
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

// Export functions for potential future modular use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initApp,
    handlePageLoad,
    setCurrentYear,
    isInViewport,
  };
}
