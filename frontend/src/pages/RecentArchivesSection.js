import React, { useMemo } from "react";
import DesignItem from "./DesignItem";

function RecentArchivesSection() {
  const items = useMemo(() => {

    const heights = [240, 320, 420, 520];

    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      url: `https://picsum.photos/seed/${i}/800/1200`,
      height: heights[Math.floor(Math.random() * heights.length)],
      title: "네비게이션 간격",
      date: "~2026.02.22",
      views: 21,
      likes: 7,
      comments: 2,
    }));
  }, []);

  return (
    <section className="main_recent-archives container">
      <h2>최근 아카이브</h2>
      <p>최근 올라온 다양한 디자인을 확인해 보세요</p>

      <div className="gallery-masonry">
        {items.map((item) => (
          <DesignItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default RecentArchivesSection;
