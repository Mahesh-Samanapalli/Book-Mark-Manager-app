async function fetchBookmarks() {
  try {
    // Fetch the data from the JSON file
    const response = await fetch("./data.json");
    console.log(response);
    // Check if the response is successful (status code 200-299), handling the http error if not
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const bookmarks = data.bookmarks;
    console.log(bookmarks);
    // Call the function to render bookmarks
    renderBookmarks(bookmarks);

  } catch (error) {
    console.error("Error fetching bookmarks:", error);
  }
}

// Call the function to fetch bookmarks when the page loads
fetchBookmarks();

function renderBookmarks(bookmarks) {
    console.log("dynamically rendering bookmarks");
    for(let i=0;i<bookmarks.length;i++){
        console.log(bookmarks[i]);
    }
}

