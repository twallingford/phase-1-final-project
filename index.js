const dateMin = new Date().getFullYear() - 10;
const dateMax = new Date().getFullYear() - 3;

let stateObjs = [];
const popArray = [];

const submitYear = document.querySelector("#submit-year");
const yearLabel = document.querySelector("#year-select-label");
const submitForm = document.querySelector("#submit-form");
const drilldown = document.querySelector("#drilldown");
const stateSelect = document.querySelector("#state-select");
const statsArea = document.querySelector("#stats-area");
const retainArea = document.querySelector("#retained");
const popSort = document.querySelector("#pop-sort");

yearLabel.innerText = `Select a year between ${dateMin} and ${dateMax}.`;

submitYear.setAttribute("min", dateMin);
submitYear.setAttribute("max", dateMax);
submitYear.setAttribute("value", dateMin);

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
            
            saveButton.addEventListener("click", () => {
                const retain = document.createElement("p");
                retain.innerText = `Nation - ${submitYear.value} - ${d.data[0]["Population"]}`
                retainArea.appendChild(retain);
                stateObjs.push({"location": "Nation", "population": d.data[0]["Population"], "year": submitYear.value});
                popArray.push(d.data[0]["Population"])
                popArray.sort();
            })
            populationData.appendChild(saveButton);
        })
    }
    else{
        fetch(`https://datausa.io/api/data?drilldowns=State&measures=Population&year=${submitYear.value}`)
        .then((response) => response.json())
        .then((d) => {
            //For each/map()
            for(const state in d.data){
                if(d.data[state]["State"] === stateSelect.value){
                    statsArea.innerHTML = "";
                    const p = document.createElement('p');
                    const populationData = statsArea.appendChild(p)
                    populationData.innerText = `The population of ${stateSelect.value} in ${submitYear.value} was ${d.data[state]["Population"]}!`
            
                    saveButton.addEventListener("click", () => {
                        const retain = document.createElement("div");
                        retain.setAttribute("class", "card");
                        retain.innerText = `${stateSelect.value} - ${submitYear.value} - ${d.data[state]["Population"]}`
                        retainArea.appendChild(retain);
                        stateObjs.push({"location": stateSelect.value, "population": d.data[state]["Population"], "year": submitYear.value});
                        popArray.push(d.data[state]["Population"])
                        popArray.sort();
                    })
                    populationData.appendChild(saveButton);
                }
            }

        })
    }
})

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

popSort.addEventListener("click", popSorter);

function popSorter(){
    const sorted = [];

    for(const pop in popArray){
        for(const dataPoint in stateObjs){
            if(popArray[pop] === stateObjs[dataPoint]["population"]){
                sorted.push(stateObjs[dataPoint]);
            }
        }
    }

    stateObjs = sorted;

    retainArea.innerHTML = "";

    for(const dataPoint in stateObjs){
        const retain = document.createElement("p");
        retain.setAttribute("class", "card");
        retain.innerText = `${stateObjs[dataPoint]["location"]} - ${stateObjs[dataPoint]["year"]} - ${stateObjs[dataPoint]["population"]}`
        retainArea.appendChild(retain);
    }

}

/*Issues to fix:
- DRY the code
- Try to use more "for each"*/