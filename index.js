const dateMin = new Date().getFullYear() - 10;
const dateMax = new Date().getFullYear() - 3;

const submitYear = document.querySelector("#submit-year");
const yearLabel = document.querySelector("#year-select-label");
const submitForm = document.querySelector("#submit-form");
const drilldown = document.querySelector("#drilldown");
const stateSelect = document.querySelector("#state-select");
const statsArea = document.querySelector("#stats-area");

yearLabel.innerText = `Select a year between ${dateMin} and ${dateMax}.`;

submitYear.setAttribute("min", dateMin);
submitYear.setAttribute("max", dateMax);
submitYear.setAttribute("value", dateMin);

submitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(drilldown.value === "Nation"){
        fetch(`https://datausa.io/api/data?drilldowns=${drilldown.value}&measures=Population&year=${submitYear.value}`)
        .then((response) => response.json())
        .then((d) => {
            statsArea.innerText = `The population of the nation in the year ${submitYear.value} was ${d.data[0]["Population"]}!`
        })
    }
    else{
        fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population&year=${submitYear.value}`)
        .then((response) => response.json())
        .then((d) => {
            for(const state in d.data){
                if(d.data[state]["State"] === stateSelect.value){
                    statsArea.innerText = `The population of ${stateSelect.value} in ${submitYear.value} was ${d.data[state]["Population"]}!`
                }
            }

        })
    }
})