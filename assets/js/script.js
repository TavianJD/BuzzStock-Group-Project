//
// Global Variables
//

//news call https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&country=au,ca&q=criteria

const openNews = "pub_22630f1f65786ef7ac53e2d3c31858797ee7";
const baseNewURL = "https://newsdata.io/api/1/news?";


//
// Functions
//

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

        //log what the function will be returning

        console.log("getNews is returning ");
        console.log(returnMe);

        //return returnMe

        return returnMe;

    }

};



//
// Listeners
//
