/*The API only has dates from 2013 to 2020, so I used these variables. Rather than hard coding the dates in
I just put whatever the current year is minus a certain number. I'm not 100% sure that's how the API does the dates,
but it would be more like what I'd use in the real world than setting the variables to 2013 and 2020*/
const dateMin = new Date().getFullYear() - 10;
const dateMax = new Date().getFullYear() - 3;