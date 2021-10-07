chrome.runtime.onMessage.addListener((options) => {
    console.log("working");
    var table = document.getElementsByClassName("application-list")[0];

    // TODO add/remove some columns and update table based on check

    html2pdf(table);
})
