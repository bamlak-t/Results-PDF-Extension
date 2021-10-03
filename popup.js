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

        // table titles
        pdf.text( `${res.rows[0][0]} ${res.rows[0][2]} ${res.rows[0][7]}`, 10, 15)

        pdf.setFontType("normal");
        average = 0
        let y;

        // loop through each row
        for (let i = 1; i< res.rows.length; i++) {

            const row = res.rows[i]

            moduleTitle = row[0]
            mark = row[2]
            weight = row[7]
            text = moduleTitle + " " + mark + " " + weight

            // write into pdf
            y = (i * 10) + 20;
            pdf.text( text, 10, y)

            // calculate average mark
            average += parseInt(mark) * parseInt(weight)/res.credits
        }   

        average = Math.round( average * 10 ) / 10
        pdf.text( `Average Mark ${average}`, 10, y + 10)
        pdf.save("results.pdf")
    }
}, false) 