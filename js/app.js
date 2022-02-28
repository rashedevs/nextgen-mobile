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

    }
}
