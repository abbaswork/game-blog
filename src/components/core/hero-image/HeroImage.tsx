import Image from 'next/image';

export const HeroImage = () => {
  return (
    <Image
      // properties set to adjust to container for dynamic image
      src={"https://cdn2.whatoplay.com/news/an-everyday-story-demo.webp"}
      alt="example image"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }} // optional
    />
  )
}