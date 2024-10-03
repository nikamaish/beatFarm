import React from 'react'
import NewsletterSignup from './NewsletterSignup'
import FeaturedPlaylist from './FeaturedPlaylist'
import Filters from './Filters'

const Sidebar = () => {
  return (
    <div>
      <div className='flex-row'>
      <FeaturedPlaylist />
      <Filters />
      <NewsletterSignup   />
      </div>
    </div>
  )
}

export default Sidebar
