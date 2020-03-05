import React, {useEffect, useState} from 'react'; 
import { connect } from 'react-redux'; 
 

function Board(props)  {
    const apiKey = '15b67c2a8b4288ff1fddf5eb56655cfb';
    const baseUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search'
    const formatUrl = 'format=json&nojsoncallback=1'; 

    const urlPhotos = `${baseUrl}&safe_search=1&${formatUrl}&api_key=${apiKey}&content_type=1&is_getty=1`;
    const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&${formatUrl}`

    const [photos, setPhotos] = useState([]);
    const [searchedPhotos, setSearchedPotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false); 
    
    useEffect (() => {

        setLoading(true);
        setError(false); 

        fetch(urlPhotos).then(response => {
            return response.json()
          }).then( data => setPhotos( data.photos.photo
              
        //     prevPhoto => {
        //         return [...prevPhoto, data.photos.photo]
        //     }
          )
          )
    })

    useEffect (() => {
        setLoading(true);
        setError(false); 

        fetch(searchUrl).
            then(response => {
                return response.json()
            }).
            then(data => {
                (data.photos) ? setSearchedPotos(data.photos.photo) : console.log("nn", data.photos) 
            })
    }, [props.searchTerm])
  
    const setUrlFromData = (data) => {
        console.log("data",  data);
        const {id, farm, server, secret } = data;
        const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        
        return photoUrl
    }

    const displayDefaultPhotos = (photos) => {
        return(
            photos.map(photo =>(
                <li className="image-container" key={photo.id}>
                    <img  src={setUrlFromData(photo)}/>  
                    <span> {photo.title} </span>
                </li>
            ))
        )
    }

    return (
        <div className="board-container">  
            {/* {loading && <div> loading .. </div>} */}
            <ul>
             { (props.searchTerm) ? displayDefaultPhotos(searchedPhotos) : displayDefaultPhotos(photos)}
            </ul>
        </div>
	)
}
 
function mapStateToProps(state) {
     return {
        searchTerm : state.PhotosSearch.searchTerm
     }
 }
 
export default connect(mapStateToProps, null)(Board)

