import React, {Component, useEffect, useState} from 'react'; 
 

 
	export default function Board()  {
    const urlPhotos = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&content_type=1&is_getty=1';
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();
    const [perpage, setPerpage] = useState(100);
    
    useEffect (() => {
        fetch(urlPhotos).then(response => {
            return response.json()
          }).then( data => {
            console.log(data);
            setPhotos(data.photos.photo)

        })
    })

    const setUrlFromData = (data) => {
        const {id, farm, server, secret } = data;
        const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        
        return photoUrl
    }

    return (
        <div className="board-container">  
            <ul>
                { photos.map(photo =>(
                <li className="image-container" key={photo.id}>
                    <img  src={setUrlFromData(photo)}  className="image-full"/>  
                </li>
                ))}
            </ul>
        </div>

		)

    }
 
		
 
 

