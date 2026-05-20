const TICKETS_KEY = 'zoo_ticket_orders';
const BANNERS_KEY = 'zoo_banners';

const initialBanners = [
  {
    id: 1,
    image: '/hero.png',
    subtitle: 'Khám Phá Thiên Nhiên',
    title: 'Hành Trình Mới',
    description: 'Trải nghiệm vẻ đẹp kỳ diệu của thế giới động vật và chung tay bảo tồn sự sống trên Trái Đất.',
    buttonText: 'Mua Vé Ngay',
    link: '/tickets',
    showDesc: true,
    status: 'Đang hiển thị'
  },
  {
    id: 2,
    image: '/panda.png',
    subtitle: 'Mới Mở Cửa',
    title: 'Gấu Trúc Khổng Lồ',
    description: '',
    buttonText: 'TÌM HIỂU THÊM ▸',
    link: '/tickets',
    showDesc: false,
    status: 'Đang hiển thị'
  }
];

const readList = (key, defaultList = []) => {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    
    if (parsed.length === 0 && defaultList.length > 0) {
      localStorage.setItem(key, JSON.stringify(defaultList));
      return defaultList;
    }
    
    return parsed;
  } catch {
    return defaultList;
  }
};

const writeList = (key, list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

export const getTicketOrders = () => readList(TICKETS_KEY);

export const saveTicketOrder = (order) => {
  const orders = getTicketOrders();
  const nextOrders = [order, ...orders];
  writeList(TICKETS_KEY, nextOrders);
  return nextOrders;
};

export const getBanners = () => readList(BANNERS_KEY, initialBanners);

export const saveBanners = (banners) => {
  writeList(BANNERS_KEY, banners);
};
