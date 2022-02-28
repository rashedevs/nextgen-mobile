const main = document.getElementById('main')
const loadPhones = () => {
    const input = document.getElementById('input-value')
    const textKey = input.value
    const searchText = textKey.toLowerCase()
    input.value = ''
    // const error = document.getElementById('error')
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
const displayPhones = phones => {
    // console.log(phones)
    for (const phone of phones) {
        // console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('my-5')
        div.innerHTML = `
 <div class="card" style="width: 25rem;">
      <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-2" alt="">
      <div class="card-body">
          <h5 class="card-title text-center">Name: ${phone.phone_name}</h5>
          <p class="card-text text-center">Brand: ${phone.brand}</p>
          <div class="text-center"><button onclick="" class="btn btn-primary w-50">See Details</button></div>
      </div>
</div>
        `
        main.appendChild(div)
    }
}
