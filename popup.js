document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('convertButton').addEventListener('click', () => {
        // checkbox data
        let cwMarks = document.getElementById('cw-marks').checked;
        let exMarks = document.getElementById('ex-marks').checked;
        let modMarks = document.getElementById('mod-marks').checked;
        var options = {"cw": cwMarks, "ex":exMarks, "mod":modMarks}

        // send data to content js
        chrome.tabs.query({ currentWindow: true, active: true}, (tab) => {
            chrome.tabs.sendMessage(tab[0].id, options)
        });
        
    }, false);
}, false);

