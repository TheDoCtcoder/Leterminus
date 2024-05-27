document.addEventListener("DOMContentLoaded", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition > (pageHeight - windowHeight) / 2) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function() {
        scrollToTop(500); // Adjust the duration as needed (1000ms = 1s)
    });

    function scrollToTop(duration) {
        const start = window.scrollY;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const destinationOffset = 0;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            return;
        }

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = time * (2 - time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

            if (window.scrollY === destinationOffsetToScroll) {
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    }
});