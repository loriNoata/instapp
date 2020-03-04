
export const updateSearchTerm = value => ({
    type: 'UPDATE_SEARCH_TERM',
    value
})

export const usePhotosSearch = (searchTerm, pageNumber) => ({
    type: 'USE_PHOTOS_SEARCH', 
    searchTerm, 
    pageNumber
})
 

  