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

        let entries = this.responseText.split('\n');

        let currentPage = 1;
        let entriesPerPage = 30;

        let timeout = null;

        let results = [];

        searchField.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                let searchTerm = searchField.value.toLowerCase();
                results = [];
                table_speech_text = '';

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
                        if (entry.toLowerCase().indexOf(searchTerm) >= 0) {
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
                        table_speech_text += `${result.charAt(0).toUpperCase() + result.slice(1)}. `;

                        let listRow = document.createElement('tr');
                        let listRowHeader = document.createElement('td');

                        let listRowHeaderText = document.createTextNode(`${result}`);

                        listRowHeader.appendChild(listRowHeaderText);

                        listRow.appendChild(listRowHeader);

                        resultsList.appendChild(listRow);
                    }
                    
                    table_speech_text = table_speech_text.replaceAll('®','').replace(/\r/g, '').replace(/\s+/g, ' ').replace(/ \. /g, '. ');

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
xhttp.open('GET', './txt/konekaanud.txt', true);
xhttp.send();