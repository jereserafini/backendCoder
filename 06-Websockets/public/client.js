const socket = io()

//DOM
//Messages
const messagesForm = document.querySelector('#messagesForm')
const messagesPool = document.querySelector('#messagesPool')
const emailInput = document.querySelector('#emailInput')
const messageInput = document.querySelector('#messageInput')

//Products
const productsForm = document.querySelector('#productsForm')
const titleInput = document.querySelector('#titleInput')
const priceInput = document.querySelector('#priceInput')
const thumbnailInput = document.querySelector('#thumbnailInput')

//Functions

//Products
const sendProduct = (product) => {
    socket.emit('client:product', product)
}

const handleSumbitProducts = (event) => {
    event.preventDefault()

    const product = {
        title: titleInput.value,
        price: priceInput.value,
        thumbnail: thumbnailInput.value
    }

    document.querySelector('#listProducts').innerHTML = ''

    sendProduct(product)
}

const renderProducts = async (products) => {
    const response = await fetch('./listProducts.hbs')
    const listProducts = await response.text()

    products.forEach( prod => {
        const template = Handlebars.compile(listProducts)
        const html = template(prod)
        document.querySelector('#listProducts').innerHTML += html
    });
}


//Messages
const sendMessage = (messageInfo) => {
    socket.emit('client:message', messageInfo)
}

const handleSumbitMsg = (event) => {
    event.preventDefault()

    let date = new Date();
    
    const messageInfo = {
        email: emailInput.value,
        message: messageInput.value,
        date: date.toLocaleString("fr-FR")
    }
    
    sendMessage(messageInfo)
}


const renderMessages = (messages) => {
    const html = messages.map( msg => {
        return(`<div>
        <strong>${msg.email}</strong>
        <span class='text-warning'>[${msg.date}]</span>:
        <em>${msg.message}</em> </div>`)
    }).join(' ')
    console.log(html);
    messagesPool.innerHTML = html
}


//Events

//Messages
socket.on('server:messages', renderMessages)
messagesForm.addEventListener('submit', handleSumbitMsg)


//Products
socket.on('server:products', renderProducts)
productsForm.addEventListener('submit', handleSumbitProducts)


