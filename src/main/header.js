import React, {Component, useState, useEffect} from 'react'; 
 
 
export default function Header() {

const [searchTerm, setSearchTerm] = useState(''); 
const [pageNumber, setPageNumber] = useState(1); 

function handleSearch (e)  {
	console.log(e.target.value);
	setSearchTerm(e.target.value); 
	setPageNumber(1); 
} 
  
return (
	<div className="header-container"> 
		<input type="text"  value={searchTerm} onChange = { handleSearch } placeholder="Search"/> 
	</div>
)
 
}

