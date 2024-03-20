
import Image from 'next/image';
import './blog-card.scss';
import Link from 'next/link';

export interface BlogCardProps {
  src: string;
  alt: string;
  title: string;
  href: string;
  description?: string;
  postCard?: true;
}

export const BlogCard = ({ src, alt, title, href, description, postCard = true }: BlogCardProps) => {

  //if the image or title is undefined, don't render component
  if (src === "" || title === "")
    return <></>;

  //format description if keywords are there
  const blogDescription = () => {

    //if there is an introduction section, use it as the title and format, otherwise return the description
    if (!postCard || !description?.includes("Introduction"))
      return <p>{description || ""}</p>

    var splitPostIntro = description.split("Introduction");
    var tags = splitPostIntro[0].replace("Metrics", "");
    var intro = splitPostIntro[1].replace("[…]", "...");
    return (<><p>{tags}</p><br /><p>{intro}</p></>);


  }

  return (
    <div className='blog-card'>
      <Link href={href}>
        {/* <Image
          // properties set to adjust to container for dynamic image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
          priority={true}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0FQyoBwACMAEXcLbIuAAAAABJRU5ErkJggg=='
        /> */}
        <Image
          // other properties (src, alt, priority, etc.)
          width={1}
          height={1}
          layout="responsive"
          placeholder="blur"
          sizes="100vw"
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0FQyoBwACMAEXcLbIuAAAAABJRU5ErkJggg=='
          src={src}
          alt={alt}
          priority={true}
          />
        <div className='card-bottom'>
          <h3>{title}</h3>
          {blogDescription()}
        </div>
      </Link>
    </div>
  )
}