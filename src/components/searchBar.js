import React from 'react'



export default function SearchBar(props) {
  return (
    <div className="carousel-caption justify-content-center" style={{ zIndex: '2', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'absolute', top: '2%', left: '50%', transform: 'translateX(-50%)' }}>
      
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Enter Your Cravings" aria-label="Search" value={props.search} onChange={(e)=> (props.setSearch(e.target.value)) } style={{ lineHeight: '2.5', backgroundColor: 'white'}} />
        
      </form>
    </div>
  )
}