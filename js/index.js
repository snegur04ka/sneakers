import overlayFunc from "./overlay.js"

const catalogContent = document.querySelector(".catalog__content")
const searchInput = document.querySelector(".catalog__search")

const fav = []
import { cart, renderCartItems, deleteCardItem } from "./renderCartItems.js"
import { renderSkeleton } from "./renderSkeleton.js"

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
    const res = await fetch("http://localhost:3000/fav")
    const data = await res.json()
    data.forEach(item => fav.push(item))
}
const deleteFav = async (id) => {
    await fetch("http://localhost:3000/fav/" + id, {
        method: "DELETE"
    })
}

const response = async () => {
    const result = await fetch("http://localhost:3000/goods")
    const data = await result.json()

    renderCartItems()
    AddFav()

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

        const addCard = catalogContent.querySelectorAll(".addCardItem")

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

        const deleteCard = catalogContent.querySelectorAll(".deleteCardItem")

        deleteCard.forEach(cartDelete => {
            cartDelete.addEventListener("click", () => {
                const itemId = cartDelete.parentElement.parentElement.parentElement.dataset.id
                // fillterCart(itemId)
                deleteCardItem(itemId)
                renderCartItems()
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

    const renderGoods = (a) => {
        renderSkeleton()

        setTimeout(() => {
            catalogContent.innerHTML = ""
            a.forEach(item => {
                catalogContent.innerHTML += `
                <div data-id="${item.id}" class="card">
                    <div class="card__top">
                    <div class="card__liked">
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
                        <div class="card__added">
                            <img class="addCardItem" src="./assets/img/add.svg" alt="">
                            <img class="deleteCardItem" src="./assets/img/added.svg" alt="">
                        </div>
                    </div>
               </div>
        `
                const cardItems = document.querySelectorAll(".card")
                fav.forEach(cardItem => {
                    if (cardItem.id === item.id) {
                        cardItems[item.id].querySelector(".card__liked").classList.add("active")
                    }
                })
                cart.forEach(cardItem => {
                    if (cardItem.id === item.id) {
                        cardItems[item.id].querySelector(".card__added").classList.add("active")
                    }
                })

                
            });
            animCards()
            handleAdd()
        }, 500)
    }

    renderGoods(data)



    searchInput.addEventListener("keypress", () => {
        const inputsText = searchInput.value

        catalogContent.innerHTML = ""

        if (searchInput.value.trim() === "") {
            renderGoods(data)
        } else {
            const filteredGoods = data.filter(item => item.name.toLowerCase().includes(inputsText.trim().toLowerCase()))
            renderGoods(filteredGoods)
        }
    })

    return data
}

response()

overlayFunc()