const fav = []
const cart = []

const deleteCardItem = async (id) => {
    await fetch("http://localhost:3000/cart/" + id, {
        method: "DELETE"
    })
}

const deleteFav = async (id) => {
    await fetch("http://localhost:3000/fav/" + id, {
        method: "DELETE"
    })
}

const animCards = () => {
    gsap.from(".card", {
        duration: 0.5,
        opacity: 0,
        y: 30,
        delay: 0.5,
        stagger: 0.2,
    })
}

const AddFav = async () => {
    // const result = await fetch("http://localhost:3000/goods")
    // const dataa = await result.json()

    const res = await fetch("http://localhost:3000/fav")
    const data = await res.json()

    const response = await fetch("http://localhost:3000/cart")
    const date = await response.json()

    date.forEach(item => cart.push(item))

    data.forEach(item => fav.push(item))

    const FavContent = document.querySelector(".favorites__content")

    const handleAdd = () => {
        const addFav = document.querySelectorAll(".card__liked")
        const addCart = document.querySelectorAll(".card__added")
        addFav.forEach((item) => {
            item.addEventListener("click", () => {
                item.classList.toggle("active")
            })
        })
        addCart.forEach((item) => {
            item.addEventListener("click", () => {
                item.classList.toggle("active")
            })
        })

        const addCard = FavContent.querySelectorAll(".addCardItem")

        const AddCardItem = async (id) => {
            await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data.find(item => +item.id === +id))
            })

        }
        const AddCardFav = async (id) => {
            await fetch("http://localhost:3000/fav", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data.find(item => +item.id === +id))
            })
        }



        addCard.forEach(cartAdd => {
            cartAdd.addEventListener("click", () => {
                const itemId = cartAdd.parentElement.parentElement.parentElement.dataset.id
                cart.push(data.find(item => +item.id === +itemId))
                AddCardItem(itemId)
                renderCartItems()
            })
        })

        const deleteCard = FavContent.querySelectorAll(".deleteCardItem")

        deleteCard.forEach(cartDelete => {
            cartDelete.addEventListener("click", () => {
                const itemId = cartDelete.parentElement.parentElement.parentElement.dataset.id
                // fillterCart(itemId)
                deleteCardItem(itemId)
                renderFavItems()
            })
        })

        const addCardFav = document.querySelectorAll(".addCardFav")
        const deleteCardFav = document.querySelectorAll(".deleteCardFav")

        addCardFav.forEach(favAdd => {
            favAdd.addEventListener("click", () => {
                const itemId = favAdd.parentElement.parentElement.parentElement.dataset.id
                AddCardFav(itemId)
            })
        })
        deleteCardFav.forEach(cartDelete => {
            cartDelete.addEventListener("click", () => {
                const itemId = cartDelete.parentElement.parentElement.parentElement.dataset.id
                deleteFav(itemId)
            })
        })
    }

    const RenderFavItems = () => {
        fav.forEach((item) => {
            FavContent.innerHTML += `
            <div data-id="${item.id}" class="card">
                <div class="card__top">
                <div class="card__liked active">
                    <img class="addCardFav" src="./assets/img/unlike.svg" alt="">
                    <img class="deleteCardFav" src="./assets/img/like.svg" alt="">
                </div>
                    <img class="card__img" src="${item.imgURL}" alt="">
                </div>
                <h2>${item.name}</h2>
                <div class="card__bottom">
                    <div class="price">
                        Цена:
                        <p>${item.price} руб.</p>
                    </div>
                 
                </div>
            </div>
            `
            //     <div class="card__added">
            //     <img class="addCardItem" src="./assets/img/add.svg" alt="">
            //     <img class="deleteCardItem" src="./assets/img/added.svg" alt="">
            // </div>

        })
        // const proverka = () => {
        //     const cardItems = document.querySelectorAll(".card")
        //     dataa.forEach((item) => {
        //     console.log(cardItems);
        //         console.log(item);
        //         fav.forEach((cardItem) => {
        //             if (cardItem.id === itemm.id) {
        //                 cardItems[itemm.id].querySelector(".card__liked").classList.add("active")
        //             }
        //         })
        //         cart.forEach((cardItem) => {
        //             console.log(cardItem);
        //             if (cardItem.id === cardItems[item.id].dataset.id - 0) {
        //                 cardItems[item.id].querySelector(".card__added").classList.add("active")
        //             }
        //         })
        //         cart.forEach(cardItem => {
        //             console.log(cardItem);
        //         })
        //     })
        //     }
        animCards()
        handleAdd()
        // proverka()
    }
    RenderFavItems()
}

AddFav()

