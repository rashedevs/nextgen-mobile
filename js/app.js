// main text fields--------------------------
const main = document.getElementById('main')
const box = document.getElementById('details-box')
const error = document.getElementById('error')
// load search data---------------------------
const loadPhones = () => {
    const input = document.getElementById('input-value')
    const textKey = input.value
    // input validation-----------------------
    if (input.value == '') {
        main.textContent = ''
        error.innerHTML = `Please enter a valid name or model.`
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
                    error.innerHTML = `No phone found.`
                }
                else { displayPhones(data.data) }
            })
    }
}
const displayPhones = phones => {
    // console.log(phones)
    main.textContent = ''
    box.textContent = ''
    const first20Data = phones.slice(0, 20)
    for (const phone of first20Data) {
        // console.log(phone)
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
const phoneDetails = id => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.data))
}
const setDetails = details => {
    console.log(details.mainFeatures.sensors)
    box.textContent = ''
    const div = document.createElement('div')
    div.classList.add('my-4')
    div.innerHTML = `
        <div class="card shadow">
        <div class="row g-0">
            <div class="col-lg-6">
            <img id="detail-image" src="${details.image}" class="w-100" alt="">
            </div>
            <div class="col-lg-6">
            <div class="card-body">
                <h3 class="card-title"><span class="text-primary">Name:</span>  ${details.name}</h3>
                <h5 class="card-text"><span class="text-primary">Release Date:</span> ${details?.releaseDate}</h5>
                <h5 class="card-text text-primary">Features:</h5>
                <p>Chipset: ${details.mainFeatures?.chipSet}</p>
                <p>Storage: ${details.mainFeatures?.storage}</p>
                <p>Memory: ${details.mainFeatures?.memory}</p>
                <p>Display: ${details.mainFeatures?.displaySize}</p>
                <h5 class="card-text text-primary">Sensors:</h5>
                <p>${details.mainFeatures.sensors}</p>
                <h5 class="card-text text-primary">Others:</h5>
                <p>WLAN: ${details.others?.WLAN}</p> <p>Bluetooth: ${details.others?.Bluetooth}</p> <p>GPS: ${details.others?.GPS}</p> <p>NFC: ${details.others?.NFC}</p>
            </div>
            </div>
        </div>
        </div>
    `
    box.appendChild(div)
}
