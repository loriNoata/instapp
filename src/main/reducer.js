const initialState = {
  searchTerm: ''
}

const PhotosSearch = (state = initialState, action) => {
   
      switch (action.type) {
        case 'UPDATE_SEARCH_TERM':
          return {           
            ...state,
            searchTerm: action.value, 
          }
          
        default:
          return state
      }
    }
    
export default PhotosSearch