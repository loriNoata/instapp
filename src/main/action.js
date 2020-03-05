
export const updateSearchTerm = value => ({
    type: 'UPDATE_SEARCH_TERM',
    value
})

export const updatePageNumber = (searchTerm, pageNumber) => ({
    type: 'UPDATE_PAGE_NUMBER', 
    searchTerm, 
    pageNumber
})
 

  