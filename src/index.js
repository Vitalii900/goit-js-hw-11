import getPhotoFromServer from './getPhotoFromServer';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreButtonRaf = document.querySelector('.load-more');

formRef.addEventListener('submit', searchPhoto);
loadMoreButtonRaf.addEventListener('click', loadMore);

let pageCounter = 1;
let inputValue = '';

async function searchPhoto(event) {
  event.preventDefault();
  pageCounter = 1;
  inputValue = event.target.elements.searchQuery.value;
  const array = await getPhotoFromServer(inputValue, pageCounter);
  addMurkupOnPage(array);
  
}

async function loadMore() {
  pageCounter += 1;
  const array = await getPhotoFromServer(inputValue, pageCounter);
  addMurkupOnPage(array);
  // console.log(array);
}

function addMurkupOnPage(arrayOfObjects) {
  const murkupFromArray = arrayOfObjects.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
              <a href="${largeImageURL}"> 
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: </b>${likes}
                </p>
                <p class="info-item">
                  <b>Views: </b>${views}
                </p>
                <p class="info-item">
                  <b>Comments: </b>${comments}
                </p>
                <p class="info-item">
                  <b>Downloads: </b>${downloads}
                </p>
              </div>
      </div>`;
      }
    )
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', murkupFromArray);
}
