import React, { useEffect, useMemo, useState } from "react";
import DesignItem from "./DesignItem";
import testItems from "../test/archive.json" //test 이미지카드

function DesignGallery(props) {
  const [isUnder1023, setIsUnder1023] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1023 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsUnder1023(window.innerWidth <= 1023);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = useMemo(() => {
    const ratios = ["4/5", "1/1", "3/4", "9/16"];


    return [...testItems]
      .sort(
        (a, b) =>
          new Date(b.create_datetime) - new Date(a.create_datetime)
      )

      .map((item) => ({
        id: item.id,
        image: item.image_path,
        ratio: ratios[Math.floor(Math.random() * ratios.length)],
        title: item.post_title,
        date: item.create_datetime,
        views: 25,
        likes: 7,
        comments: 2,
      }));
  }, []);
  const visibleItems = isUnder1023 ? items.slice(0, 10) : items;
  return (

    <div className="gallery-masonry">
      {visibleItems.map((item) => (
        <DesignItem
          key={item.id}
          item={item}
        />
      ))}
    </div>

  );
}

export default DesignGallery;