import React, {Component, useState, useEffect} from 'react'; 
import { connect } from 'react-redux'; 
import {updateSearchTerm, updatePageNumber} from './../action';
 
function Header(props) {
	const [searchTerm, setSearchTerm] = useState(''); 

	const handleSearch = (e) => {
		setSearchTerm(e.target.value); 
		props.onUpdateSearchTerm(e.target.value); 
	} 

	return (
		<div className="header-container"> 
			<input type="text"  value={searchTerm} onChange = { handleSearch } placeholder="Search"/> 
		</div>
	)
}

const mapDispatchToProps = dispatch => {
     return {
		onUpdateSearchTerm : (searchTerm) => dispatch(updateSearchTerm(searchTerm)) 
     }
}
 
export default connect(null, mapDispatchToProps)(Header)

