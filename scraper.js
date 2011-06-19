var entries = document.querySelectorAll('#entries div.entry:not(.read) .entry-original');
var entriesUrls = [];

for(var i=0, l=entries.length; i<l; i++){
    entriesUrls.push(entries[i].href);
}

chrome.extension.sendRequest(entriesUrls);
