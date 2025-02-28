/**
 * Hundreds Heritage Tea - Main JavaScript
 *
 * This file contains all client-side functionality for the website including:
 * - Banner carousel management
 * - Header animations and transformations
 * - Navigation interactions (desktop and mobile)
 * - Page animations and effects
 */

// ==========================================================================
// 1. CONFIGURATION OBJECTS
// ==========================================================================

/**
 * Banner carousel configuration
 * Contains image paths and display duration settings
 */
const bannerConfig = {
	images: [
		{ src: "/images/banner-1.jpg", alt: "Banner 1" },
		{ src: "/images/banner-2.jpg", alt: "Banner 2" },
		{ src: "/images/banner-3.jpg", alt: "Banner 3" },
		{ src: "/images/banner-4.jpg", alt: "Banner 4" },
		{ src: "/images/banner-5.jpg", alt: "Banner 5" },
		{ src: "/images/banner-6.jpg", alt: "Banner 6" },
	],
	autoplayDuration: 5000, // Time in milliseconds between slides
};

// ==========================================================================
// 2. BANNER CAROUSEL FUNCTIONALITY
// ==========================================================================

/**
 * BannerCarousel Class
 * Handles the loading, display, and rotation of banner images
 */
class BannerCarousel {
	constructor(config) {
		// Store configuration
		this.images = config.images;
		this.autoplayDuration = config.autoplayDuration;
		this.currentIndex = 0;
		this.interval = null;

		// Cache DOM elements
		this.skeleton = document.getElementById("bannerSkeleton");
		this.carousel = document.getElementById("bannerCarousel");
		this.imagesContainer = document.getElementById("imagesContainer");
		this.bannerText = document.querySelector(".banner-text");

		// Bind methods to preserve 'this' context
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.goToNext = this.goToNext.bind(this);
		this.goToPrevious = this.goToPrevious.bind(this);
	}

	/**
	 * Initialize the carousel
	 * Loads images and starts the autoplay sequence
	 */
	init() {
		this.loadImages();
		// Short delay before showing to ensure images have started loading
		setTimeout(() => {
			this.showCarousel();
			this.showBannerText();
			this.startAutoplay();
			this.addEventListeners();
		}, 500);
	}

	/**
	 * Hide skeleton loader and show the actual carousel
	 */
	showCarousel() {
		if (this.skeleton) this.skeleton.style.display = "none";
		if (this.carousel) this.carousel.classList.remove("hidden");
	}

	/**
	 * Create and append image elements for all carousel slides
	 */
	loadImages() {
		this.images.forEach((image, index) => {
			const img = document.createElement("img");
			img.src = image.src;
			img.alt = image.alt;
			img.className = `banner-image ${index === 0 ? "active" : ""}`;
			img.style.objectPosition = "center center";
			this.imagesContainer.appendChild(img);
		});
	}

	/**
	 * Trigger animation to show banner text overlay
	 */
	showBannerText() {
		if (this.bannerText) {
			this.bannerText.classList.add("visible");
		}
	}

	/**
	 * Start the autoplay rotation of banner images
	 */
	startAutoplay() {
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.interval = setInterval(this.goToNext, this.autoplayDuration);
	}

	/**
	 * Stop the autoplay rotation
	 */
	stopAutoplay() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	/**
	 * Rotate to the next image in the carousel
	 */
	goToNext() {
		const images = document.querySelectorAll(".banner-image");
		if (!images.length) return;

		images[this.currentIndex].classList.remove("active");
		this.currentIndex = (this.currentIndex + 1) % images.length;
		images[this.currentIndex].classList.add("active");
	}

	/**
	 * Rotate to the previous image in the carousel
	 */
	goToPrevious() {
		const images = document.querySelectorAll(".banner-image");
		if (!images.length) return;

		images[this.currentIndex].classList.remove("active");
		this.currentIndex = (this.currentIndex - 1 + images.length) % images.length;
		images[this.currentIndex].classList.add("active");
	}

	/**
	 * Handle keydown events for carousel navigation
	 */
	handleKeyDown(event) {
		if (event.key === "ArrowRight") {
			clearInterval(this.interval);
			this.goToNext();
			this.startAutoplay();
		} else if (event.key === "ArrowLeft") {
			clearInterval(this.interval);
			this.goToPrevious();
			this.startAutoplay();
		}
	}

	/**
	 * Add event listeners for carousel navigation
	 */
	addEventListeners() {
		document.addEventListener("keydown", this.handleKeyDown);
	}
}

// ==========================================================================
// 3. HEADER & NAVIGATION FUNCTIONALITY
// ==========================================================================

/**
 * Initialize header behavior
 * Handles scroll-based animations and transformations
 */
function initializeHeader() {
	const header = document.getElementById("header");
	const logoImg = document.getElementById("logo-img");
	const motto = document.getElementById("motto");

	// Set initial state
	header.classList.remove("fixed");

	// Add scroll event listener
	window.addEventListener("scroll", () => {
		const scrolled = window.scrollY > 50;

		// Toggle header appearance based on scroll position
		header.classList.toggle("bg-background/95", scrolled);
		header.classList.toggle("backdrop-blur-sm", scrolled);
		header.classList.toggle("shadow-sm", scrolled);
		header.classList.toggle("bg-background/80", !scrolled);
		header.classList.toggle("fixed", scrolled);

		// Animate logo size
		if (logoImg) {
			logoImg.classList.toggle("h-20", scrolled);
			logoImg.classList.toggle("h-24", !scrolled);
		}

		// Animate motto text size
		if (motto) {
			motto.classList.toggle("text-lg", scrolled);
			motto.classList.toggle("text-xl", !scrolled);
		}
	});
}

/**
 * Initialize navigation interaction effects
 * Handles desktop hover effects and mobile menu toggle
 */
function initializeNavigation() {
	const mobileNavToggle = document.getElementById("mobile-nav-toggle");
	const mobileNavClose = document.getElementById("mobile-nav-close");
	const mobileNav = document.getElementById("mobile-nav");
	const navItems = document.querySelectorAll(".nav-item");

	// Add hover effects for desktop navigation items
	navItems.forEach((item) => {
		const underline = item.querySelector(".nav-underline");

		item.addEventListener("mouseenter", () => {
			if (underline) {
				underline.style.opacity = "1";
			}
		});

		item.addEventListener("mouseleave", () => {
			if (underline) {
				underline.style.opacity = "0";
			}
		});
	});

	// Setup mobile navigation toggle
	if (mobileNavToggle) {
		mobileNavToggle.addEventListener("click", () => {
			if (mobileNav) {
				mobileNav.classList.remove("hidden");
				mobileNav.classList.add("active");
				document.body.style.overflow = "hidden"; // Prevent page scrolling
			}
		});
	}

	// Setup mobile navigation close button
	if (mobileNavClose) {
		mobileNavClose.addEventListener("click", () => {
			if (mobileNav) {
				mobileNav.classList.remove("active");
				mobileNav.classList.add("hidden");
				document.body.style.overflow = ""; // Restore page scrolling
			}
		});
	}
}

// ==========================================================================
// 4. ANIMATION & VISUAL EFFECTS
// ==========================================================================

/**
 * Initialize animations for social media icons
 */
function initializeSocialIcons() {
	const socialIcons = document.querySelectorAll(".social-icon");

	socialIcons.forEach((icon, index) => {
		// Set initial state
		icon.style.opacity = "0";
		icon.style.transform = "translateX(20px)";
		icon.style.transition = "opacity 0.3s, transform 0.3s";

		// Animate with staggered delay
		setTimeout(() => {
			icon.style.opacity = "1";
			icon.style.transform = "translateX(0)";
		}, index * 100);
	});
}

/**
 * Initialize page section animations
 * Uses Intersection Observer for scroll-based reveals
 */
function initializeSectionAnimations() {
	// Animate motto with immediate fade-in effect
	const motto = document.getElementById("motto");
	if (motto) {
		motto.style.opacity = "0";
		motto.style.transform = "translateY(-20px)";
		motto.style.transition = "opacity 0.5s, transform 0.5s";

		setTimeout(() => {
			motto.style.opacity = "1";
			motto.style.transform = "translateY(0)";
		}, 300);
	}

	// Add scroll-based animations for main sections
	if ("IntersectionObserver" in window) {
		// Select all major page sections
		const sections = document.querySelectorAll(
			"#about-section, #our-story-section, #product-preview, #contact-us"
		);

		// Configure the intersection observer
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fadeIn");
						sectionObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 } // Trigger when 10% of the element is visible
		);

		// Set initial state and observe each section
		sections.forEach((section) => {
			section.style.opacity = "0";
			section.style.transform = "translateY(20px)";
			section.style.transition = "opacity 0.5s ease, transform 0.5s ease";

			sectionObserver.observe(section);
		});

		// Add custom animation class to document head
		document.head.insertAdjacentHTML(
			"beforeend",
			`
        <style>
          .animate-fadeIn {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        </style>
      `
		);
	}
}

/**
 * Initialize all animations and visual effects
 */
function initializeAnimations() {
	initializeSocialIcons();
	initializeSectionAnimations();
}

// Update the scroll triggers
function initializeAboutSection() {
	// Initialize GSAP ScrollTrigger
	gsap.registerPlugin(ScrollTrigger);

	// Animate fade-up elements
	const fadeElements = document.querySelectorAll(".fade-up");
	fadeElements.forEach((el) => {
		ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			onEnter: () => el.classList.add("visible"),
			once: true,
		});
	});

	// Initialize Read More functionality
	const toggleButton = document.getElementById("toggle-button");
	const extraContent = document.getElementById("extra-content");
	let isExpanded = false;

	if (toggleButton && extraContent) {
		toggleButton.addEventListener("click", () => {
			isExpanded = !isExpanded;

			if (isExpanded) {
				extraContent.classList.remove("hidden");
				toggleButton.textContent = "Read Less";

				// Animate new content
				const newFadeElements = extraContent.querySelectorAll(".fade-up");
				newFadeElements.forEach((el) => {
					el.classList.add("visible");
				});
			} else {
				extraContent.classList.add("hidden");
				toggleButton.textContent = "Read More";

				// Scroll to section top
				document.getElementById("about-section").scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	}

	// Activate heading underline
	const headingTriggers = document.querySelectorAll(".heading-trigger");
	headingTriggers.forEach((trigger) => {
		ScrollTrigger.create({
			trigger: trigger,
			start: "top 80%",
			onEnter: () => trigger.classList.add("heading-active"),
			once: true,
		});
	});
}

// Add to your initialization functions
function initializeOurStorySection() {
	gsap.registerPlugin(ScrollTrigger);

	// Animate all fade-up elements
	const fadeElements = document.querySelectorAll("#our-story-section .fade-up");
	fadeElements.forEach((el) => {
		ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			onEnter: () => el.classList.add("visible"),
			once: true,
		});
	});

	// Add hover effects for philosophy cards
	const philosophyCards = document.querySelectorAll(
		"#our-story-section .hover\\:-translate-y-1"
	);
	philosophyCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			gsap.to(card, {
				y: -4,
				duration: 0.3,
				ease: "power2.out",
			});
		});

		card.addEventListener("mouseleave", () => {
			gsap.to(card, {
				y: 0,
				duration: 0.3,
				ease: "power2.out",
			});
		});
	});
}

// ==========================================================================
// 5. EVENT LISTENERS & INITIALIZATION
// ==========================================================================

/**
 * Initialize everything when DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
	// Initialize the banner carousel
	const carousel = new BannerCarousel(bannerConfig);
	carousel.init();

	// Initialize header behavior
	initializeHeader();

	// Initialize navigation
	initializeNavigation();

	// Initialize animations
	initializeAnimations();

	// Initialize about section
	initializeAboutSection();

	// Initialize our story section
	initializeOurStorySection();

	initializeProductCarousel();

	initializeContactForm();

	initializeMobileNav();

	initializeMobileHeader();
});

// Read More/Less Toggle
document.addEventListener("DOMContentLoaded", function () {
	const toggleButton = document.getElementById("toggle-button");
	const extraContent = document.getElementById("extra-content");
	let isExpanded = false;

	toggleButton.addEventListener("click", function () {
		if (isExpanded) {
			extraContent.classList.add("hidden");
			toggleButton.textContent = "Read More";

			// Scroll back to the section top
			document
				.getElementById("about-section")
				.scrollIntoView({ behavior: "smooth" });
		} else {
			extraContent.classList.remove("hidden");
			toggleButton.textContent = "Read Less";

			// Initialize animations for newly visible content
			const fadeElements = extraContent.querySelectorAll(".fade-up");
			fadeElements.forEach((el, index) => {
				setTimeout(() => {
					el.classList.add("visible");
				}, 100 * (index + 1));
			});
		}

		isExpanded = !isExpanded;
	});

	// Initialize GSAP ScrollTrigger for animations
	gsap.registerPlugin(ScrollTrigger);

	// Heading underline animation
	const headingTrigger = document.querySelector(".heading-trigger");
	ScrollTrigger.create({
		trigger: headingTrigger,
		start: "top 80%",
		onEnter: () => {
			headingTrigger.classList.add("heading-active");
		},
	});

	// Fade up animations
	const fadeElements = document.querySelectorAll(".fade-up");
	fadeElements.forEach((el, index) => {
		ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			onEnter: () => {
				setTimeout(() => {
					el.classList.add("visible");
				}, 100 * index);
			},
		});
	});

	function initializeProductCarousel() {
		const scrollerContent = document.querySelector(".scroller ul");
		if (!scrollerContent) return;

		// Clone the product cards for infinite scroll
		const originalCards = Array.from(scrollerContent.children);
		originalCards.forEach((card) => {
			const clone = card.cloneNode(true);
			scrollerContent.appendChild(clone);
		});

		// Optional: Add intersection observer to pause animation when out of view
		const scroller = document.querySelector(".scroller");
		if (scroller) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							scrollerContent.style.animationPlayState = "running";
						} else {
							scrollerContent.style.animationPlayState = "paused";
						}
					});
				},
				{ threshold: 0.1 }
			);
			observer.observe(scroller);
		}
	}

	function initializeContactForm() {
		const form = document.getElementById("contactForm");
		const formStatus = document.getElementById("formStatus");

		if (form) {
			form.addEventListener("submit", async (e) => {
				e.preventDefault();

				// Show loading state
				const submitButton = form.querySelector('button[type="submit"]');
				const originalButtonText = submitButton.innerHTML;
				submitButton.innerHTML = `
					<span class="flex items-center justify-center">
						<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Sending...
					</span>
				`;
				submitButton.disabled = true;

				try {
					// Simulate form submission (replace with your actual form handling logic)
					await new Promise((resolve) => setTimeout(resolve, 1500));

					// Show success message
					formStatus.innerHTML = "Message sent successfully!";
					formStatus.className =
						"mt-4 p-3 rounded-md text-center bg-green-100/20 text-green-400";
					formStatus.classList.remove("hidden");
					form.reset();
				} catch (error) {
					// Show error message
					formStatus.innerHTML = "Error sending message. Please try again.";
					formStatus.className =
						"mt-4 p-3 rounded-md text-center bg-red-100/20 text-red-400";
					formStatus.classList.remove("hidden");
				} finally {
					// Restore button state
					submitButton.innerHTML = originalButtonText;
					submitButton.disabled = false;
				}
			});
		}
	}

	// Reveal container animations
	const revealContainers = document.querySelectorAll(".reveal-container");
	revealContainers.forEach((container) => {
		const elements = container.querySelectorAll("*");

		ScrollTrigger.create({
			trigger: container,
			start: "top 80%",
			onEnter: () => {
				elements.forEach((el, index) => {
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						delay: 0.1 * index,
						ease: "power3.out",
					});
				});
			},
		});
	});
});

// Update initializeMobileNav function
function initializeMobileNav() {
	const mobileMenuButton = document.getElementById("mobile-menu-button");
	const mobileNav = document.getElementById("mobile-nav");
	const mobileNavLogo = document.getElementById("mobile-nav-logo");
	const mobileNavSocial = document.getElementById("mobile-nav-social");
	const navLinks = document.querySelectorAll(".nav-link");
	const closeButton = document.getElementById("mobile-menu-close");

	if (closeButton) {
		closeButton.addEventListener("click", () => {
			if (isOpen) toggleMenu();
		});
	}

	let isOpen = false;

	if (!mobileMenuButton || !mobileNav) {
		console.error("Mobile nav elements not found");
		return;
	}

	function toggleMenu() {
		isOpen = !isOpen;

		// Update menu icon
		mobileMenuButton.innerHTML = isOpen
			? '<i class="ti ti-x text-3xl"></i>'
			: '<i class="ti ti-menu-2 text-3xl"></i>';

		// Toggle menu visibility with transition
		mobileNav.style.transform = isOpen ? "translateX(0)" : "translateX(100%)";

		if (isOpen) {
			// Show overlay
			mobileNav.classList.add("pointer-events-auto");
			document.body.classList.add("overflow-hidden");

			// Animate elements in
			setTimeout(() => {
				if (mobileNavLogo) mobileNavLogo.style.opacity = "1";

				// Animate nav links with delay
				navLinks.forEach((link, index) => {
					setTimeout(() => {
						link.style.transform = "translateX(0)";
						link.style.opacity = "1";
					}, 100 * (index + 1));
				});

				// Animate social icons
				if (mobileNavSocial) {
					setTimeout(() => {
						mobileNavSocial.style.opacity = "1";
					}, 500);
				}
			}, 300);
		} else {
			// Hide overlay
			mobileNav.classList.remove("pointer-events-auto");
			document.body.classList.remove("overflow-hidden");

			// Reset animations
			if (mobileNavLogo) mobileNavLogo.style.opacity = "0";
			if (mobileNavSocial) mobileNavSocial.style.opacity = "0";
			navLinks.forEach((link) => {
				link.style.transform = "translateX(2rem)";
				link.style.opacity = "0";
			});
		}
	}

	// Add click event listener
	mobileMenuButton.addEventListener("click", toggleMenu);

	// Close menu when clicking links
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (isOpen) toggleMenu();
		});
	});

	// Close menu on escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) toggleMenu();
	});
}

// Make sure to call initializeMobileNav when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	initializeMobileNav();
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const targetId = this.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		if (targetElement) {
			// Close mobile menu if open
			const mobileNav = document.getElementById("mobile-nav");
			if (mobileNav && mobileNav.classList.contains("pointer-events-auto")) {
				document.getElementById("mobile-menu-button").click();
			}

			// Smooth scroll to target
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

// Add to your existing initialization code
function initializeMobileHeader() {
	const mobileHeader = document.querySelector(".fixed");

	if (mobileHeader) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 10) {
				mobileHeader.classList.add("mobile-header-shadow");
			} else {
				mobileHeader.classList.remove("mobile-header-shadow");
			}
		});
	}
}
