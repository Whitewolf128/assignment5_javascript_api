// A function the works upon load
function load(){

    document.getElementById("search").addEventListener("click", fetchSwitchAmiiboData);
}
//A function that initiliazes the form
async function simulateAsyncOperation() 
{
    return new Promise((resolve) =>

    //delays the load
    setTimeout(() =>
        {
            resolve("Data fetched after waiting (await) for 10 seconds or so... #1");
        }, 10000)
    );
}
//A function that displays as the first async function is called
async function displayAsyncCall() 
{
    console.log("Starting async operation... #1");
    const result = await simulateAsyncOperation();
    console.log(result);
}

displayAsyncCall();

//A function where the main function is done
async function fetchSwitchAmiiboData()
{
    //variables
    const num = parseInt(document.getElementById("numb").value, 10) || 1; //Default to 1 if input is empty or if its 0
    const outputDiv = document.getElementById('dataList');
    
    //a try-catch block
    try
    {
        //local variables
        const response = await fetch('https://www.amiiboapi.com/api/amiibo/');
        const data =  await response.json(); //access the api data link
        const amiiboData = data.amiibo; //access the data for further parsing
        const apiData = [];//am array for data but is empty

        //a proccess that allows the data to be extracted by an array
        fetch(response)
            .then(response => response.json())
            .then(data => {
                apiData = amiiboData;
            })
        //checks if things are not ok and throws an error
        if(!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        //checks if its running write
        console.log("Data fetched after waiting(await) ...#2");
        
        //displays the data into the console log
        console.log("character Data: ", amiiboData);

        // Convert API data to numbers starting at 1
        const numberedData = amiiboData.map((item, index) => ({
            ...item,
            number: index + 1,
        }));

        //the way the content displays 
        const selectedItem = numberedData.find(item => item.number == num);
        outputDiv.innerHTML = selectedItem
            ? `<p><stron>ID:</strong> ${JSON.stringify(selectedItem.number)}</p>
            <p><strong>Amiibo series:</strong> ${JSON.stringify(selectedItem.amiiboSeries)}</p>
            <p><strong>Character:</strong> ${JSON.stringify(selectedItem.character)}</p>
            <p><strong>Game Series:</strong> ${JSON.stringify(selectedItem.gameSeries)}</p>
            <p><strong>Head:</strong> ${JSON.stringify(selectedItem.head)}</p>
            <p><strong>Image:</strong> ${JSON.stringify(selectedItem.image)}</p>
            <p><strong>Name:</strong> ${JSON.stringify(selectedItem.name)}</p>
            <p><strong>Release:</strong> ${JSON.stringify(selectedItem.release)}</p>
            <p><strong>Tail:</strong> ${JSON.stringify(selectedItem.tail)}</p>
            <p><strong>Type:</strong> ${JSON.stringify(selectedItem.type)}</p>`
            //If its less than 0 and more than the array length it will display this message plus the entered value
            : `<p>No item found for number ${num}</p>`;
    }
    //the catch statement that catches errors and displays them to be more readable
    catch(error)
    {
        //displays error to the console
        console.error("Error fetching amiibo Data: ", error);
        //displays an error to the page
        outputDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}

//checks if the promise is successful or not
const myPromise = new Promise((resolve) =>
{
    const success = true;

    if(success)
    {
        resolve("Promise is resolved successfully");
    }
    else
    {
        reject("Promise is rejected");
    }
});

myPromise
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

// calls the load function upon loading
document.addEventListener("DOMContentLoaded", load);