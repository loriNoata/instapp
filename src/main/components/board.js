import React, {Component, useEffect, useState} from 'react'; 
import { connect } from 'react-redux'; 
import PhotosSearch from './../reducer'; 


function Board(props)  {
    const urlPhotos = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=15b67c2a8b4288ff1fddf5eb56655cfb&content_type=1&is_getty=1';
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();
    const [perpage, setPerpage] = useState(100);
    
    useEffect (() => {
        fetch(urlPhotos).then(response => {
            return response.json()
          }).then( data => {
            setPhotos(data.photos.photo)
        })
    })

    useEffect (() => {
        const apiKey = '15b67c2a8b4288ff1fddf5eb56655cfb';
        const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${props.searchTerm}&format=json&nojsoncallback=1`

        fetch(searchUrl).
            then(response => {
                return response.json()
            }).
            then( data => {
                (data.photos) ? console.log("ll", data.photos.photo) : console.log("nn", data.photos) 
                return (data.photos) ? data.photos.photo : ""
            })
    }, [props.searchTerm])
  

    const setUrlFromData = (data) => {
        const {id, farm, server, secret } = data;
        const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        
        return photoUrl
    }

    const displayDefaultPhotos = (photos) => {
        return(
            photos.map(photo =>(
                <li className="image-container" key={photo.id}>
                    <img  src={setUrlFromData(photo)}  className="image-full"/>  
                </li>
            ))
        )
    }
    
    return (
        
        <div className="board-container">  
            <ul>

             { (props.searchTerm === "") && displayDefaultPhotos(photos) }
             { (props.searchTerm) && displayDefaultPhotos(photos) }
            </ul>
        </div>
	)
}
 
function mapStateToProps(state) {
     return {
        searchTerm : state.PhotosSearch.searchTerm
     }
 }
 
 // const mapDispatchToProps = dispatch => {
 //     return {
 //         //onChangeStep: (current) => dispatch(changeStep(current)), 
 //     }
 // }
 
export default connect(mapStateToProps, null)(Board)

