import axios from "axios";

export default function FetchSuggestions({ search }) {
  const fetchSuggestions = async (search) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/v1/products/all?search=${search}`
      );
      console.log(response);
      if (response.error) {
        throw new Error("Network response was not OK");
      }

      return response.data.products;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}
