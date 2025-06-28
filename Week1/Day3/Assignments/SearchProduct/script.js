function searchData() {
    let category = document.getElementById('cat').value
    let min = document.getElementById('min').value
    let max = document.getElementById('max').value
    // const URL =`https://mockapi.io/products?category=${category}&min_price=${min}&max_price=${max}&sort=asc`
    // // console.log(URL)
    // Provided URL is not working sir i have choosen fakestore API
    const URL = `https://fakestoreapi.com/products?category=${category}`
    console.log(URL)
    async function fetchData(URL) {
        try {


            let res = await fetch(URL)
                .then((res) => res.json())
                .then((data) => { return data })

            const disRes = displayData(res)
            let display = document.getElementById("display")
            display.innerHTML = disRes.join('');

        }
        catch (error) {
            console.log("Failed at fetching data", error)
        }

    }
    fetchData(URL)
}
function displayData(res) {
    const updatedRes = res.map((item, idx) => {
        return `
            <div class="card-cont" >
        <img src=${item?.image} alt="">
         <h6 class='card-title' >${item?.title
            }</h6>
         <span class='card-price' >${item?.price}</span>


    </div>
        `
    })

    return updatedRes

}
const btn = document.getElementById('search')
btn.addEventListener('click', searchData)





