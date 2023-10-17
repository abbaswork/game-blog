import Image from 'next/image';

interface Props {
  src: string;
  alt?: string;
  priority?: boolean;
}

export const HeroImage = ({src, alt = "", priority = false}: Props) => {
  return (
    <Image
      // properties set to adjust to container for dynamic image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }} // optional
      priority={priority}
    />
  )
}