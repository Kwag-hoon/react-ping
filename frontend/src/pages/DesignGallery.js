import React, { useEffect, useMemo, useState } from "react";
import DesignItem from "./DesignItem";

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

    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/design-${i}/800/1200`,
      ratio: ratios[Math.floor(Math.random() * ratios.length)],
      title: "네비게이션 간격",
      date: "~2026.02.22",
      views: 25,
      likes: 7,
      comments: 2,
    }));
  }, []);
  const visibleItems = isUnder1023 ? items.slice(0, 10) : items;
  return (

    <div className="gallery-masonry">
      {visibleItems.map((item) => (
        <DesignItem key={item.id} item={item} />
      ))}
    </div>

  );
}

export default DesignGallery;