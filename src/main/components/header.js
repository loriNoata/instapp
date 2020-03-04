import React, {Component, useState, useEffect} from 'react'; 
import { connect } from 'react-redux'; 
import {updateSearchTerm} from './../action';
 

function Header(props) {

const [searchTerm, setSearchTerm] = useState(''); 
const [pageNumber, setPageNumber] = useState(1); 

const handleSearch = (e) => {
	setSearchTerm(e.target.value); 
	setPageNumber(1); 
	props.onUpdateSearchTerm(e.target.value); 
} 

 

return (
	<div className="header-container"> 
		<input type="text"  value={searchTerm} onChange = { handleSearch } placeholder="Search"/> 
	</div>
)
 
}

// function mapStateToProps(state) {
// 	console.log(state);
// 	 return {
// 		searchTerm : state.ChangeStep.current
// 	 }
//  }
 
 const mapDispatchToProps = dispatch => {
     return {
		onUpdateSearchTerm : (searchTerm) => dispatch(updateSearchTerm(searchTerm)), 
     }
 }
 
 export default connect(null, mapDispatchToProps)(Header)

