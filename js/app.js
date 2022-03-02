// main text fields--------------------------
const main = document.getElementById('main')
const box = document.getElementById('details-box')
const error = document.getElementById('error')
// spinner & Show More display------------------------------------
const showSpinner = display => {
    document.getElementById('spinner').style.display = display
}
// load search data---------------------------
const loadPhones = () => {
    const input = document.getElementById('input-value')
    const textKey = input.value
    showSpinner('block')
    // input validation-----------------------
    if (input.value == '') {
        main.textContent = ''
        box.textContent = ''
        showSpinner('none')
        error.innerHTML = `Please enter a valid name.`
    }
    else {
        input.value = ''
        error.textContent = ''
        //case convertion-----------------------
        const searchText = textKey.toLowerCase()
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // result validation------------
                if (data.data == '') {
                    main.textContent = ''
                    box.textContent = ''
                    showSpinner('none')
                    error.innerHTML = `No result found.`
                }
                else { displayPhones(data.data) }
            })
    }
}
//disply result-----------------------------------------
const displayPhones = phones => {
    main.textContent = ''
    box.textContent = ''
    showSpinner('none')
    // load first 20 data-------------------------------
    const first20Data = phones.slice(0, 20)
    for (const phone of first20Data) {
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('my-4')
        div.innerHTML = `
                <div class="card shadow">
                    <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-3" alt="">
                    <div class="card-body">
                        <h5 class="card-title text-center">Name: ${phone.phone_name}</h5>
                        <p class="card-text text-center text-success">Brand: ${phone.brand}</p>
                        <div class="text-center">
                        <a href="#details-box"><button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary w-50">See Details</button></a>
                        </div>
                    </div>
                </div>
        `
        main.appendChild(div)
    }
}
// show phone details----------------------------------------
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.data))
}
const setDetails = details => {
    box.textContent = ''
    const div = document.createElement('div')
    div.classList.add('my-4')
    // relase date validation--------------------------------
    if (details.releaseDate == '') {
        details.releaseDate = 'Release date not found.'
    }
    else { details.releaseDate }
    //Using optional chaining-------------------------------
    div.innerHTML = `
        <div class="card shadow">
        <div class="row g-0">
            <div class="col-lg-6">
            <img id="detail-image" src="${details.image}" class="w-100" alt="">
            </div>
            <div class="col-lg-6">
            <div class="card-body">
                <h3 class="card-title"><span class="text-primary">Name:</span>  ${details.name}</h3>
                <h5 class="card-text"><span class="text-primary" id="release">Release date: </span>${details?.releaseDate}</h5>
                <h5 class="card-text text-primary">Main Features:</h5>
                <p>Chipset: ${details.mainFeatures?.chipSet}</p>
                <p>Storage: ${details.mainFeatures?.storage}</p>
                <p>Memory: ${details.mainFeatures?.memory}</p>
                <p>Display: ${details.mainFeatures?.displaySize}</p>
                <h5 class="card-text text-primary">Sensors:</h5>
                <p>${details.mainFeatures.sensors}</p>
                <h5 class="card-text text-primary">Others:</h5>
                <p>WLAN: ${details?.others?.WLAN ?? "Details not available."}</p>
                <p>Bluetooth: ${details?.others?.Bluetooth ?? "Details not available."}</p>
                <p>GPS: ${details?.others?.GPS ?? "Details not available."}</p>
                <p>NFC: ${details?.others?.NFC ?? "Details not available."}, Radio: ${details?.others?.Radio ?? "Details not available."}</p>
            </div>
            </div>
        </div>
        </div>
    `
    box.appendChild(div)
}
