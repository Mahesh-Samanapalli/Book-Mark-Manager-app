async function fetchBookmarks(){
    const response = await fetch('./data.json');
    const bookmarks = await response.json();
    console.log(bookmarks);
}

// Call the function to fetch bookmarks when the page loads
fetchBookmarks();
