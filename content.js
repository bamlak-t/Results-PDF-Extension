document.addEventListener('DOMContentLoaded', function() {
    var convertButton = document.getElementById('convertButton');
    convertButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            // chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
            //     console.log(response.dom);
            //   });
            var element = document.querySelector('body');
            html2pdf(element);
        });
        
    }, false);
}, false);
