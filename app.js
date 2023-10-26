/* Smooth Scrolling using locomotive */
const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

/* Custom Mouse Follower */
const mouseFollower = document.querySelector(".mouseFollower");

function circleMouseFollower(scaleX = 1, scaleY = 1) {
    window.addEventListener("mousemove", ({
        clientX,
        clientY
    }) => {
        mouseFollower.style.transform = `
            translate(${clientX - 6}px, ${clientY - 6}px) scale(${scaleX}, ${scaleY})
        `;
    });
}

/* First Page Animations using GSAP */
const tl = gsap.timeline();

tl.from(".navbar", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        ease: Expo.easeInOut,
    })
    .to(".boundingElem", {
        y: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: Expo.easeInOut,
    })
    .from(".hero-footer", {
        opacity: 0,
        ease: Expo.easeInOut,
    });

/* Mouse Follower Skew Effect while moving mouse pointer */
let timeout;

function mouseFollowerSkew() {
    let scaleX = 1;
    let scaleY = 1;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener("mousemove", (e) => {
        clearTimeout(timeout);
        scaleX = gsap.utils.clamp(0.6, 1.4, e.clientX - prevX);
        scaleY = gsap.utils.clamp(0.6, 1.4, e.clientY - prevY);
        prevX = e.clientX;
        prevY = e.clientY;

        circleMouseFollower(scaleX, scaleY);

        timeout = setTimeout(() => {
            mouseFollower.style.transform = `
                translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(1, 1)`;
        }, 150);
    });
}

circleMouseFollower();
mouseFollowerSkew();

/* Work Items hover effect on moving mouse pointer for showing and animated images */
document.querySelectorAll(".work-item").forEach((item) => {
    let rotate = 0;
    let diffRotate = 0;

    item.addEventListener("mouseleave", () => {
        gsap.to(item.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    item.addEventListener("mousemove", (e) => {
        const diff = e.clientY - item.getBoundingClientRect().top;
        diffRotate = e.clientX - rotate;
        rotate = e.clientX;

        gsap.to(item.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: e.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffRotate * 0.5),
        });
    });
});