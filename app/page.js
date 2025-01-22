'use client';
import TopicSlider from '@/components/TopicSlider';
import { useRouter } from 'next/navigation';
import { topicsData } from '@/data/topicsData';

export default function Home() {
  const router = useRouter();

  const handleTopicSelect = (path) => {
    router.push(path);
  };

  return (
    <div className="banner">
      <link href="https://fonts.cdnfonts.com/css/nasalization" rel="stylesheet" />
      <link href="https://fonts.cdnfonts.com/css/akira-expanded" rel="stylesheet"/>
      <TopicSlider topics={topicsData} onTopicSelect={handleTopicSelect} />
      <div className="content">
        <h1 data-content="FLASH CARDS" style={{ fontFamily: 'Nasalization Rg' }}>FLASH CARDS</h1>
        <div className="author">
          <h2 style={{fontFamily: 'Akira Expanded'}}>Boost Your Memory</h2>
          <p>Select from {topicsData.length} different topics</p>
        </div>
      </div>
    </div>
  );
}
