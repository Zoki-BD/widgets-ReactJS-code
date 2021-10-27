import React, { useState, useEffect } from 'react';
import axios from 'axios';


//https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=programming




function Search() {

   const [searchTerm, setSearchTerm] = useState('');
   const [results, setResults] = useState([])


   console.log(results)

   //Nadvor kreiran metodot za search- prebaruvanje
   const search = async () => {
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
         params: {
            action: 'query',
            list: 'search',
            origin: '*',
            format: 'json',
            srsearch: searchTerm,
         }
      });
      setResults(response.data.query.search)
   }



   useEffect(() => {

      // const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${searchTerm}`)


      //Da na prvo loadiranje na cekame 3 sekundi posto ke nema neli length se uste results, posto e prvo searchuvanje kade imame samo searcHterm.

      if (searchTerm && !results.length) {
         search()
      }
      else {
         //Mora cela operacija da bide vo setTimeout
         const waiting = setTimeout(() => {


            if (searchTerm) {
               search()
            }
            else {
               setResults([])
            }
         }, 3000);

         return () => {
            console.log('cleaned')
            clearTimeout(waiting)
         }
      }
   }, [searchTerm, results.length])




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

export default Search
