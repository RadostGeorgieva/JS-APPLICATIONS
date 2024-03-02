function attachEvents() {
    let btn = document.getElementById("submit");
    let location = document.getElementById("location");
    btn.addEventListener("click", onSubmit);
    let forecastDiv = document.getElementById("forecast");

    async function onSubmit() {
        forecastDiv.style.display = "block";
        let startUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
        let allData = await getInitialData(startUrl);
        let data = allData.find(({ name }) => name === location.value);
        if (data) {
            getTodayData(data);
            getNextDaysData(data);
        } else {
            forecastDiv.textContent = "Error";
        }


        async function getInitialData(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                return data;
            }
            catch (err) {
                forecastDiv.textContent = "Error";
            }
        }
        async function getTodayData({ code, name }) {
            let url = `http://localhost:3030/jsonstore/forecaster/today/${code}`
            try {
                const responseToday = await fetch(url);
                const todayData = await responseToday.json();
                showToday(todayData);
            }
            catch (err) {
                console.log(err);
                forecastDiv.textContent = "Error";
            }
        }
        async function getNextDaysData({ code, name }) {
            let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
            try {
                const responseToday = await fetch(url);
                const nextDaysData = await responseToday.json();
                nextDays(nextDaysData);
            }
            catch (err) {
                console.log(err);
                forecastDiv.textContent = "Error";
            }
        }
        async function showToday(todayData) {
            let current = document.getElementById("current");
            let divForecasts = document.createElement("div");
            divForecasts.classList.add("forecasts")
            let spanSymbol = document.createElement("span");
            spanSymbol.classList.add("condition");
            spanSymbol.classList.add("symbol");
            spanSymbol.textContent = putSymbol(todayData.forecast.condition);

            let condition = document.createElement("span");
            condition.classList.add("condition");
            let city = document.createElement("span");
            city.classList.add("forecast-data");
            city.textContent = todayData.name
            let degrees = document.createElement("span");
            degrees.classList.add("forecast-data");
            degrees.textContent = `${todayData.forecast.low}\xB0\/${todayData.forecast.high}\xB0`;

            let cond = document.createElement("span");
            cond.classList.add("forecast-data");
            cond.textContent = todayData.forecast.condition;

            condition.appendChild(city);
            condition.appendChild(degrees);
            condition.appendChild(cond);

            divForecasts.appendChild(spanSymbol);
            current.appendChild(divForecasts);
            divForecasts.appendChild(condition);
            console.log(todayData);
        }
        async function nextDays(nextDaysData) {
            let upcomingBig = document.getElementById("upcoming");
            let divForecasts = document.createElement("div");
            divForecasts.classList.add("forecast-info")

            for (el of Object.values(nextDaysData)[0]) {
                let upcoming = document.createElement("span");
                upcoming.classList.add("upcoming");
                let spanSymbol = document.createElement("span");
                spanSymbol.classList.add("symbol");
                spanSymbol.textContent = putSymbol(el.condition);

                let degrees = document.createElement("span");
                degrees.classList.add("forecast-data");
                degrees.textContent = `${el.low}\xB0\/${el.high}\xB0`;

                let cond = document.createElement("span");
                cond.classList.add("forecast-data");
                cond.textContent = el.condition;

                upcoming.appendChild(spanSymbol)
                upcoming.appendChild(degrees)
                upcoming.appendChild(cond)
                divForecasts.appendChild(upcoming);
            }
            upcomingBig.appendChild(divForecasts);
            console.log(nextDaysData);
        }


        function putSymbol(symbol) {
            let s = "";
            switch (symbol) {
                case "Sunny": s = '\u2600'; break;
                case "Partly sunny": s = '\u26C5'; break;
                case "Overcast": s = '\u2601'; break;
                case "Rain": s = '\u2614'; break;
                case "Degrees": s = '\xB0'; break;
            }
            return s;
        }
    }

}

attachEvents();