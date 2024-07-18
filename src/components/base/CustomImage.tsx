import { useState } from "react";
import Image, { ImageProps } from 'next/image'

export default function CustomImage({alt = '', errorImage = '/images/quest/QuestEmpty.png', ...props}: ImageProps & {errorImage: string}) {
  const [src, setSrc] = useState(props.src);
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setSrc(errorImage)}
      placeholder="blur"
      blurDataURL="/images/quest/QuestEmpty.png"
    />
  );
}
