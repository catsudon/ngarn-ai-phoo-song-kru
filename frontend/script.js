const backendIPAddress = "localhost:4000/download"

document.querySelectorAll(".button")[0].addEventListener("click", function () {
    const options = {
        method: "GET",
        credentials: "include",
    };

    let url = document.getElementById("url").value;
    let start = document.getElementById("start").value;
    let stop = document.getElementById("stop").value;
    
    if(start > stop || start == "" || stop == "" ) alert("invalid input")
    else
    fetch(
        `http://${backendIPAddress}/?url=${url}&start=${start}&stop=${stop}`
    )
    .then(response => {
        if (response.ok) {
          return response.blob(); // Convert the response to a Blob object
        } else {
          throw new Error('Error downloading the file');
        }
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${url}_trimmed.mp4`; // Set the desired file name and extension
        a.click(); // Trigger the download
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
});