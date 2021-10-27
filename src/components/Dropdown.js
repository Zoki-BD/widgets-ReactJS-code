import React, { useState, useEffect, useRef } from 'react'



function Dropdown({ options, selected, onSelectedChange }) {

   const [open, setOpen] = useState(false)




   const refForClosingOptionAfterClicked = useRef();




   //SO useEffectot pravime da moze na klik nekade na body page-ot plus da se zatvori dropdown-ot.
   useEffect(() => {
      const onBodyClick = document.body.addEventListener('click', (e) => {
         if (refForClosingOptionAfterClicked.current && refForClosingOptionAfterClicked.current.contains(e.target)) {
            return;
         }
         setOpen(false)
      }, { capture: true })//ova capture true e za react verzijata v17 ako koristime. Inaku nema nisto 

      //when no dropdown to remove addEventListenerot from body
      return () => {
         document.body.removeEventListener('click', onBodyClick)
      }
   }, [])


   const mappedOptions = options.map((option, index) => {


      if (option.value === selected.value) {
         return null;//null  means Dont render anything
      }

      return (
         <div style={{ background: 'lightgrey' }}
            key={index}
            className='item'
            onClick={() => onSelectedChange(option)
            }>
            {option.label}
         </div >
      )
   });

   return (
      <div className='ui form' ref={refForClosingOptionAfterClicked}>
         <div className="field" >
            <label className='label' >Select a color</label>
            <div
               className={`ui selection dropdown ${open ? 'visible active' : ''} `}
               onClick={() => setOpen(!open)}>
               <i className="dropdown icon"></i>
               <div className="text">{selected.label}</div>
               <div className={`menu ${open ? 'visible transition' : ''} `}
               >
                  {mappedOptions}
               </div>

            </div>
         </div>

      </div >
   )
}

export default Dropdown
