chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    // use application-list class to identify table
    var table = document.getElementsByClassName("application-list")[0];
    let totalCredits = 0
    var rowItems = [];
    // populate array with table items
    for (var i = 0, row; row = table.rows[i]; i++) {
        var colItems = [];
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (j == 7 && i>0) {
                totalCredits+= parseInt(col.textContent)
            }
            colItems.push(col.textContent);
        }  
        rowItems.push(colItems);
    }
    
    sendResponse({rows: rowItems, credits: totalCredits})
})