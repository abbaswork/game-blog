
import Image from 'next/image';
import './blog-card.scss'

export const BlogCard = () => {
  return (
    <div className='blog-card'>
      <Image
        // properties set to adjust to container for dynamic image
        src={"https://cdn2.whatoplay.com/news/an-everyday-story-demo.webp"}
        alt="example image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }} // optional
      />
      <div className='card-bottom'>
        <h3>Blog Title</h3>
        <p>Blog Description</p>
      </div>
    </div>
  )
}