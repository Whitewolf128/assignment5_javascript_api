async function simulateAsyncOperation() 
{
    return new Promise((resolve) =>

    
    setTimeout(() =>
        {
            resolve("Data fetched after waiting (await) for 10 seconds or so... #1");
        }, 10000)
    );
}

async function displayAsyncCall() 
{
    console.log("Starting async operation... #1");
    const result = await simulateAsyncOperation();
    console.log(result);
}

displayAsyncCall();

async function fetchGameData()
{
    try
    {
        const resp = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json');
        
        if(!resp.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Data fetched after waiting(await) ...#2");
        const gameData = await resp.json();

        console.log("character Data: ", gameData);
    }
    catch(error)
    {
        console.error("Error fetching game Data: ", error)
    }
}

fetchGameData();