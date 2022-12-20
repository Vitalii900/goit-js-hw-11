import axios from 'axios';

export default async function getPhotoFromServer(value, page) {
  const KEY = '32193446-673e16063f0204736e3ddb7cd';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    const arrayOfPhoto = response.data;
    console.log(response.data);
    return arrayOfPhoto;
  } catch (error) {
    console.error(error);
  }
}
