const initialState = {
  photos: [], 
  searchTerm: ''
}

const PhotosSearch = (state = initialState, action) => {
   
      switch (action.type) {
        case 'UPDATE_SEARCH_TERM':
          return {           
            ...state,
            searchTerm: action.value, 
          }
          case 'USE_PHOTOS_SEARCH':
          return {           
            ...state,
            searchTerm: action.searchTerm,
            pageNumber: action.pageNumber,
          }
        default:
          return state
      }
    }
    
export default PhotosSearch