document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('button').addEventListener('click', onclick, false)
    
    onclick = () => {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, 'Return rows', handleResponse)
        })
    }
    
    const handleResponse = (res) => {
        var pdf = new jsPDF();
        pdf.setFont("helvetica");
        pdf.setFontType("bold");
        pdf.setFontSize(12);

        for (let i in res.rows) {

            const row = res.rows[i]
            moduleTitle = row[0]
            mark = row[2]

            y = (i * 10) + 20;

            pdf.text( moduleTitle, 20, y)
            pdf.text( mark, 150, y)

        }   
        pdf.save("results.pdf")

    }
}, false) 