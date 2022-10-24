import axios from 'axios';

const fetchImages = async (query, page) => {
  const data = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=29839471-7dd87ec03b57b90ea35b79230&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default fetchImages;
