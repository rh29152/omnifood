/***************************************/
/* Add dynmic year to footer copyright */
/***************************************/

const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

/************************************/
/*scrolling disable while nav open  */
/***********************************/
function toggleScrollBlock() {
  const html = document.documentElement;
  const body = document.body;
  const isBlocked =
    html.style.overflow === "hidden" && body.style.overflow === "hidden";
  if (isBlocked) {
    html.style.overflow = "";
    body.style.overflow = "";
  } else {
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  }
}

/****************************/
/* Mobile nav functionality */
/****************************/

const navEL = document.querySelector(".mobile-nav");
const headerEL = document.querySelector(".header");

navEL.addEventListener("click", function () {
  headerEL.classList.toggle("nav-open");
  toggleScrollBlock();
});

/****************************/
/*Smooth Scrolling effect   */
/****************************/

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // scroll to homepage
    if (href === "#") {
      console.log("hello");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    //scroll to all other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // hide mobile nav after click
    if (link.classList.contains("header__nav-link")) {
      headerEL.classList.toggle("nav-open");
      toggleScrollBlock();
    }
  });
});

/****************************/
/*Sticky header after hero  */
/****************************/

const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //viewport observation parameter
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);

// if (document.querySelector(".header").classList.contains("nav-open")) {
//   console.log("hello wolrd");
// }

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
