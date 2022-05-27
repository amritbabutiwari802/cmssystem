import axios from "axios";

async function get(url, headers) {
  try {
    const result = await axios.get(url, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    return { success: false, result: err };
  }
}

export default get;
