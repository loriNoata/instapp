import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";

function Board(props) {
  const apiKey = "15b67c2a8b4288ff1fddf5eb56655cfb";
  const baseUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
  const formatUrl = "format=json&nojsoncallback=1";

  const [photos, setPhotos] = useState([]);
  const [searchedPhotos, setSearchedPotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSearchedPhotos, setPageSearchedPhotos] = useState(1);

  const urlPhotos = `${baseUrl}&safe_search=1&${formatUrl}&api_key=${apiKey}&page=${page}&content_type=1&is_getty=1`;
  const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&page=${pageSearchedPhotos}&${formatUrl}`;

  const observer = useRef();
  const lastPhotoElementRef = useCallback(
    node => {
      if (loading) return;
      // disconnect the  observer so that the new element will be connected to the current one
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          // set the page number depending if we are searching or not
          const setPageType = props.searchTerm === "" ? 
                                setPage : 
                                setPageSearchedPhotos;
          setPageType(prevPage => {
            return prevPage + 1;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    setError(false);
    const url = props.searchTerm === "" ? urlPhotos : searchUrl;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { photo } = data.photos;
        const setPhotoType = props.searchTerm === "" ? setPhotos : setSearchedPotos;
        setPhotoType(prevPhoto => {
          return [...new Set([...prevPhoto, ...photo])];
        });

        setHasMore(photo.length > 0);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
      });
  }, [page, pageSearchedPhotos]);

  useEffect(() => {
    //search
    if (props.searchTerm !== "") {
      setLoading(true);
      setError(false);
      const searchUrl = `${baseUrl}&api_key=${apiKey}&text=${props.searchTerm}&page=1&${formatUrl}`;
      fetch(searchUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { photo } = data.photos;
          setLoading(false);

          setSearchedPotos(prevPhoto => {
            return [...new Set([...prevPhoto, ...photo])];
          });
        })
        .catch(err => {
          setError(true);
        });
    }
  }, [props.searchTerm]);

  const setUrlFromData = data => {
    const { id, farm, server, secret } = data;
    const photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

    return photoUrl;
  };

  const displayDefaultPhotos = photos => {
    return photos.map((photo, index) => {
      if (photos.length === index + 1) {
        return (
          <li className="image-container" key={photo.id} ref={lastPhotoElementRef}>
            <img src={setUrlFromData(photo)} />
            <span> {photo.title} </span>
          </li>
        );
      } else {
        return (
          <li className="image-container" key={photo.id}>
            <img src={setUrlFromData(photo)} />
            <span> {photo.title} </span>
          </li>
        );
      }
    });
  };

  return (
    <div className="board-container">
      <div> {loading && "Loading ..."} </div>
      <div> {error && "error ..."} </div>

      <ul>
        {props.searchTerm
          ? displayDefaultPhotos(searchedPhotos)
          : displayDefaultPhotos(photos)}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    searchTerm: state.PhotosSearch.searchTerm
  };
}

export default connect(mapStateToProps, null)(Board);
