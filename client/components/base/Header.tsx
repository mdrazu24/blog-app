import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className="border min-h-50">
        <div className="border min-vh-20  w-100 flex flex-row d-flex align-items-center justify-content-between ">
          <h5  className='px-4'>Micro-BLOG</h5>

          <div className="px-5 hstack gap-4">
            <Link href={"/login"}>
              <button type="button" className="btn  btn-primary">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button type="button" className="btn  btn-outline-primary">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;