document.getElementById('installSectionLink').addEventListener('click', function () {
    var installBtn = document.getElementById('installBtn');
    var apkLink = document.getElementById('apkLink');
    var progressContainer = document.getElementById('progressContainer');
    var progressBar = document.getElementById('progressBar');

    // Show progress bar
    progressContainer.style.display = 'block';

    // Create a new XMLHttpRequest to handle the download
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apkLink.href, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = percentComplete + '%';
            progressBar.innerHTML = Math.floor(percentComplete) + '%';
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Create a new Blob object using the response data of the onload object
            var blob = new Blob([xhr.response], { type: 'application/vnd.android.package-archive' });

            // Create a link element, hide it, direct it towards the blob, and then 'click' it programmatically
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'JetCrashAviator';
            document.body.appendChild(link);
            link.click();

            // Remove link from body
            document.body.removeChild(link);

            // Hide progress bar and update button text
            progressContainer.style.display = 'none';
            installBtn.textContent = 'Open App';
            installBtn.onclick = function () {
                // Logic to open the app
                window.location.href = 'intent://#Intent;scheme=package;package=com.jetcrash.ai;end';
            };
        } else {
            alert('Failed to download the file.');
        }
    };

    xhr.onerror = function () {
        alert('An error occurred while downloading the file.');
    };

    // Send the request to start the download
    xhr.send();
});
