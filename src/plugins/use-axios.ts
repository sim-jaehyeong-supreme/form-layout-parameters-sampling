import axiosOriginal from 'axios';

export const useAxios = () => {
    const axios = axiosOriginal.create({
        baseURL: "http://localhost:7777",
        headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json'
    })

    return {
        axios
    };
}
