import axios from 'axios';

export default async function getPhotoFromServer(value) {
  const KEY = '32193446-673e16063f0204736e3ddb7cd';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const arrayOfPhoto = response.data.hits;
    return arrayOfPhoto;
    // console.log(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}
