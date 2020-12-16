async function giveHowMenyTurns() {
    var turns = document.getElementById("turns");
    var name = document.getElementById("name").value;
    var strTurns = turns.options[turns.selectedIndex].value;
    document.getElementById("hidenDiv").style.display = "flex";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: name,
                turns: strTurns
            }
        })
    };
    const response = await fetch('/multiplayer', options);
    const json = await response.json();
    if(json.url === false) {
        await waitingPlayer(json.index);
    } else {
        return location.href = json.url;
    }
}

async function waitingPlayer(index) {
     return setTimeout(async ()=> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    index: index
                }
            })
        };
        const response = await fetch('/waitingForResponse', options);
        const json = await response.json();
        console.log(json.url);
        if(json.url !== false) {
            return location.href = json.url;
        } else {
            return waitingPlayer(index);
        }
    }, 2000);
}

