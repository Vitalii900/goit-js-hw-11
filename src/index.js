import getPhotoFromServer from './getPhotoFromServer';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreButtonRef = document.querySelector('.load-more');

formRef.addEventListener('submit', searchPhoto);
loadMoreButtonRef.addEventListener('click', loadMore);
loadMoreButtonRef.classList.add('visually-hidden');

let pageCounter = 1;
let inputValue = '';

async function searchPhoto(event) {
  event.preventDefault();
  pageCounter = 1;
  
  inputValue = event.target.elements.searchQuery.value;
  const { hits, totalHits } = await getPhotoFromServer(inputValue, pageCounter);
  
  galleryRef.innerHTML = '';

  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else if (hits.length < 40) {
    loadMoreButtonRef.classList.add('visually-hidden');
  } else {
    loadMoreButtonRef.classList.remove('visually-hidden');
    Notify.success(`Hooray! We found ${totalHits} images.`);
  };

  addMurkupOnPage(hits);
  new SimpleLightbox('.photo-card a');
}

async function loadMore() {
  pageCounter += 1;

  const { hits, totalHits } = await getPhotoFromServer(inputValue, pageCounter);
  let amountOnPage = totalHits - hits.length * pageCounter;

  if (hits.length < 40 || amountOnPage <= 0) {
    loadMoreButtonRef.classList.add('visually-hidden');
    Notify.failure(
      'We are sorry, but you have reached the end of search results'
    );
  }

  addMurkupOnPage(hits);
  // console.log(hits);
  const lightbox = new SimpleLightbox('.photo-card a');
  lightbox.refresh();
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

