const bookmarkContainer = document.getElementById("bookmarkContainer");
const sidebarContainer = document.getElementById("sidebarContainer");
const searchInput = document.getElementById("searchInput");
const sortByBtn = document.getElementById("sortBy-btn");
const sortByOptions = document.getElementById("sortBy-options");
const addBookmarkModal = document.getElementById("addBookmarkModal");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeBtn");
const bookmarkForm = document.getElementById("addBookmarkForm");

let bookmarks = []; // Global variable to store bookmarks data
async function fetchBookmarks() {
  try {
    // Fetch the data from the JSON file
    const response = await fetch("./data.json");
    console.log(response);
    // Check if the response is successful (status code 200-299), handling the http error if not
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    bookmarks = data.bookmarks;
    console.log(bookmarks);
    // Call the function to render bookmarks
    // renderBookmarks(bookmarks)''
    renderBookmarksFn(bookmarks);
    rendersidebarTags(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
  }
}

// Call the function to fetch bookmarks when the page loads
fetchBookmarks();

function renderBookmarks(bookmarks) {
  let cardsHtml = "";
  console.log("dynamically rendering bookmarks");
  for (let i = 0; i < bookmarks.length; i++) {
    let bookmark = bookmarks[i];
    console.log(bookmark);
    cardsHtml += `
          <div class="bookmark-card">
              <div class="card-main-cnt">
                <div class="card-header">
                  <div class="card-logo">
                    <div class="org-logo">
                      <img
                        src="${bookmark.favicon}"
                        alt="${bookmark.title}"
                      />
                    </div>
                    <div class="org-title">
                      <h3>${bookmark.title}</h3>
                      <span>${bookmark.url}</span>
                    </div>
                  </div>
                  <div class="edit-dtls">
                    <img src="./assets/images/icon-menu-bookmark.svg" alt="" />
                  </div>
                </div>
                <div class="card-content">
                  <p>
                    ${bookmark.description}
                  </p>
                </div>
                <div class="card-tags">`;
    for (let j = 0; j < bookmark.tags.length; j++) {
      cardsHtml += `<span class="tag">${bookmark.tags[j]}</span>`;
    }
    cardsHtml += `  
                 </div>
              </div>
              <div class="card-footer">
                <div class="card-details">
                  <div class="footer-item card-view-count">
                    <img src="./assets/images/icon-visit-count.svg" alt="" />
                    <span>${bookmark.visitCount}</span>
                  </div>
                  <div class="footer-item card-last-seen">
                    <img src="./assets/images/icon-last-visited.svg" alt="" />
                    <span>${formatDate(bookmark.lastVisited)}</span>
                  </div>
                  <div class="footer-item card-published">
                    <img src="./assets/images/icon-created.svg" alt="" />
                    <span>${formatDate(bookmark.createdAt)}</span>
                  </div>
                </div>
                <div class="card-status">
                   ${bookmark.pinned ? `<img src="./assets/images/icon-pin.svg" alt="">` : ""}
                </div>
              </div>
            </div>`;
  }
  bookmarkContainer.innerHTML = cardsHtml;
}
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

// fetch renderBookmarks with functional programming approach

function renderBookmarksFn(bookmarks) {
  const cardsHtml = bookmarks
    .map((bookmark) => createBookmarkCard(bookmark))
    .join("");

  bookmarkContainer.innerHTML = cardsHtml;
}

function createBookmarkCard(bookmark) {
  return `<div class="bookmark-card">
              <div class="card-main-cnt">
                <div class="card-header">
                  <div class="card-logo">
                    <div class="org-logo">
                      <img
                        src="${bookmark.favicon}"
                        alt="${bookmark.title}"
                        onerror="this.onerror=null; this.src='./assets/images/favicon-stack-overflow.png';"
                      />
                    </div>
                    <div class="org-title">
                      <h3>${bookmark.title}</h3>
                      <span>${bookmark.url}</span>
                    </div>
                  </div>
                  <div class="edit-dtls">
                    <img src="./assets/images/icon-menu-bookmark.svg" alt="" />
                    <div class="card-actions-menu">
                         <button class="action-item">
                           <img src="./assets/images/icon-visit.svg" alt="" /> Visit
                         </button>
                          <button class="action-item">
                           <img src="./assets/images/icon-copy.svg" alt="" /> Copy URL
                         </button>
                         <button class="action-item">
                           <img src="./assets/images/icon-pin.svg" alt="" /> ${bookmark.pinned ? "Unpin" : "Pin"}
                          </button>
                          <button class="action-item">
                           <img src="
                           ./assets/images/icon-edit.svg" alt="" /> Edit
                         </button>
                          <button class="action-item">
                           <img src="./assets/images/icon-archive.svg" alt="" /> Archive
                         </button>  
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <p>
                    ${bookmark.description}
                  </p>
                </div>
                <div class="card-tags"> 
                 ${createTags(bookmark.tags)}
                 </div>
              </div>
              <div class="card-footer">
                <div class="card-details">
                  <div class="footer-item card-view-count">
                    <img src="./assets/images/icon-visit-count.svg" alt="" />
                    <span>${bookmark.visitCount}</span>
                  </div>
                  <div class="footer-item card-last-seen">
                    <img src="./assets/images/icon-last-visited.svg" alt="" />
                    <span>${formatDate(bookmark.lastVisited)}</span>
                  </div>
                  <div class="footer-item card-published">
                    <img src="./assets/images/icon-created.svg" alt="" />
                    <span>${formatDate(bookmark.createdAt)}</span>
                  </div>
                </div>
                <div class="card-status">
                   ${bookmark.pinned ? `<img src="./assets/images/icon-pin.svg" alt="">` : ""}
                </div>
              </div>
            </div>`;
}

function createTags(tags) {
  return tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

// dynamically render sidebar tags using the normal approach

//Brute force approach to get all unique tags and their count
function getAllTags(bookmarks) {
  const allTags = bookmarks.map((bookmark) => bookmark.tags);
  const flattenedTags = [];
  const tagsCount = [];
  allTags.forEach((tags) => {
    tags.forEach((tag) => {
      flattenedTags.push(tag);
    });
  });
  const uniqueTags = [];
  flattenedTags.forEach((tag) => {
    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag);
    }
  });
  console.log(uniqueTags);
  console.log(flattenedTags);

  uniqueTags.forEach((tag) => {
    let tagCount = flattenedTags.filter((t) => t === tag).length;
    tagsCount.push({ tagName: tag, count: tagCount });
  });
  console.log(tagsCount);
}

// Normal approach to get  all unique tags and their count
function rendersidebarTags(bookmarks) {
  const tagCountMap = getTagsCount(bookmarks);
  let sidebarHtml = "";
  for (let tag in tagCountMap) {
    sidebarHtml += `<div class="tag-item">
            <div class="tag-item-cnt">
              <input type="checkbox" value="${tag}" class="tag-checkbox"/>
              <span>${tag}</span>
            </div>
            <div class="tag-item-count">
              <span>${tagCountMap[tag]}</span>
            </div>
          </div>
    `;
  }
  sidebarContainer.innerHTML = sidebarHtml;
}
function getTagsCount(bookmarks) {
  const tagCountMap = {};
  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      if (tagCountMap[tag]) {
        tagCountMap[tag]++;
      } else {
        tagCountMap[tag] = 1;
      }
    });
  });
  // const tagsCount = Object.keys(tagCountMap).map((tag)=>({tagName:tag,count:tagCountMap[tag]}));
  // console.log(tagsCount);
  return tagCountMap;
}

// SEARCH FUNCTIONALITY

// Normal approach to filter bookmarks based on search input
searchInput.addEventListener("input", function (event) {
  const searchTerm = event.target.value.toLowerCase().trim();

  if (searchTerm === "") {
    renderBookmarksFn(bookmarks);
    return;
  }

  let filterbookmarks = [];
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].title.toLowerCase().includes(searchTerm)) {
      filterbookmarks.push(bookmarks[i]);
    }
  }
  console.log(searchTerm);
  console.log(filterbookmarks);
  renderBookmarksFn(filterbookmarks);
});

function tagSearchFn(searchTerm) {
  const filterbookmarks = bookmarks.filter((bookmark) =>
    bookmark.tags.some((tag) => tag.toLowerCase() === searchTerm.toLowerCase()),
  );
  renderBookmarksFn(filterbookmarks);
}
sidebarContainer.addEventListener("change", function (event) {
  const target = event.target;
  console.log(target);
  let selectedTags = [];
  if (!target.matches(".tag-checkbox")) return; // ignore other changes
  document.querySelectorAll(".tag-checkbox").forEach((checkbox) => {
    if (checkbox.checked) {
      selectedTags.push(checkbox.value);
    }
  });
  console.log(selectedTags);
  if (selectedTags.length === 0) {
    renderBookmarksFn(bookmarks);
    return;
  }
  const selectedTagsBookmarks = bookmarks.filter((bookmark) =>
    bookmark.tags.some((tag) => selectedTags.includes(tag)),
  );
  renderBookmarksFn(selectedTagsBookmarks);
});

sortByBtn.addEventListener("click", function () {
  const sortOptions = document.querySelector(".sortBy-options");
  sortOptions.classList.toggle("active");
});
// Handling the outside click for sort by options dropdown
document.addEventListener("click", function (event) {
  const sortOptions = document.querySelector(".sortBy-options");
  if (
    !sortByBtn.contains(event.target) &&
    !sortOptions.contains(event.target)
  ) {
    sortOptions.classList.remove("active");
  }
});

//SORT FUNCTIONALITY
sortByOptions.addEventListener("click", function (event) {
  const btn = event.target.closest(".filter-btns-btn"); // always the button
  if (!btn) return;

  const sortValues = ["recently_added", "recently_visited", "most_visited"];
  document.querySelectorAll(".filter-btns-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  btn.classList.add("active");

  if (!sortValues.includes(btn.value)) return;

  let sortedBookmarks = [...bookmarks];
  if (btn.value === "recently_added") {
    sortedBookmarks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } else if (btn.value === "recently_visited") {
    sortedBookmarks.sort(
      (a, b) => new Date(b.lastVisited) - new Date(a.lastVisited),
    );
  } else if (btn.value === "most_visited") {
    sortedBookmarks.sort((a, b) => b.visitCount - a.visitCount);
  }
  renderBookmarksFn(sortedBookmarks);
});

// ADD BOOKMARK MODAL FUNCTIONALITY
addBookmarkBtn.addEventListener("click", function () {
  addBookmarkModal.classList.add("active");
});

cancelBtn.addEventListener("click", closeAddBookmarkModal);

closeModalBtn.addEventListener("click", closeAddBookmarkModal);

function closeAddBookmarkModal() {
  addBookmarkModal.classList.remove("active");
}
const descriptionInput = document.getElementById("description");
descriptionInput.addEventListener("input", function () {
  const charCount = descriptionInput.value.length;
  const charCountElement = document.querySelector(".char-count");
  charCountElement.textContent = `${charCount}/280`;
});

// Form validation and submission
bookmarkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const websiteUrl = document.getElementById("websiteUrl").value.trim();
  const tags = document
    .getElementById("tags")
    .value.trim()
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
  // Validate the form inputs
  // Validate the title input
  const titleError = document.getElementById("titleError");
  let isValid = true;

  if (!title) {
    titleError.textContent = "Title is required";
    isValid = false;
  } else if (title.length < 3) {
    titleError.textContent = "Title must be at least 3 characters";
    isValid = false;
  } else if (title.length > 60) {
    titleError.textContent = "Title must be under 60 characters";
    isValid = false;
  } else if (/[<>]/.test(title)) {
    titleError.textContent = "Title cannot contain < or > characters";
    isValid = false;
  } else if (
    bookmarks.some((b) => b.title.toLowerCase() === title.toLowerCase())
  ) {
    titleError.textContent = "A bookmark with this title already exists";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

  // validate the description input
  const descriptionError = document.getElementById("descriptionError");
  if (!description) {
    descriptionError.textContent = "Description is required";
    isValid = false;
  } else if (description.length < 10) {
    descriptionError.textContent = "Description must be at least 10 characters";
    isValid = false;
  } else if (description.length > 280) {
    descriptionError.textContent = "Description must be under 280 characters";
    isValid = false;
  } else if (/[<>]/.test(description)) {
    descriptionError.textContent =
      "Description cannot contain < or > characters";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }
  // websiteUrl validation
  let webSiteUrlError = document.getElementById("websiteUrlError");
  if (!websiteUrl) {
    webSiteUrlError.textContent = "Website URL is required";
    isValid = false;
  } else if (!/^https?:\/\/.+$/.test(websiteUrl)) {
    webSiteUrlError.textContent = "Please enter a valid website URL";
    isValid = false;
  } else {
    webSiteUrlError.textContent = "";
  }

  let favicon;
  try {
    const domain = new URL(websiteUrl).hostname;
    favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    favicon = "./assets/images/default-favicon.png"; // fallback
  }

  //Tags validation
  let tagsError = document.getElementById("tagsError");
  let hasDuplicate = tags.some((tag, index) => tags.indexOf(tag) !== index);
  if (tags.length === 0) {
    tagsError.textContent = "Atleast one tag is required";
    isValid = false;
  } else if (hasDuplicate) {
    tagsError.textContent = "duplicate tags are not allowed .";
    isValid = false;
  } else if (tags.length > 5) {
    tagsError.textContent = "Max 5 tags are allowed";
    isValid = false;
  } else {
    tagsError.textContent = "";
  }

  // Form submission validation
  if (isValid) {
    const bookmark = {
      id: `bm-${Date.now()}`,
      title,
      url: websiteUrl,
      favicon,
      description,
      tags,
      pinned: false,
      isArchived: false,
      visitCount: 0,
      createdAt: new Date().toISOString(),
      lastVisited: null,
    };

    bookmarks.push(bookmark);
    closeAddBookmarkModal();
    renderBookmarksFn(bookmarks);
    rendersidebarTags(bookmarks);
    bookmarkForm.reset();
    document.querySelector(".char-count").textContent = "0/280";
  }
});

bookmarkContainer.addEventListener("click", function(event) {
  const editBtn = event.target.closest(".edit-dtls");
  if (!editBtn) return;
  
  const actionMenu = editBtn.querySelector(".card-actions-menu");
  actionMenu.classList.toggle("active");
});
