# Stock-Group-Project

## Description
A mobile website for viewing market data and news stories related to a stock ticker.  The full news stories are available by clicking anywhere on the story card.  Best viewed with a resolution of 500 pixels wide or less.

### User Story

As an investor in stocks  
I want to be able to look up the market and news articles about a stock ticker  
So that I can be informed on my positions.  

#### Acceptance Criteria

Given I’ve opened the webpage  
When the page loads  
I expect to see:  
* Search Box and Button  
* Page Title  
* Saved Tickers

### Class Presentation

https://docs.google.com/presentation/d/1vNVpIzq8PT90N3KzldsRqUE-ECG9_7gP/edit#slide=id.p5

## Technical Description

The user initiates action by entering a stock ticker in the search box and clicking search.  This triggers an API call to get the market data, which then records a history of the ticker in local storage, updates the UI with Market data and calls the news search.  The news search then populates the news story cards.

### Built With
* HTML
* CSS
* JQuery
* JavaScript
* Momment.js
* Materialize JS and CSS
* Google Material Icons
* Alphavantage Market API
* NewscatcherAPI news API

### Known issues

1. The local storage and history buttons do not work as expected when alternating between history searches and new searches.
2. The local storage is only saving the current session searches.  Previous session searchs are lost with each new session.

### Future Improvements

1. Update UI to be friendly to mobile horizontal and desktop screen resolutions
2. Add graphs and more data for stocks
3. Find correlation in words used in news to stock price change
4. Build savable portfolios you can track all at once
5. Crypto exchange rates
6. Default market data to show on entering website
7. Add users data persistance instead of local data.


## Website
https://tavianjd.github.io/BuzzStock-Group-Project/

## Screenshot
![Screenshot 2021-11-24 184745](https://user-images.githubusercontent.com/89175620/143332153-13310344-1db9-4ff3-9762-3ed52d9d34d4.png)

## Contribution
Made by developers (Andrew, Micheal, Ronya, Tavian) ❤

### ©️2021 BuzzStock, Inc
