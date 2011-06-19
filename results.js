function makeMessage(msg){
    return function(error){
        document.getElementById('results').innerHTML = '<p>'+ msg +'</p>';
        if(error.code){
            document.getElementById('results').innerHTML += '<pre>'+ error.code +'</pre>';
        }
    };
}

function saveBlob(blob, filename){
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(
        window.PERSISTENT,
        3*1024*1024,
        function(fs){
            fs.root.getFile(
                filename,
                {create: true},
                function(entry){
                    entry.createWriter(function(writer){
                        writer.write(blob);
                        writer.onwrite = makeMessage(
                            'Great success! '+
                            '<a href="'+ entry.toURL('text/plain') +'" target="_blank">Download</a>'
                        );
                    }, makeMessage('Error writing to file'));
                },
                makeMessage('Error getting a file')
            );
        },
        makeMessage('Filesystem error')
    );
}

function loadResults(results, sender){
    var content = '';

    for(var i=0, l=results.length; i<l; i++){
        content += results[i] +'\n';
    }

    var bb = new WebKitBlobBuilder();
    bb.append(content);

    var date = new Date();
    var filename = 'feedslist-'+ date.getTime() +'.txt';

    saveBlob(bb.getBlob('text/plain'), filename);
}

chrome.extension.onRequest.addListener(loadResults);
chrome.tabs.executeScript(null, {file: 'scraper.js'});
