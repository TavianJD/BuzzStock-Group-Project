//
// Global Variables
//

const newsPageSize = 5;

//
// Functions
//

function searchIsClicked() {

    console.log("seachIsClicked is running");

    //Add seach value to history
    //call getTicker

}

//Note the history buttons will call getTicker directly
function getTicker(myCriteria) {

    console.log("getTicker is running");

    //fetch from api
    //call getNews with Ticker as criteria
    //call tickerIsDone
    
    //creating dummy data object
    let tickerDataObject = {
        ticker: "MSFT", //actually make this myCriteria
        currentPrice: "1000",
        openPrice: "990",
        previousClose: "950",
        dailyChange: currentPrice - previousClose,
        dailyChangePercent: (currentPrice / previousClose) - 1,
        last5Days: [],
        last1Month: [],
        last6Months: [],
        last1Year: []
    }
        

}

function tickerIsDone(tickerData){

    console.log("tickerIsDone is running")
    
    //build dynamic html for ticker prices
        //Header Elements
        //Card Elements

}

function getNews(myCriteria) {

    console.log("getNews is running");

    var returnMe = [];

    // If you pass the function testData it will return a static news object for testing
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
        // method gets key                               
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
            
            })        
            .catch(error => {
                console.log("Error", error);
            })

        });

        //Call downstream function to build out news cards
        newsIsDone(returnMe);
            

    };

};

//This is called when getNews is complete
//Build Cards Here
function newsIsDone(newsData){

    console.log("newsIsDone is running");
    console.log(newsData);

};



//
// Listeners
//
