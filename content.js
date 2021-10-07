chrome.runtime.onMessage.addListener((options) => {
    var table = document.getElementsByClassName("application-list")[0];

    // make a copy of the table
    var tempTable = table.cloneNode(true);

    // whitelist used to know which columns to keep
    var whiteList = ["MODULE_TITLE-class", "MODULE_MARK-class", "MODULE_TITLE", "MODULE_MARK"]
    if (options.cw) {
        whiteList.push("CSWK_MARK-class");
        whiteList.push("CSWK_MARK");

    }
    if (options.ex) {
        whiteList.push("EXAM_MARK-class");
        whiteList.push("EXAM_MARK");

    }
    if (options.mod) {
        whiteList.push("MODULE_WEIGHT-class");
        whiteList.push("MODULE_WEIGHT");

    }

    // update table by removing columns
    var totalCredits = 0
    marks = [];
    weights = [];
    for (var i = 0, row; row = tempTable.rows[i]; i++) {

        for (var j = 0, cel; cel = row.cells[j]; j++) {

            // used to calculate average mark
            if (cel.className == "MODULE_WEIGHT-class") {
                wgt = parseInt(cel.textContent)
                totalCredits+= wgt;
                weights.push(wgt);
            } else if (cel.className == "MODULE_MARK-class") {
                mrk = parseInt(cel.textContent);
                marks.push(mrk);
            }

            // if not in the whitelist, remove cells
            if (!whiteList.includes(cel.className) && !whiteList.includes(cel.id)) {
                cel.remove();
                j--;
            }
        }  
    }

    // calculate average mark and add it to the table
    if (totalCredits != NaN) {
        var average = 0;
        for (var i = 0; i < marks.length; i++) {
            
            mark = marks[i];
            weight = weights[i];

            average += mark * weight/totalCredits;
            console.log(average)

        }   
        average = Math.round( average * 10 ) / 10

        var newRow = tempTable.insertRow()
        newRow.insertCell().appendChild(document.createTextNode("Average Mark"));
        var markCell = newRow.insertCell();
        markCell.colSpan= "4";
        markCell.style.textAlign = "center";

        markCell.appendChild(document.createTextNode(average));
    }

    console.log(tempTable)
    // convert table into a pdf and download
    html2pdf(tempTable);

})
