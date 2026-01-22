import React, { useMemo } from "react";
import DesignItem from "./DesignItem";

function DesignGallery(props) {
  const items = useMemo(() => {

    const heights = [240, 320, 420, 520];

    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/design-${i}/800/1200`,
      height: heights[Math.floor(Math.random() * heights.length)],
      title: "네비게이션 간격",
      date: "~2026.02.22",
      views: 25,
      likes: 7,
      comments: 2,
    }));
  }, []);
  return (

    <div className="gallery-masonry">
      {items.map((item) => (
        <DesignItem key={item.id} item={item} />
      ))}
    </div>

  );
}

export default DesignGallery;