import axios from "axios";

async function post(url, data, headers) {
  try {
    const result = await axios.post(url, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    return { success: false, result: err };
  }
}

export default post;
