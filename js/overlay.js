const overlayFunc = () => {
    const openOverlay = document.querySelector(".openOverlay")
    const closeOverlay = document.querySelector(".closeOverlay")
    const overlay = document.querySelector(".overlay")
    // const closeEmpty = document.querySelector(".empty__btn")

    openOverlay.addEventListener("click", () => {
        overlay.classList.add("active")
        document.body.style.overflow = "hidden"
    })
    closeOverlay.addEventListener("click", () => {
        overlay.classList.remove("active")
        document.body.style.overflow = "visible"
    })
    // closeEmpty.addEventListener("click", () => {
    //     overlay.classList.remove("active")
    //     document.body.style.overflow = "visible"
    // })

}
export default overlayFunc