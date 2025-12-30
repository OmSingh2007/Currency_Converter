const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from");
let toCurr = document.querySelector(".to");
let msg=document.querySelector(".msg");
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        imgchange(evt.target);
    });
}

const imgchange = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let input = document.querySelector(".amount input");
    let amtval = input.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        input.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);

    let fromCurrency = fromCurr.value.toLowerCase();
    let toCurrency = toCurr.value.toLowerCase();

    try {
        let response = await fetch(URL);
        let data = await response.json();

        
        let rate = data[fromCurrency][toCurrency];


        let finalamt = amtval*rate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

    } catch (error) {
        console.log("Error:", error);
    }
});
