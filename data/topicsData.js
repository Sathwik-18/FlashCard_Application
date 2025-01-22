export const topicsData = [
    { 
      id: 1, 
      title: "Mathematics", 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmFhpXFLDXLV0OJIzIOqGvqaEixZhIsV5-sA&s', 
      path: "/cards/math",
      cardCount: 25,
      description: "Test your mathematical skills"
    },
    { 
      id: 2, 
      title: "Science", 
      image: 'data:image/png;base64,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', 
      path: "/cards/science",
      cardCount: 30,
      description: "Explore scientific concepts"
    },
    { 
      id: 3, 
      title: "History", 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXucucHL7VKxKVYqGfI0BG7HPu6No6M9lWkA&s', 
      path: "/cards/history",
      cardCount: 20,
      description: "Journey through time"
    },
    { 
      id: 4, 
      title: "Geography", 
      image: 'https://images.unsplash.com/photo-1708090526148-93837585ce9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw0MDE5MjV8fGVufDB8fHx8fA%3D%3D', 
      path: "/cards/geography",
      cardCount: 22,
      description: "Explore the world"
    },
    { 
      id: 5, 
      title: "Voabulary", 
      image: 'https://media.istockphoto.com/id/1351397925/photo/open-book-and-magnifying-glass-on-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ta1o-5pT5WWW1LKGPnn-BDke1hySnbwU6VdPLnP-GDk=', 
      path: "/cards/vocabulary",
      cardCount: 28,
      description: "Discover great works"
    },
    { 
      id: 6, 
      title: "Computer Science", 
      image: 'https://images.unsplash.com/photo-1718147549470-eaab766d2c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzh8NDAxOTI1fHxlbnwwfHx8fHw%3D',
      path: "/cards/cs",
      cardCount: 35,
      description: "Learn programming concepts"
    },
    { 
      id: 7, 
      title: "Art", 
      image: 'https://media.istockphoto.com/id/180845992/photo/poppy-modern-art-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=hQSv-mjFMDcaZ711W3B3s_a5aDxNK_SNIXj2Dcmy9Ec=', 
      path: "/cards/art",
      cardCount: 18,
      description: "Explore artistic knowledge"
    },
    { 
      id: 8, 
      title: "Music", 
      image: 'https://images.unsplash.com/photo-1470019693664-1d202d2c0907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww',   
      path: "/cards/music",
      cardCount: 15,
      description: "Test your musical knowledge"
    }
  ];