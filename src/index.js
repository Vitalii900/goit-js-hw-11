import axios from 'axios';
import getPhotoFromServer from './getPhotoFromServer';

const formRef = document.querySelector('#search-form');

formRef.addEventListener('submit', searchPhoto);


async function searchPhoto(event) {
    event.preventDefault();
    const inputValue = formRef.elements.searchQuery.value;
    
    const array = await getPhotoFromServer(inputValue);
    console.log(array);

}

function addMurkupOnPage(arrayOfObjects) {
    
}