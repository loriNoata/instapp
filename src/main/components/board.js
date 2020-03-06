import React, {useEffect, useState, useRef,  useCallback } from 'react'; 
import { connect } from 'react-redux'; 
import axios from 'axios'; 

function Board(props)  {
    const apiKey = '15b67c2a8b4288ff1fddf5eb56655cfb';
    const baseUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search'
    const formatUrl = 'format=json&nojsoncallback=1'; 

    const urlPhotos = `${baseUrl}&safe_search=1&${formatUrl}&api_key=${apiKey}&content_type=1&is_getty=1`;
    const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&${formatUrl}`

    const [photos, setPhotos] = useState([]);
    const [searchedPhotos, setSearchedPotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false); 
    const [page, setPage] = useState(1)
    
    const observer = useRef(); 
    const lastPhotoElementRef = useCallback( node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("visibleee")
            }
        })

        if (node) observer.current.observe(node)
        console.log("node", node);

    }, [loading, hasMore])


    useEffect (() => {
   
        setLoading(true);
        setError(false); 
     
        fetch(urlPhotos).
            then(response => {
                return response.json()
            }).
            then(data => {
               
                const {photo,page, pages} = data.photos; 
                setPhotos(prevPhoto => {
                    return [...prevPhoto, ...photo]
                }); 
                //console.log(photo.length );
                setPage(page); 
                setHasMore(photo.length > 0);
                setLoading(false);

            }).catch(err => {
               
                setError(true); 
            });
    }, [page])


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
    }, [props.searchTerm, page])
  
    const setUrlFromData = (data) => {
       
        const {id, farm, server, secret } = data;
        const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
        
        return photoUrl
    }

    const displayDefaultPhotos = (photos) => {
        return(
            photos.map( (photo, index)  =>{
              
                if (photos.length === index + 1)  {
                 return(
                    <li className="image-container"  key={photo.id} ref={lastPhotoElementRef} >
                        <img  src={setUrlFromData(photo)} />  
                        <span> {photo.title} </span>
                    </li>
                 )   
                } else {
                   return( 
                        <li className="image-container"  key={photo.id} >
                            <img  src={setUrlFromData(photo)}/>  
                            <span> {photo.title} </span>
                        </li>
                   )
                }
                    
                 
            }
        )
        )
    }

    return (
        <div className="board-container">  
         
            <ul>
             { (props.searchTerm) ? displayDefaultPhotos(searchedPhotos) : displayDefaultPhotos(photos)}
            </ul>

            <div> {loading && 'Loading ...' } </div>
            <div> {error && 'error ...' } </div>
        </div>
	)
}
 
function mapStateToProps(state) {
     return {
        searchTerm : state.PhotosSearch.searchTerm, 
        pageNumber : state.PhotosSearch.pageNumber
     }
 }
 
export default connect(mapStateToProps, null)(Board)

