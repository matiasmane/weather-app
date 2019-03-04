This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How the app works?
When the user uses the app for the first time it will render a page seen in the image below.
![First page of the app](https://imgur.com/XwiuybM.jpg)

Once the user enters the city and the country it will show the weather info of the searched city. If the city is not found or the user does not provide either the city or the country there will be an error text below the form. 
![The page after a search](https://i.imgur.com/9ZEYkmq.jpg)

The user can then set the searched city as current location. Once selected the current locations weather will be automatically refreshed on the left column. 
![Searched city selected as current location](https://i.imgur.com/XwiuybM.jpg)

Once a city is selected as current location it will be saved in the browsers local storage and then it will be loaded automatically when the user refreshes the page (or visits the page again).
![Refreshed page](https://i.imgur.com/RkpD3UT.jpg)