//Variables
const dateMin = new Date().getFullYear() - 10;
const dateMax = new Date().getFullYear() - 3;

//Empty array for sorting functionality
const stateObjs = [];

//Query selectors
const submitYear = document.querySelector("#submit-year");
const yearLabel = document.querySelector("#year-select-label");
const submitForm = document.querySelector("#submit-form");
const drilldown = document.querySelector("#drilldown");
const stateSelect = document.querySelector("#state-select");
const statsArea = document.querySelector("#stats-area");
const retainArea = document.querySelector("#retained");
const popSort = document.querySelector("#pop-sort");

//Initial setup
yearLabel.innerText = `Select a year between ${dateMin} and ${dateMax}.`;

submitYear.setAttribute("min", dateMin);
submitYear.setAttribute("max", dateMax);
submitYear.setAttribute("value", dateMin);

//Event listener for search
submitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("id", "save-button");
    saveButton.innerText = "Retain data";

    if(drilldown.value === "Nation"){
        fetch(`https://datausa.io/api/data?drilldowns=${drilldown.value}&measures=Population&year=${submitYear.value}`)
        .then((response) => response.json())
        .then((d) => {
            statsArea.innerHTML = "";
            const p = document.createElement('p');
            const populationData = statsArea.appendChild(p)
            populationData.innerText = `The population of the nation in the year ${submitYear.value} was ${d.data[0]["Population"]}!`
            //Event listener for retaining national stat
            saveButton.addEventListener("click", () => {
                const retain = document.createElement("p");
                retain.innerText = `Nation - ${submitYear.value} - ${d.data[0]["Population"]}`
                retainArea.appendChild(retain);
                stateObjs.push({"location": "Nation", "population": d.data[0]["Population"], "year": submitYear.value});
            })
            populationData.appendChild(saveButton);
        })
    }
    else{
        fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population&year=${submitYear.value}`)
        .then((response) => response.json())
        .then((d) => {
            for(const state in d.data){
                if(d.data[state]["State"] === stateSelect.value){
                    statsArea.innerHTML = "";
                    const p = document.createElement('p');
                    const populationData = statsArea.appendChild(p)
                    populationData.innerText = `The population of ${stateSelect.value} in ${submitYear.value} was ${d.data[state]["Population"]}!`
                    //Event listener for retaining state stat
                    saveButton.addEventListener("click", () => {
                        const retain = document.createElement("div");
                        retain.setAttribute("class", "card");
                        retain.innerText = `${stateSelect.value} - ${submitYear.value} - ${d.data[0]["Population"]}`
                        retainArea.appendChild(retain);
                        stateObjs.push({"location": stateSelect.value, "population": d.data[0]["Population"], "year": submitYear.value});
                    })
                    populationData.appendChild(saveButton);
                }
            }

        })
    }
})

//Event listener for disabling/enabling state list
drilldown.addEventListener("change", () => {
    if(drilldown.value === "State"){
        stateSelect.disabled = false;
        console.log(stateSelect)
    }
    else if (drilldown.value === "Nation"){
        stateSelect.disabled = true;
        console.log("Nation");
    }
})

//Event listener for sort by population function
popSort.addEventListener("click", () => {
    const populations = [];
    const sorted = [];
    for(const item in stateObjs){
        populations.push(stateObjs[item]["population"]);
    }
    populations.sort();
    for(const number in populations){
        for(const item in stateObjs){
            if(populations[number] === stateObjs[item]["population"]){
                sorted.push(stateObjs[item]);
                stateObjs.splice(item, item);
                continue
            }
        }
    }
    for(const item in sorted){
        stateObjs.push(sorted[item]);
    }
    console.log(stateObjs);
})


