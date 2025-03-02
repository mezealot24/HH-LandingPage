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
			img.className = `banner-image`;
			img.style.objectPosition = "center center";

			// Make first image active immediately
			if (index === 0) {
				img.classList.add("active");
			}

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
	const motto = document.getElementById("motto");
	const menuContainer =
		document.querySelector(".nav-item").parentElement.parentElement
			.parentElement;

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

		// Don't change logo size when scrolling
		// Keep logo at consistent size

		// Hide motto when scrolled
		if (motto) {
			motto.style.opacity = scrolled ? "0" : "1";
			motto.style.height = scrolled ? "0" : "auto";
			motto.style.visibility = scrolled ? "hidden" : "visible";
		}

		// Move menu up to center position when scrolled
		if (menuContainer) {
			menuContainer.style.marginTop = scrolled ? "-64px" : "0";
			menuContainer.style.transition = "margin-top 0.3s ease";
		}
	});
}

/**
 * Initialize navigation interaction effects
 * Handles desktop hover effects and mobile menu toggle
 */
function initializeNavigation() {
	const mobileNavToggle = document.getElementById("mobile-menu-button");
	const mobileNavClose = document.getElementById("mobile-menu-close");
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
				mobileNav.classList.add("active");
				document.body.classList.add("overflow-hidden"); // Prevent page scrolling
			}
		});
	}

	// Setup mobile navigation close button
	if (mobileNavClose) {
		mobileNavClose.addEventListener("click", () => {
			if (mobileNav) {
				mobileNav.classList.remove("active");
				document.body.classList.remove("overflow-hidden"); // Restore page scrolling
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

	// Initialize GSAP ScrollTrigger
	gsap.registerPlugin(ScrollTrigger);

	// Hero animations
	gsap.to("#hero-title", { opacity: 1, y: 0, duration: 1, delay: 0.3 });
	gsap.to("#hero-subtitle", { opacity: 1, y: 0, duration: 1, delay: 0.6 });
	gsap.to("#hero-button", { opacity: 1, y: 0, duration: 1, delay: 0.9 });

	// Intro card animation
	gsap.from("#intro-card", {
		scrollTrigger: {
			trigger: "#intro-card",
			start: "top bottom-=100",
		},
		x: -50,
		opacity: 0,
		duration: 0.8,
	});

	// Center image animation
	gsap.from("#center-image", {
		scrollTrigger: {
			trigger: "#center-image",
			start: "top bottom-=100",
		},
		y: 50,
		opacity: 0,
		duration: 0.8,
		delay: 0.2,
	});

	// Royal card animation
	gsap.from("#royal-card", {
		scrollTrigger: {
			trigger: "#royal-card",
			start: "top bottom-=100",
		},
		x: 50,
		opacity: 0,
		duration: 0.8,
		delay: 0.4,
	});

	// Gallery grid animation
	const galleryItems = document.querySelectorAll(
		"#gallery-grid .image-container"
	);
	galleryItems.forEach((item, index) => {
		gsap.from(item, {
			scrollTrigger: {
				trigger: item,
				start: "top bottom-=50",
			},
			y: 30,
			opacity: 0,
			duration: 0.6,
			delay: 0.1 * index,
		});
	});

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});
	// Initialize Read More functionality
	/* const toggleButton = document.getElementById("toggle-button");
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
	} */

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

	// Initialize mobile navigation
	initializeMobileNav();

	// Initialize mobile header
	initializeMobileHeader();

	// Initialize product carousel
	/* 	if (document.querySelector(".scroller")) {
		initializeProductCarousel();
	} */

	// Initialize contact form
	/* 	if (document.getElementById("contactForm")) {
		initializeContactForm();
	} */
});

// Read More/Less Toggle
/* document.addEventListener("DOMContentLoaded", function () {
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
	}); */

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

/* 	function initializeProductCarousel() {
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
	} */

/* 	function initializeContactForm() {
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
	} */

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

// Function to open product modal with expanded story functionality
function openProductModal(productId) {
	const product = productData[productId];
	if (!product) return;

	const modal = document.createElement("div");
	modal.className =
		"product-modal fixed inset-0 bg-black/70 flex items-center justify-center z-50";
	modal.innerHTML = `
	  <div class="modal-content modal-enter bg-tea-bg max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">
		<button class="absolute top-4 right-4 text-tea-text-secondary" onclick="closeModal(this)">
		  <i class="ti ti-x text-2xl"></i>
		</button>
		
		<div class="relative mb-6">
		  <img src="${product.image}" alt="${product.name}" 
			   class="w-full h-64 object-cover rounded-xl">
		  <div class="absolute top-4 left-0 bg-[${
				product.color
			}] px-4 py-2 text-white font-bold">
			${product.name.toUpperCase()}
		  </div>
		  <div class="absolute bottom-0 left-0 w-full text-center text-sm py-1 bg-[${
				product.color
			}]/80 text-white">
			${product.subtitle}
		  </div>
		</div>
		
		<div class="space-y-6">
		  <div>
			<span class="text-[#CFC9C0] font-medium text-[0.8rem] tracking-[0.5em] uppercase">
			  ${product.category}
			</span>
			<h3 class="font-stix gold-accent font-bold text-2xl my-2">
			  ${product.name}
			</h3>
		  </div>
  
		  <div>
			<span class="text-sm font-medium">Wellness Benefits</span>
			<p class="text-tea-text-secondary text-sm">${product.wellnessBenefits}</p>
		  </div>
		  
		  <div>
			<span class="text-sm font-medium">Ingredients</span>
			<ul class="tea-ingredients-list mt-1">
			  ${product.ingredients
					.map(
						(ingredient) =>
							`<li class="text-tea-text-secondary text-sm">${ingredient}</li>`
					)
					.join("")}
			</ul>
		  </div>
		  
		  <div>
			<span class="text-sm font-medium">Our Story</span>
			<div class="story-container mt-2">
			  <p class="text-tea-text-secondary text-sm story-content">${product.story.substring(
					0,
					150
				)}...<span class="hidden full-story">${product.story.substring(
		150
	)}</span></p>
			  <button class="story-toggle text-[${
					product.color
				}] text-sm font-medium mt-1" onclick="toggleStory(this)">Read more</button>
			</div>
		  </div>
		</div>
	  </div>
	`;

	document.body.appendChild(modal);
	document.body.style.overflow = "hidden";

	// Close on backdrop click
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal(modal);
		}
	});
}

function closeModal(element) {
	const modal = element.closest(".product-modal");
	modal.classList.add("modal-exit");

	setTimeout(() => {
		modal.remove();
		document.body.style.overflow = "";
	}, 300);
}

function toggleStory(button) {
	const storyContainer = button.closest(".story-container");
	const fullStory = storyContainer.querySelector(".full-story");

	if (fullStory.classList.contains("hidden")) {
		fullStory.classList.remove("hidden");
		button.textContent = "Read less";
	} else {
		fullStory.classList.add("hidden");
		button.textContent = "Read more";
	}
}

// Add CSS for modal animations
const style = document.createElement("style");
style.textContent = `
	.modal-enter {
	  animation: modalFadeIn 0.3s ease-out forwards;
	}
	
	.modal-exit {
	  animation: modalFadeOut 0.3s ease-out forwards;
	}
	
	@keyframes modalFadeIn {
	  from { opacity: 0; transform: scale(0.95); }
	  to { opacity: 1; transform: scale(1); }
	}
	
	@keyframes modalFadeOut {
	  from { opacity: 1; transform: scale(1); }
	  to { opacity: 0; transform: scale(0.95); }
	}
  `;
document.head.appendChild(style);
