const main = document.getElementById('main')
const box = document.getElementById('details-box')
const loadPhones = () => {
    const input = document.getElementById('input-value')
    const textKey = input.value
    input.value = ''
    const searchText = textKey.toLowerCase()
    // const error = document.getElementById('error')
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
const displayPhones = phones => {
    // console.log(phones)
    main.textContent = ''
    box.textContent = ''
    for (const phone of phones) {
        // console.log(phone.slug)
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('my-4')
        div.innerHTML = `
                <div class="card">
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
    console.log(details)
    box.textContent = ''
    const div = document.createElement('div')
    div.classList.add('my-4')
    div.innerHTML = `
        <div class="card ">
        <div class="row g-0">
            <div class="col-lg-6">
            <img id="detail-image" src="${details.image}" class="w-100" alt="">
            </div>
            <div class="col-lg-6">
            <div class="card-body mt-2">
                <h3 class="card-title">Name: ${details.name}</h3>
                <h4 class="card-text">Release Date: ${details?.releaseDate}</h4>
                <h5 class="card-text text-primary">Main Features:</h5>
                <p>Chipset: ${details.mainFeatures?.chipSet}</p>
                <p>Storage: ${details.mainFeatures?.storage}</p>
                <p>Memory: ${details.mainFeatures?.memory}</p>
                <p>Display: ${details.mainFeatures?.displaySize}</p>
                <h5 class="card-text text-primary">Sensor & Others:</h5>
                <p>WLAN: ${details.others?.WLAN}, Bluetooth: ${details.others?.Bluetooth}, GPS: ${details.others?.GPS}, NFC: ${details.others?.NFC}</p>
            </div>
            </div>
        </div>
        </div>
    `
    box.appendChild(div)
}
