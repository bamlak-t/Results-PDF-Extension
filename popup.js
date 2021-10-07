document.addEventListener('DOMContentLoaded', () => {

    let cwMarks = document.querySelector('#cw-marks').checked;
    let exMarks = document.querySelector('#ex-marks').checked;
    let modMarks = document.querySelector('#mod-marks').checked;

    var options = {cwMarks, exMarks, modMarks}
    
    document.getElementById('convertButton').addEventListener('click', () => {
        chrome.tabs.query({ currentWindow: true, active: true}, (tab) => {
            chrome.tabs.sendMessage(tab[0].id, options)
        });
        
    }, false);
}, false);

