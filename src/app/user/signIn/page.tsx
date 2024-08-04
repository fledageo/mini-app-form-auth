import React from 'react'
import "./style.css"
export default function Page() {
  return (
    <>
      <div className="box container">
        <div className="box form-wrapper">
          <form>
            <div className="fields-wrapper">
              <input
                type="text"
                className='input is-info mb-5'
                placeholder='Email' 
                name='email'
              />
              <input
                type="text"
                className='input is-info mb-5'
                placeholder='Password' 
                name='password'
              />
              <button className='button is-info is-outlined is-rounded'>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
