let xhttp = new XMLHttpRequest();

let entriesCount = document.getElementById('entries-count');

let prevButtonTop = document.getElementById('prev-button-top');
let nextButtonTop = document.getElementById('next-button-top');
let pageElementTop = document.getElementById('page-number-top');

let prevButtonBottom = document.getElementById('prev-button-bottom');
let nextButtonBottom = document.getElementById('next-button-bottom');
let pageElementBottom = document.getElementById('page-number-bottom');

let searchField = document.getElementById('search-form');
let resultsList = document.getElementById('table-body');
let resultsTable = document.getElementById('results-table');

let table_speech_text = '';
// Hide table elements initially
entriesCount.textContent = '';

resultsTable.style.display = 'none';

prevButtonTop.style.display = 'none';
nextButtonTop.style.display = 'none';
pageElementTop.textContent = '';

prevButtonBottom.style.display = 'none';
nextButtonBottom.style.display = 'none';
pageElementBottom.textContent = '';

xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){

        let lines = this.responseText.split('\n');
        let entries = [];

        for(let i = 0; i< lines.length; i++){

            let parts = lines[i].split('\t');
            let entry = {
                value: parts[0],
                tyybi_nr: parts[1],
                authentic_texts: parts[2]
            };

            entries.push(entry);
        }


        let currentPage = 1;
        let entriesPerPage = 30;

        let timeout = null;

        let results = [];
        table_speech_text = '';

        searchField.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                let searchTerm = searchField.value.toLowerCase();
                results = [];

                if (searchTerm === '') {
                    // If the search field is empty, clear the results list and hide table elements
                    resultsList.innerHTML = '';
                    prevButtonTop.style.display = 'none';
                    nextButtonTop.style.display = 'none';
                    pageElementTop.textContent = '';
                    prevButtonBottom.style.display = 'none';
                    nextButtonBottom.style.display = 'none';
                    pageElementBottom.textContent = '';
                    resultsTable.style.display = 'none';
                    entriesCount.textContent = '';
                } else {
                    // If the search field is not empty, show table elements
                    prevButtonTop.style.display = 'inline-block';
                    nextButtonTop.style.display = 'inline-block';
                    prevButtonBottom.style.display = 'inline-block';
                    nextButtonBottom.style.display = 'inline-block';
                    resultsTable.style.display = 'table';

                    for (let i = 0; i < entries.length; i++) {
                        let entry = entries[i];
                        if (entry.value.toLowerCase().indexOf(searchTerm) >= 0) {
                            results.push(entry);
                        }
                    }

                    entriesCount.textContent = `${results.length} vastet - "${searchTerm}"`;

                    pageElementTop.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;
                    pageElementBottom.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;

                    // Calculate the start and end index for the current page
                    let startIndex = (currentPage - 1) * entriesPerPage;
                    let endIndex = Math.min(startIndex + entriesPerPage, results.length);

                    // clear current data
                    resultsList.innerHTML = '';
                    table_speech_text = '';

                    for (let i = startIndex; i < endIndex; i++) {
                        let result = results[i];
                        // Text-to-speech
                        table_speech_text += `${result.value.charAt(0).toUpperCase() + result.value.slice(1)}. `;
                        
                        let listRow = document.createElement('tr');
                        let listRowHeader = document.createElement('th');
                        let listRowData1 = document.createElement('td');
                        let listRowData2 = document.createElement('td');

                        let listRowHeaderText = document.createTextNode(`${result.tyybi_nr}`);
                        let listRowData1Text = document.createTextNode(`${result.value}`);
                        let listRowData2Text = document.createTextNode(`${result.authentic_texts}`);

                        listRowHeader.appendChild(listRowHeaderText);
                        listRowData1.appendChild(listRowData1Text);
                        listRowData2.appendChild(listRowData2Text);

                        listRow.appendChild(listRowHeader);
                        listRow.appendChild(listRowData1);
                        listRow.appendChild(listRowData2);

                        resultsList.appendChild(listRow);
                    }
                    table_speech_text = table_speech_text.replaceAll('®','').replace(/\r/g, '').replace(/\s+/g, ' ').replace(/ \. /g, '. ');
                    console.log(table_speech_text);
                    resultsTable.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
                }
            }, 500);
    });

        prevButtonTop.addEventListener('click', function(){
            if(currentPage > 1){
                currentPage--;
                pageElementTop.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;
                searchField.dispatchEvent(new Event('input'));
            }
        });
        prevButtonBottom.addEventListener('click', function(){
            if(currentPage > 1){
                currentPage--;
                pageElementBottom.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;
                searchField.dispatchEvent(new Event('input'));
            }
        });

        nextButtonTop.addEventListener('click', function(){
            if(currentPage < Math.ceil(results.length / entriesPerPage)){
                currentPage++;
                pageElementTop.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;
                searchField.dispatchEvent(new Event('input'));
            }
        });
        nextButtonBottom.addEventListener('click', function(){
            if(currentPage < Math.ceil(results.length / entriesPerPage)){
                currentPage++;
                pageElementTop.textContent = `${currentPage} / ${Math.ceil(results.length / entriesPerPage)}`;
                searchField.dispatchEvent(new Event('input'));
            }
        });
    }
};
xhttp.open('GET', './txt/vanasonad.txt', true);
xhttp.send();