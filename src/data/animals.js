export const animals = [
  {
    id: 'lion',
    name: 'Sư Tử Châu Phi',
    scientificName: 'Panthera leo',
    image: '/lion.png',
    habitat: 'Thảo nguyên và đồng cỏ châu Phi',
    diet: 'Thịt, chủ yếu là linh dương và ngựa vằn',
    conservation: 'Sắp nguy cấp',
    description: 'Chúa tể thảo nguyên với tiếng gầm vang dội có thể nghe thấy từ cách xa 8km.',
    details: 'Sư tử sống theo bầy đàn, trong đó các con cái thường phối hợp săn mồi và chăm sóc con non. Bờm của sư tử đực giúp chúng trông uy nghi hơn và cũng là dấu hiệu về sức khỏe, tuổi tác. Đây là loài biểu tượng cho sức mạnh của hệ sinh thái đồng cỏ.'
  },
  {
    id: 'elephant',
    name: 'Voi Châu Phi',
    scientificName: 'Loxodonta africana',
    image: '/elephant.png',
    habitat: 'Rừng thưa, savanna và vùng đất ngập nước',
    diet: 'Cỏ, lá cây, vỏ cây, trái cây',
    conservation: 'Nguy cấp',
    description: 'Loài động vật trên cạn lớn nhất thế giới, nổi tiếng với trí thông minh và trí nhớ tuyệt vời.',
    details: 'Voi có cấu trúc xã hội rất gắn bó, thường đi theo đàn do voi cái lớn tuổi dẫn dắt. Chúng giao tiếp bằng âm thanh tần số thấp, dùng vòi để uống nước, hái thức ăn, chạm và chăm sóc nhau. Voi đóng vai trò quan trọng trong việc phát tán hạt giống và mở đường trong rừng.'
  },
  {
    id: 'flamingo',
    name: 'Hồng Hạc',
    scientificName: 'Phoenicopterus',
    image: '/flamingo.png',
    habitat: 'Đầm lầy, hồ mặn và vùng nước nông',
    diet: 'Tảo, giáp xác nhỏ, sinh vật phù du',
    conservation: 'Ít quan ngại',
    description: 'Nổi bật với bộ lông màu hồng rực rỡ và tập tính đứng một chân vô cùng độc đáo.',
    details: 'Màu hồng của hồng hạc đến từ sắc tố carotenoid trong thức ăn. Chiếc mỏ cong đặc biệt giúp chúng lọc thức ăn trong nước. Hồng hạc thường sống thành đàn lớn, tạo nên cảnh tượng rất ấn tượng tại các vùng hồ nông.'
  },
  {
    id: 'giraffe',
    name: 'Hươu Cao Cổ',
    scientificName: 'Giraffa camelopardalis',
    image: '/animals/giraffe.png',
    habitat: 'Savanna và rừng thưa châu Phi',
    diet: 'Lá cây, chồi non, đặc biệt là cây keo',
    conservation: 'Dễ tổn thương',
    description: 'Loài thú cao nhất thế giới với chiếc cổ dài giúp vươn tới những tán lá cao.',
    details: 'Hươu cao cổ có hoa văn đốm riêng biệt như dấu vân tay. Chiếc cổ dài giúp chúng tiếp cận nguồn thức ăn mà nhiều loài khác không với tới. Khi cần tự vệ, cú đá của hươu cao cổ rất mạnh và có thể khiến kẻ săn mồi phải dè chừng.'
  },
  {
    id: 'tiger',
    name: 'Hổ Bengal',
    scientificName: 'Panthera tigris tigris',
    image: '/animals/tiger.png',
    habitat: 'Rừng nhiệt đới, rừng ngập mặn và đồng cỏ',
    diet: 'Thịt, thường là hươu, nai, lợn rừng',
    conservation: 'Nguy cấp',
    description: 'Mèo lớn mạnh mẽ với bộ lông vằn cam đen giúp ngụy trang trong rừng rậm.',
    details: 'Hổ thường sống đơn độc và đánh dấu lãnh thổ bằng mùi. Mỗi cá thể có vằn lông độc nhất. Hổ là tay bơi rất giỏi, có thể băng qua sông suối để săn mồi hoặc mở rộng vùng sống.'
  },
  {
    id: 'zebra',
    name: 'Ngựa Vằn',
    scientificName: 'Equus quagga',
    image: '/animals/zebra.png',
    habitat: 'Đồng cỏ và thảo nguyên châu Phi',
    diet: 'Cỏ và thực vật thân mềm',
    conservation: 'Ít quan ngại',
    description: 'Những sọc đen trắng độc đáo giúp ngựa vằn nhận diện nhau và gây rối mắt kẻ săn mồi.',
    details: 'Ngựa vằn sống theo đàn, thường di chuyển cùng linh dương đầu bò trong các cuộc di cư lớn. Sọc trên cơ thể mỗi con là duy nhất. Khi bị đe dọa, chúng có thể chạy nhanh và đá mạnh để tự vệ.'
  },
  {
    id: 'red-panda',
    name: 'Gấu Trúc Đỏ',
    scientificName: 'Ailurus fulgens',
    image: '/animals/red-panda.png',
    habitat: 'Rừng núi ôn đới Himalaya',
    diet: 'Tre, quả mọng, trứng và côn trùng nhỏ',
    conservation: 'Nguy cấp',
    description: 'Loài thú nhỏ đáng yêu với chiếc đuôi dài rậm giúp giữ thăng bằng trên cây.',
    details: 'Gấu trúc đỏ hoạt động nhiều vào sáng sớm và chiều tối. Chúng leo trèo khéo léo, dùng đuôi để giữ ấm và cân bằng. Dù tên gọi có chữ gấu trúc, chúng thuộc một họ riêng biệt.'
  },
  {
    id: 'penguin',
    name: 'Chim Cánh Cụt',
    scientificName: 'Spheniscidae',
    image: '/animals/penguin.png',
    habitat: 'Vùng biển lạnh và bờ đá Nam bán cầu',
    diet: 'Cá nhỏ, mực, nhuyễn thể',
    conservation: 'Tùy loài',
    description: 'Loài chim không bay nhưng bơi lội cực giỏi với thân hình thuôn để lướt dưới nước.',
    details: 'Chim cánh cụt dùng đôi cánh như mái chèo khi bơi. Bộ lông hai màu giúp chúng ngụy trang dưới biển: lưng tối hòa vào đáy nước, bụng sáng hòa với mặt nước phía trên. Nhiều loài có tập tính chăm con rất nổi bật.'
  },
  {
    id: 'rhino',
    name: 'Tê Giác Trắng',
    scientificName: 'Ceratotherium simum',
    image: '/animals/rhino.png',
    habitat: 'Đồng cỏ và savanna châu Phi',
    diet: 'Cỏ thấp',
    conservation: 'Gần bị đe dọa',
    description: 'Loài thú lớn có da dày và sừng đặc trưng, thường gặm cỏ trên các đồng bằng rộng.',
    details: 'Tê giác trắng có môi rộng, thích nghi với việc gặm cỏ sát mặt đất. Dù thân hình đồ sộ, chúng có thể chạy nhanh trong thời gian ngắn. Công tác bảo tồn tê giác rất quan trọng vì nạn săn trộm lấy sừng.'
  },
  {
    id: 'koala',
    name: 'Gấu Túi Koala',
    scientificName: 'Phascolarctos cinereus',
    image: '/animals/koala.png',
    habitat: 'Rừng bạch đàn Australia',
    diet: 'Lá bạch đàn',
    conservation: 'Dễ tổn thương',
    description: 'Loài thú có túi hiền lành, dành phần lớn thời gian ngủ và ăn lá bạch đàn.',
    details: 'Koala có hệ tiêu hóa chuyên biệt để xử lý lá bạch đàn vốn ít năng lượng và có độc nhẹ. Chúng ngủ rất nhiều để tiết kiệm năng lượng. Mất rừng và biến đổi khí hậu đang gây áp lực lớn lên nơi sống của koala.'
  },
  {
    id: 'lemur',
    name: 'Vượn Cáo Đuôi Khoang',
    scientificName: 'Lemur catta',
    image: '/animals/lemur.png',
    habitat: 'Rừng khô và bụi cây Madagascar',
    diet: 'Trái cây, lá, hoa và côn trùng',
    conservation: 'Nguy cấp',
    description: 'Linh trưởng Madagascar nổi bật với chiếc đuôi khoang đen trắng và tập tính xã hội sinh động.',
    details: 'Vượn cáo đuôi khoang thường sống theo nhóm do con cái giữ vai trò dẫn dắt. Chúng dùng mùi hương, tiếng kêu và tư thế cơ thể để giao tiếp. Madagascar là quê hương duy nhất của các loài vượn cáo ngoài tự nhiên.'
  },
  {
    id: 'gorilla',
    name: 'Khỉ Đột Lưng Bạc',
    scientificName: 'Gorilla beringei',
    image: '/animals/gorilla.png',
    habitat: 'Rừng nhiệt đới rậm rạp sương mù',
    diet: 'Lá cây, chồi non, trái cây và côn trùng nhỏ',
    conservation: 'Cực kỳ nguy cấp',
    description: 'Linh trưởng lớn nhất thế giới với sức mạnh phi thường nhưng có bản tính rất ôn hòa.',
    details: 'Khỉ đột sống theo gia đình dưới sự lãnh đạo của một con đực "lưng bạc" (silverback). Dù có ngoại hình đồ sộ đáng sợ, chúng chủ yếu ăn chay và rất hiền lành trừ khi bị đe dọa. Sự gắn kết xã hội của chúng rất giống với con người.'
  }
];
