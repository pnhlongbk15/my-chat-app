import React from 'react'
import styled from 'styled-components'

export default function Search({ handleSearch, useRef }) {
   
   return (
      <Form onSubmit={handleSearch}>
         <input ref={useRef}/>
         <button>Search</button>
      </Form>
   )
}

const Form = styled.form`
   display: flex;
   width: 100%;
   gap: 0.4rem;
   padding: 0 0.8rem;
   input {
      flex: 1;
      outline: none;
      font-size: 1rem;
   }
   button {
      padding: 0.2rem 0.4rem;
   }
`