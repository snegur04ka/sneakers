// const tl = gsap.timeline()

//     const pageOut = (container) => {
//         return tl.to(container, {
//             height: "0px",
//             duration: 1,
//         })
//     }

//     const pageIn = (container) => {
//         return tl.from(container, {
//             height: "0px",
//             duration: 1,
//         })
//     }

// barba.init({
    // transitions: [
    //     {
    //         name: "catalog",
    //         async leave(data) {
    //             document.body.style.overflow = "hidden"
    //             await pageOut(data.current.container)
    //             data.current.container.remove()
    //         },
    //         async enter(data) {
    //             await pageIn(data.next.container)
    //             document.body.style.overflow = "visible"
    //         }
    //     }
    // ]
// })