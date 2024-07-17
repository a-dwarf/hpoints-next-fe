import { useState } from "react";
import Image from 'next/image'

export default function CustomImage({alt = '', errorImage = '/images/quest/QuestEmpty.png', ...props}) {
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
