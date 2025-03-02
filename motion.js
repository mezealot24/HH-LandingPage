document.addEventListener("DOMContentLoaded", () => {
	// Apply reveal-on-scroll class and animation type to elements

	// Section titles
	document.querySelectorAll(".mb-16.text-center h2").forEach((el) => {
		el.classList.add("reveal-on-scroll");
		el.dataset.animation = "animate-fade-in";
	});

	// Heritage section
	const mainSlogan = document.getElementById("main-slogan");
	if (mainSlogan) {
		// Image
		const image = mainSlogan.querySelector(".rounded-xl");
		if (image) {
			image.classList.add("reveal-on-scroll");
			image.dataset.animation = "animate-slide-right";
		}

		// Text content
		const content = mainSlogan.querySelector(".flex-col");
		if (content) {
			content.classList.add("reveal-on-scroll");
			content.dataset.animation = "animate-slide-left";
		}
	}

	// Thai Wisdom section
	const thaiWisdom = document.getElementById("thai-wisdom");
	if (thaiWisdom) {
		// Text content
		const content = thaiWisdom.querySelector(".flex-col");
		if (content) {
			content.classList.add("reveal-on-scroll");
			content.dataset.animation = "animate-slide-right";
		}

		// Image
		const image = thaiWisdom.querySelector(".rounded-xl");
		if (image) {
			image.classList.add("reveal-on-scroll");
			image.dataset.animation = "animate-slide-left";
		}
	}

	// Royal Initiative section
	const royalInitiative = document.getElementById("royal-initiative");
	if (royalInitiative) {
		// Image
		const image = royalInitiative.querySelector(".rounded-xl");
		if (image) {
			image.classList.add("reveal-on-scroll");
			image.dataset.animation = "animate-slide-right";
		}

		// Text content
		const content = royalInitiative.querySelector(".flex-col");
		if (content) {
			content.classList.add("reveal-on-scroll");
			content.dataset.animation = "animate-slide-left";
		}
	}

	// Community Support section
	const communitySupport = document.getElementById("community-support");
	if (communitySupport) {
		// Text content
		const content = communitySupport.querySelector(".flex-col");
		if (content) {
			content.classList.add("reveal-on-scroll");
			content.dataset.animation = "animate-slide-right";
		}

		// Image
		const image = communitySupport.querySelector(".rounded-xl");
		if (image) {
			image.classList.add("reveal-on-scroll");
			image.dataset.animation = "animate-slide-left";
		}
	}

	// Brand Values section
	const brandValues = document.getElementById("brand-values");
	if (brandValues) {
		// Logo
		const logo = brandValues.querySelector("img");
		if (logo) {
			logo.classList.add("reveal-on-scroll");
			logo.dataset.animation = "animate-scale";
		}

		// Text content
		const content = brandValues.querySelector("div:last-child");
		if (content) {
			content.classList.add("reveal-on-scroll");
			content.dataset.animation = "animate-fade-in";
		}
	}

	// Value Cards
	const valueCards = document.querySelectorAll("#value-cards > div");
	valueCards.forEach((card, index) => {
		card.classList.add("reveal-on-scroll");
		card.dataset.animation = "animate-slide-up";

		// Add different delays to create a staggered effect
		if (index === 1) {
			card.classList.add("animation-delay-300");
		} else if (index === 2) {
			card.classList.add("animation-delay-500");
		}
	});

	// Initialize the IntersectionObserver
	const revealElements = document.querySelectorAll(".reveal-on-scroll");

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const revealCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const animationClass =
					entry.target.dataset.animation || "animate-fade-in";
				entry.target.classList.add(animationClass);
				entry.target.style.visibility = "visible";
				observer.unobserve(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(revealCallback, options);

	revealElements.forEach((element) => {
		observer.observe(element);
	});
});
