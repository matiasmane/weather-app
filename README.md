This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How the app works?
When the user uses the app for the first time it will render a page seen in the image below.
![First page of the app] https://imgur.com/a/nI15P2h

Once the user enters the city and the country it will show the weather info of the searched city. If the city is not found or the user does not provide either the city or the country there will be an error text below the form. 
![The page after a search] https://imgur.com/a/nI15P2h

The user can then set the searched city as current location. Once selected the current locations weather will be automatically refreshed on the left column. 
![Searched city selected as current location] https://imgur.com/a/S5kdRKf

Once a city is selected as current location it will be saved in the browsers local storage and then it will be loaded automatically when the user refreshes the page (or visits the page again).
![Refreshed page]  https://imgur.com/a/x4IwPzs