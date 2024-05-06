import axios from "axios";

const API_KEY = '43504463-474e6c88001ddff9d6d6f766c';
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = apiUrl+"&per_page=25&safesearch=true&editor_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map(key => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  // console.log("final url", url);
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const {data} = response;
    return { success: true, data };

  } catch (error) {
    console.log(`got error`, error.message);
    return { success: false, msg: error.message };
  }
};
 