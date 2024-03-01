import axios from "axios";
export const fetchPexelsImage = async () => {
    const response = await axios.get('https://api.pexels.com/v1/search', {
        params: { query: 'blogging', per_page: 1 },
        headers: { Authorization: 'Bearer G7gFS6oD1OpyCijZRBQWgsrsaGUd8bs1e6PEyuVguHOMg614s1EEFsCz' }
    });
    return response.data.photos[0].src.medium;
};