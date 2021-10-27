import React, { useState, useEffect } from 'react';
import axios from 'axios';



function SearchAdvanced() {

   const [searchTerm, setSearchTerm] = useState('react');
   const [results, setResults] = useState([]);
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);// se odnesuva na ona sto ke go kucneme, a ne e zavrsen timerot od 3 sekundi.

   useEffect(() => {

      const timerId = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm);
      }, 3000);
      return () => {
         clearTimeout(timerId)
      }
   }, [searchTerm])




   useEffect(() => {
      const search = async () => {
         const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
               action: 'query',
               list: 'search',
               origin: '*',
               format: 'json',
               srsearch: debouncedSearchTerm,
            }
         });
         setResults(response.data.query.search)
      };
      search();
   }, [debouncedSearchTerm])






   return (
      <div>
         <div className="ui form">
            <div className="field">
               <label> Enter search term </label>
               <input
                  type="text"
                  className="input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />



            </div>
         </div>
         <div className="ui celled list">
            {
               results.map(result => {
                  return (
                     <div className="item">
                        <div className="right floated content">
                           <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
                        </div>
                        <div className="content">
                           <div className="header">
                              <h3 key={result.pageid}>{result.title}</h3>
                           </div>

                           {/* Finta skriena JSX function koga imame nekakva data od api ama ni ja dava kako html, so tagovi vnatre. Preku ova danger... ja cita kako tekst pravilen */}
                           <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                           {/* {result.snippet} */}
                        </div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}
export default SearchAdvanced
