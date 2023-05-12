export const renderSkeleton = () => {
    const catalogContent = document.querySelector(".catalog__content");

        catalogContent.innerHTML = `
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">                  
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        <img class="skeleton" src="./assets/img/skeleton.png" alt="">
        `

    
}