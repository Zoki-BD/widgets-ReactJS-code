
import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Search from './components/Search';
import Accordion from './components/Accordion';
import SearchAdvanced from './components/SearchAdvanced';
import Dropdown from './components/Dropdown';


const items = [
   {
      title: 'What is React?',
      content: 'React is a front end javascript framework',
   },
   {
      title: 'Why use React?',
      content: 'React is a favorite JS library among engineers',
   },
   {
      title: 'How do you use React?',
      content: 'You use React by creating components',
   },
];


const options = [
   {
      label: 'Color Red',
      value: 'Red',
   },
   {
      label: 'Color Blue',
      value: 'Blue',
   }, {
      label: 'Color Green',
      value: 'Green',
   }
];

function App() {


   const [selected, setSelected] = useState('')
   const [showDropdown, setShowDropdown] = useState(true)


   return (
      <>
         <div className="App">

            <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>

            {/* Ako e true pokazi dropdown-ot, ako ne, nisto da nema. t. e null */}
            {showDropdown ?
               <Dropdown
                  options={options}
                  selected={selected}
                  onSelectedChange={setSelected} />
               : null
            }

         </div>
         <div>
            <Search />
         </div>
         <div>
            <Accordion items={items} />
         </div>
         <div>
            <SearchAdvanced />
         </div>
      </>

   );
}

export default App;
