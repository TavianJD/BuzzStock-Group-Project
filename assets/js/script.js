$(".date").append(moment().format('MM/DD/YYYY'));
//
// Global Variables
//

const newsPageSize = 5;
var searchBox = document.querySelector("#tickerInput");
var searchButton = document.querySelector("#searchButton");

$(document).ready(function(){
    $('.modal').modal()
});

//
// Functions
//



function searchIsClicked(event) {
    event.preventDefault();
    console.log("searchIsClicked is running");

    // remove prior searched tickers' news-card-container cards and stock-card-container cards so the newly searched ticker will show data on the page
    let stockCardsContainer = $("#stock-card-container");
    stockCardsContainer.remove();
    console.log(stockCardsContainer);
    let newsCardsContainers = $(".news-card-container");
    newsCardsContainers.remove();
    console.log(newsCardsContainers);

    // Get value from input box
    // if input box is empty, show a modal "please type a ticker in the search box"
    console.log(searchBox.value);
    var textSearched = searchBox.value;

    // if text is blank, show modal alert
    if (textSearched === "") {
            $('#modal1').modal('open');
        
        console.log($(".modal"));

        return;
    };

    //call getTicker with value from searchBox
    getTicker(textSearched);
    searchBox.value = "tsla"; // change this to an empty string, tsla is for testing twice in a row


}

//Note the history buttons will call getTicker directly
function getTicker(myCriteria) {

    console.log("getTicker is running");

    //fetch from api
    //call getNews with Ticker as criteria
    //call tickerIsDone

    var callMe = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + myCriteria + "&apikey=FA3A9S4N1YYF4EFK" //For quote endpoint data

    console.log("fetch will call: " + callMe);

    //Call API
    fetch(callMe, {
        method: "GET",
        })
        .then(function(response) {

            response.json()

        .then(function(data) {   
            console.log(data);
            
            let quote = data["Global Quote"];
        
            //Push returned data into simplified return object
            let tickerDataObject = {
                ticker: quote["01. symbol"],
                recentPrice: quote["05. price"],
                previousClose: quote["08. previous close"],
                dailyChange: quote["09. change"],
                dailyChangePercent: quote["10. change percent"],
                // last5Days: [],
                // last1Month: [],
                // last6Months: [],
                // last1Year: [],
                // yearHigh: "",
                // yearLow: "",
            }
            console.log("TICKER DATA OBJECT",tickerDataObject);

            //Call downstream function to build out market data cards and fill in data, and downstream function for news search, getNews()
            tickerIsDone(tickerDataObject);
            getNews(myCriteria);
            saveLocalStorage(tickerDataObject);
            loadSavedTickers();
            }       
                    
        
        )        
        .catch(error => {
            console.log("Error", error);
        })

    });

    

}

// Section for saving and loading recent searches to/from localStorage

let tickerHistory = [];

function saveLocalStorage(tickerData){
    console.log("TICKER DATA IN SAVE LOCAL STORAGE", tickerData)
    if(tickerData.ticker === "undefined" || tickerData.ticker === null || !tickerData.ticker){
        return;
    } else {
        tickerHistory.push(tickerData)
        console.log("tickerHistory", tickerHistory)
    }
    
    localStorage.setItem("savedTickerData", JSON.stringify(tickerHistory))
}

// The onclick event shows a div with buttons to summon the recent ticker back to the page
const tickerHistoryBtn = document.getElementById("tickerHistoryBtn")
const tickerHistoryDiv = document.getElementById("showTickerHistory")
    tickerHistoryDiv.innerHTML = "";

tickerHistoryBtn.addEventListener("click", function(){
    if (tickerHistoryBtn.classList == "btn") {
        tickerHistoryBtn.classList = "btn shown";
        tickerHistoryDiv.classList = "shown";
        tickerHistoryBtn.textContent = "Hide";

    } else if (tickerHistoryBtn.classList == "btn shown") {
        tickerHistoryBtn.classList = "btn"
        tickerHistoryDiv.classList = "hidden"
        tickerHistoryBtn.textContent = "Show Recent Tickers";
        return;

    }
    loadSavedTickers();
});

let loadSavedTickers = function() {
    let savedTickers = JSON.parse(localStorage.getItem("savedTickerData")) || [];
    console.log("saved tickers", savedTickers)

    


    for(let i = 0; i < savedTickers.length; i++){
        // done // make buttons instead of cards
        // done // put event listener on class="recent-ticker-button"
        // done // pass click event to handler
        // done // make a button with textContent
        // done // pass ticker text to getTicker
        // done // make div disappear
        // make if statement in getTicker that skips fetch for already fetched recent ticker data


        // If the history div already has the ticker ID, make it skip the append
        if (tickerHistoryDiv.innerHTML.includes(`${savedTickers[i].ticker}`)) {
            // do nothing
        } else {
            // make a button for the newly searched ticker to be able to be searched again and append it to the showTickerHistory div

            var historyBtn = document.createElement("button");

            historyBtn.innerHTML = `
            <button class="recent-ticker-button" id="${savedTickers[i].ticker}">${savedTickers[i].ticker}</button>`
            tickerHistoryDiv.append(historyBtn);
        }
    };
};

    // Add event listener to tickerHistoryDiv, pass to function if(clicked.className == "recent-ticker-button")
    // then pass button.textContent to getTicker
    tickerHistoryDiv.addEventListener("click", function(event) {
        console.log(event);
        if (event.target.className == "recent-ticker-button") {
            console.log(event.target.textContent);
            getTicker(event.target.textContent);
        }
    })


  



function tickerIsDone(tickerData){

    console.log("tickerIsDone is running");
    console.log(tickerData);

    
    //build dynamic html for ticker prices
        //Header Elements

        //create card element, add inner html for more elements, append the element
    var stockCard = document.createElement("div")
    stockCard.classList = "row stock-card-container";
    stockCard.id = "stock-card-container";
    stockCard.innerHTML = `
    <div class="col s12 m6">
      <div class="card darken-1 z-depth-2">
        <div class="card1-content">
          <span class="card1-title">${tickerData.ticker}</span>
          <p>Price: ${tickerData.recentPrice}</p>
          <p>Prior Closing Price: ${tickerData.previousClose}</p>
          <p>Daily Change: ${tickerData.dailyChange}</p>
          <p>Daily Change %: ${tickerData.dailyChangePercent}</p>
        </div>
      </div>
    </div>
    
    `

    const tickerName = document.getElementById("tickerName");
    tickerName.textContent = tickerData.ticker;

    const price = document.getElementById("price");
    price.textContent = "$" + tickerData.recentPrice;
    
    // Get the properties from the tickerData object so the values can be added to page
     
    
        
    var cardHolder = document.querySelector("#cardHolder");

    cardHolder.appendChild(stockCard);

        //Card Elements

}

function getNews(myCriteria) {

    console.log("getNews is running");

    var returnMe = [];

    // If you pass testData to the function, it will return a static news object for testing
    // example call to get test data: getNews('testData')
    if (myCriteria === "testData") {

        //build the static stories

        var storyOne = {headLine:"Story One", 
        imageLink:"https://content.fortune.com/wp-content/uploads/2017/08/wall-street-jobs1.jpg", 
        story:"The blue fox jumped over the spoon.  The sun rose in the west and people ate dinner first.  Please return all code to where you found it.",
        storyURL:"https://www.msn.com/en-us/money/markets/wall-street-bonuses-will-jump-up-to-35-25-this-year-e2-80-94-the-most-since-the-great-recession/ar-AAQMwv2?ocid=BingNewsSearch"
        };
        var storyTwo = {headLine:"Story Two", 
        imageLink:"https://cdn.thecoolist.com/wp-content/uploads/2017/04/Cash-how-to-save-money.jpg", 
        story:"Somebody has been watching you.  They put cookies on your computer.  Would you like to see an add for something else?  Why can't we be friends.",
        storyURL:"https://abcnews.go.com/Business/wireStory/asian-stocks-rise-biden-xi-hold-video-summit-81196816"
        };
        var storyThree = {headLine:"Story Three", 
        imageLink:"https://www.playpennsylvania.com/wp-content/uploads/2019/10/Christie-PA-sports-betting-dumpster-fire.jpg", 
        story:"Late last night a student at a local programming bootcamp should have stopped while ahead.  Instead they tried to code one more feature and this happened.",
        storyURL:"https://www.msn.com/en-us/money/markets/stocks-in-japan-set-to-rise-as-stronger-than-expected-us-retail-sales-boost-wall-street/ar-AAQMQNi?ocid=BingNewsSearch"
        };

        //add them to the returnMe array

        returnMe.push(storyOne);
        returnMe.push(storyTwo);
        returnMe.push(storyThree);

        //return returnMe

        newsIsDone(returnMe);

    } else { //The API call and returning of data

        
        //Build URL based on criteria and global constant page size
        var callMe = "https://api.newscatcherapi.com/v2/search?q=" + myCriteria + "&page_size=" + newsPageSize;

        console.log("fetch will call: " + callMe);

        //Call API
        fetch(callMe, {
            method: "GET", 
            headers: {"x-api-key" : "AdKiiLU0drgQWDBh7y1deZRLTm7UMHm_i2vy-lLB-zI"
            }})
            .then(function(response) {

                response.json()

            .then(function(data) {            
            
                //Push returned data into simplified return object
                for (let i = 0; i < data.articles.length; i++) {
                    
                    const element = data.articles[i];

                    returnMe.push( {headLine: element.title, 
                    imageLink: element.media, 
                    story: element.summary,
                    storyURL:element.link
                    });
                    
                }               
                newsIsDone(returnMe);
            })        
            .catch(error => {
                console.log("Error", error);
            })

        });

        //Call downstream function to build out news cards
        // newsIsDone(returnMe); newsIsDone(returnMe);
            

    };

};

//This is called when getNews is complete
//Build Cards Here
function newsIsDone(newsData){

    console.log("newsIsDone is running");
    console.log(newsData);

    for (let i = 0; i < 5; i++) {
            
        // $("#cardHolder").add("<div> <>News Story</h2> " + element.headLine +"</div>");
        console.log(newsData[i]);
        var newsCard = document.createElement("div")
        newsCard.classList = "row news-card-container";
        newsCard.id = "news-card-container";
        newsCard.innerHTML = `
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <a href=${newsData[i].storyUrl}><p class="truncate">${newsData[i].storyURL}</p></a>
              <span class="card-title">${newsData[i].headLine}</span>
              <img src="${newsData[i].imageLink}" style="max-width:30%;" alt="Image for: ${newsData[i].headLine}">
              <p>${newsData[i].story}</p>
              </a>
            </div>
            <div class="card-action">
            </div>
          </div>
        </div>
        
        `
        $("#cardHolder").append(newsCard);
    }  
        
   

};



//
// Listeners
//

document.addEventListener("DOMContentLoaded", function() {

});
searchButton.addEventListener("click", searchIsClicked);
