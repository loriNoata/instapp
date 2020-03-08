import React, {useEffect, useState, useRef,  useCallback } from 'react'; 
import { connect } from 'react-redux'; 
import axios from 'axios'; 
 

function Board(props)  {
    const apiKey = '15b67c2a8b4288ff1fddf5eb56655cfb';
    const baseUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search'
    const formatUrl = 'format=json&nojsoncallback=1'; 

    const [photos, setPhotos] = useState([]);
    const [searchedPhotos, setSearchedPotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false); 
    const [page, setPage] = useState(1)

    const urlPhotos = `${baseUrl}&safe_search=1&${formatUrl}&api_key=${apiKey}&page=${page}&content_type=1&is_getty=1`;
    const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&page=${page}&${formatUrl}`

    const observer = useRef(); 
    const lastPhotoElementRef = useCallback( node => {
        if (loading) return
        // disconnect the  observer so that the new last element will be connected to the current one 
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            console.log("entries", entries)
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage =>{ 
                    console.log("prevPage is:", prevPage )
                   return prevPage + 1})

            }
        })

        if (node) observer.current.observe(node)
        

    }, [loading, hasMore])


    useEffect (() => {
      
        // if (props.searchTerm === '') {
            console.log("only the normal imgs");
            setLoading(true);
            setError(false); 
            const url = (props.searchTerm === '') ? urlPhotos : searchUrl

            console.log(url ); 
            fetch(url).
                then(response => {
                    return response.json()
                }).
                then(data => {
                    const {photo} = data.photos; 
                    
                    setPhotos(prevPhoto => {
                        console.log("prevPhoto>>>", prevPhoto);
                        return [...prevPhoto, ...photo]
                    }); 
                    //console.log(photo.length );
                    setHasMore(photo.length > 0);
                    setLoading(false);

                }).catch(err => {
                
                    setError(true); 
            });
        // } else{
        //     console.log('pagina noua search');
        //     console.log(page);
        // }
        
    }, [page])


    useEffect (() => {
        //search 
        if (props.searchTerm !=='') {
            setLoading(true);
            setError(false); 
            const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&page=1&${formatUrl}`
            fetch(searchUrl).
                then(response => {
                    return response.json()
                }).
                then(data => {
                    setLoading(false);
                    console.log("fetch search photos ..", data.photos);
                    setSearchedPotos(data.photos.photo) 
                }).catch(err => {
                    setError(true); 
            });
            console.log( "props.searchTerm", props.searchTerm)
        }
        
    }, [ props.searchTerm ])
  
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
     }
 }
 
export default connect(mapStateToProps, null)(Board)

