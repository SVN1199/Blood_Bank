import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black opacity-70 z-[9999] flex justify-center items-center'>
        <div className='border-4 h-10 w-10 border-white border-solid border-t-transparent rounded-full animate-spin'></div>
    
    </div>
    /*<div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>*/



  )
}

export default Spinner