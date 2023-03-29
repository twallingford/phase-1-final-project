United States National- and State-Level Population Data

Description: 
This project allows the user to access population data either for the United States as a whole or by state during the years 2013 through 2020. The project was created as a Phase 1 project for Flatiron in order to demonstrate my ability to gather data using an API. 

In leiu of setting up a system to save population figures that persisted between uses I decided to use a system to retain certain population figures while the user is on the page. I chose this simply because of technical knowledge limitations at the time.

In addition to allowing a user to retain population figures, they are also able to sort said figures by population. 

What could be implemented in the future:
- The aforementioned saving
- Sorting in multiple ways (alphabetical by state, by year, ascending and descending)

Known bugs:
- If you change the year or location and retain without hitting "Submit" first then it retain the year in the menu and the location chosen, but it will not change the population.

Unknowns: 
- How will the system sort if two retained items have the exact same population? In my current sorting method, this may cause the first retained item to get pulled twice, replacing the other instance of that population figure.

How to use the project:
- Open index.html.
- Select whether you would like state- or national-level data with the dropdown next to "Nation or State-level population data?"
- If you have selected state-level data in the first dropdown, the next dropdown ("If 'State' is selected above, which state?") will be enabled. Otherwise it will be disabled. If you have selected state-level data, select a state. Otherwise you can skip this step.
- Select a year between 2013 and 2020 (inclusive) to receive population data for.
- Press "Submit" and you will see a separate section appear with the population of the location and the year. If you have already submitted a request, this will simply be replaced with the new data.
- To retain the figure, press the "Retain data" button next to the population figure. If there are no figures retained so far, you will see a new section appear with the data in [Location] - [Year] - [Population] format.
- If you would like to sort the retained data, press the "Sort retained by population" button below the year selector. This will sort from the lowest population to the highest population.

API used:
https://datausa.io/