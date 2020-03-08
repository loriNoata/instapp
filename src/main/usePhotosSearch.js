import React, { useEffect } from 'react';
import axios from 'axios';

export default function useBookSearch(query, pageNumber) {
    

    useEffect(() => {
        axios({
            method: 'GET', 
            url: 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&text=love&format=json&nojsoncallback=1', 
            params: {q: query, page: pageNumber}
        })
    },[query, pageNumber]).then( res => {
        console.log(res.data)
    })


 }