import React, { useEffect, useMemo, useState } from "react";
import DesignItem from "./DesignItem";
import { useNavigate } from "react-router-dom";

function DesignGallery(props) {
  const [items, setItems] = useState([]);
  const [isUnder1023, setIsUnder1023] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1023 : false
  );
  const navigate = useNavigate();

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

  // const items = useMemo(() => {
  //   const ratios = ["4/5", "1/1", "3/4", "9/16"];

  //   return [...testItems]
  //     .sort(
  //       (a, b) =>
  //         new Date(b.create_datetime) - new Date(a.create_datetime)
  //     )

  //     .map((item) => ({
  //       id: item.id,
  //       image: item.image_path,
  //       ratio: ratios[Math.floor(Math.random() * ratios.length)],
  //       title: item.post_title,
  //       date: item.create_datetime,
  //       views: 25,
  //       likes: 7,
  //       comments: 2,
  //     }));
  // }, []);
  // const visibleItems = isUnder1023 ? items.slice(0, 10) : items;
  /* 화면에 뿌릴 데이터 가공 */
  const displayItems = useMemo(() => {
    const ratios = ["4/5", "1/1", "3/4", "9/16"];

    const mapped = items.map((item) => ({
      id: item.id,
      title: item.title,
      image: `http://localhost:9070${item.imagePath}`,
      ratio: ratios[Math.floor(Math.random() * ratios.length)],
      date: item.createdAt,
      views: item.view_count ?? 0,
      likes: item.like_count ?? 0,
      comments: item.pins ?? 0,
    }));

    return isUnder1023 ? mapped.slice(0, 10) : mapped;
  }, [items, isUnder1023]);

  return (

    <div className="gallery-masonry">
      {/* {displayItems.map(item => (
        <Link to={`/detail/${item.id}`} key={item.id}>
          <DesignItem
            item={{
              title: item.title,
              image: `http://localhost:9070${item.imagePath}`,
              date: item.createdAt,
              pins: item.pins
            }}
          />
        </Link>
      ))} */}
      {displayItems.map((item) => (
        <div
          key={item.id}
          className="design-item-wrapper"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <DesignItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default DesignGallery;