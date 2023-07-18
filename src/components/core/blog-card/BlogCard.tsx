
import Image from 'next/image';
import './blog-card.scss';
import Link from 'next/link';

interface Props {
  src: string;
  alt: string;
  title: string;
  href: string;
  description?: string;
}

export const BlogCard = ({ src, alt, title, href, description }: Props) => {

  //if the image or title is undefined, don't render component
  if (src === "" || title === "")
    return <></>;

  return (
    <div className='blog-card'>
      <Link href={href}>
        <Image
          // properties set to adjust to container for dynamic image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
        />
        <div className='card-bottom'>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  )
}