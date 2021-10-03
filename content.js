chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    var table = document.getElementsByClassName("application-list")[0];
    
    var rowItems = [];
    for (var i = 0, row; row = table.rows[i]; i++) {
        var colItems = [];
        for (var j = 0, col; col = row.cells[j]; j++) {
            colItems.push(col.textContent);
        }  
        rowItems.push(colItems);
    }

    console.log( rowItems)
    sendResponse({rows: rowItems})
})