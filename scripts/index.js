 // Function to handle the intersection
 function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If the element is visible, add the class
        entry.target.classList.add('slide-up');
        // Stop observing the element after adding the class (optional)
        observer.unobserve(entry.target);
      }
    });
  }

  // Get all elements to watch
  const elementsToWatch = document.querySelectorAll('.slide-animation');

  // Loop through each element and create an Intersection Observer for it
  elementsToWatch.forEach(elementToWatch => {
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(elementToWatch);
  });

  $(document).ready(function () {
    // Target the scroll-container
    const scrollContainer = document.getElementById("scroll-container");

    // Variables to keep track of dragging
    let isDragging = false;
    let startPosition = 0;
    let scrollLeft = 0;

    // Mouse down event
    scrollContainer.addEventListener("mousedown", (e) => {
      isDragging = true;
      startPosition = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    // Mouse up event
    scrollContainer.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Mouse move event
    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startPosition) * 2; // Adjust the scrolling speed as needed
      scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Prevent text selection while dragging
    scrollContainer.addEventListener("selectstart", (e) => {
      e.preventDefault();
    });
  });

  $(document).ready(function () {
    // Target the scroll-container
    const scrollContainer = document.getElementById("scroll-container");

    // Function for auto-scrolling
    function autoScroll() {
      // Get the current scroll position
      let scrollLeft = scrollContainer.scrollLeft;

      // Scroll one pixel to the right (adjust the scrolling speed as needed)
      scrollContainer.scrollLeft += 1;

      // If the container has reached the end, reset the scroll position to the start
      if (scrollLeft === scrollContainer.scrollLeft) {
        scrollContainer.scrollLeft = 0;
      }
    }

    // Start auto-scrolling every 20 milliseconds (adjust the speed as needed)
    setInterval(autoScroll, 20);
  });

  //BookmarkLogic
  document.getElementById('scrollToBookmark').addEventListener('click', function() {
    scrollToBookmark('section2');
  });
  
  function scrollToBookmark(bookmarkId) {
    const bookmarkElement = document.getElementById(bookmarkId);
    if (bookmarkElement) {
      const offsetTop = bookmarkElement.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
  window.addEventListener("unload", () => {
    setTimeout(() => {
        localStorage.clear();
    }, 0);
});
  

function toggleAction() {
  const adminusername = document.getElementById("admin_username")
const adminpassword = document.getElementById("admin_password")
  const checkbox = document.getElementById("toggleCheckbox");
  if (checkbox.checked) {
     const user = localStorage.getItem("username");
     const pass = localStorage.getItem("password");
     adminusername.value = user;
     adminpassword.value = pass;
  } else {
      
      console.log("Checkbox is unchecked.");
  }
}