import React, { useEffect, useMemo, useState } from "react";
import DesignItem from "./DesignItem";

function DesignGallery(props) {
  const [items, setItems] = useState([]);
  const [isUnder1023, setIsUnder1023] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1023 : false
  );

  /* 화면 리사이즈 감지 */
  useEffect(() => {
    const handleResize = () => {
      setIsUnder1023(window.innerWidth <= 1023);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 게시물 로딩 */
  useEffect(() => {
    fetch("http://localhost:9070/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("갤러리 로딩 실패:", err));
  }, []);

   /* 화면에 뿌릴 데이터 가공 + 중복 제거 */
  const displayItems = useMemo(() => {
    const map = new Map();
    const ratios = ["4/5", "1/1", "3/4", "9/16"];

    items.forEach(item => {
      if (map.has(item.id)) return;

      map.set(item.id, {
        id: item.id,
        title: item.title,
        image: `http://localhost:9070${item.imagePath}`,
        date: item.createdAt,
        ratio: ratios[Math.floor(Math.random() * ratios.length)], 
        views: item.view_count ?? 0,
        likes: item.like_count ?? 0,
        comments: item.pins ?? 0,
      });
    });

    const result = Array.from(map.values());

    return isUnder1023 ? result.slice(0, 10) : result;
  }, [items, isUnder1023]);


  return (

    <div className="gallery-masonry">
      {displayItems.map((item) => (
        <DesignItem key={item.id} item={item} />
      ))}
    </div>

  );
}

export default DesignGallery;