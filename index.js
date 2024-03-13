const btnEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");
const apiKey = "NclhZfNMCljOgsHgedfNWdVmn_SRmuZrDBy_KuPJOT4";

async function getImages() {
  const inputValue = document.getElementById("input").value;
  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 1 and 10";
    return;
  }
  imgs = "";
  try {
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    errorMessageEl.style.display = "none";
    btnEl.style.display = "block";
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=${apiKey}`
    );
    const data = await response.json();
    if (data) {
      data.forEach((pic) => {
        imgs += `<img src="${pic.urls.small}" />`;
        galleryEl.style.display = "block";
        galleryEl.innerHTML = imgs;
        errorMessageEl.style.display = "none";
        btnEl.style.display = "block";
      });
    }
  } catch (error) {
    galleryEl.style.display = "none";
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error happened, try again later";
    btnEl.style.display = "block";
  }
}

btnEl.addEventListener("click", getImages);
