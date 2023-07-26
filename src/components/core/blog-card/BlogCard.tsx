
import Image from 'next/image';
import './blog-card.scss';
import Link from 'next/link';

interface Props {
  src: string;
  alt: string;
  title: string;
  href: string;
  description?: string;
  postCard?: true;
}

export const BlogCard = ({ src, alt, title, href, description, postCard = true }: Props) => {

  //if the image or title is undefined, don't render component
  if (src === "" || title === "")
    return <></>;

  const blogDescription = () => {
    if(postCard && description){
      var splitPostIntro = description.split("Introduction");
      var tags = splitPostIntro[0].replace("Metrics", "");
      var intro = splitPostIntro[1].replace("[…]","...");
      return(<><p>{tags}</p><br/><p>{intro}</p></>);
    } else {
      return <p>{description}</p>;
    }
  }

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
          {blogDescription()}
        </div>
      </Link>
    </div>
  )
}