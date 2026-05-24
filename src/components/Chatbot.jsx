import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import { animals } from '../data/animals';
import './Chatbot.css';

const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();

const hasAny = (input, list) => list.some((k) => input.includes(k));

const COMMON_LINKS = {
  tickets: { label: 'Mua vé', to: '/tickets' },
  policies: { label: 'Nội quy', to: '/policies' },
  home: { label: 'Trang chủ', to: '/' }
};

const CONTACT = {
  address: 'Số 1 Cầu Giấy, Giảng Võ, Hà Nội',
  phone: '(028) 3829 1466',
  website: 'hanoizoo.org',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=S%E1%BB%91%201%20C%E1%BA%A7u%20Gi%E1%BA%A5y%2C%20Gi%E1%BA%A3ng%20V%C3%B5%2C%20H%C3%A0%20N%E1%BB%99i'
};

const HOURS_TEXT = [
  '• Thứ 2 - Thứ 6: 08:00 - 17:00',
  '• Thứ 7, CN, Lễ: 07:30 - 18:00',
  '• Mở cửa tất cả các ngày trong năm'
].join('\n');

const TICKET_PRICES_TEXT = [
  '• Vé Người Lớn: 300.000đ (khách trên 1m3)',
  '• Vé Trẻ Em: 150.000đ (1m - 1m3, miễn phí dưới 1m)',
  '• Vé Gia Đình: 750.000đ (2 người lớn & 2 trẻ em)'
].join('\n');

const FAQS = [
  {
    keys: ['doi ngay', 'doi ve', 'doi lich', 'doi ngay tham quan', 'doi ngay di'],
    answer:
      'Vé đã mua không thể hoàn lại, nhưng bạn có thể đổi ngày tham quan 1 lần trước ít nhất 24 giờ so với giờ mở cửa của ngày đã đặt.'
  },
  {
    keys: ['an uong', 'nha hang', 'quan an', 'do an', 'nuoc uong'],
    answer:
      'Sở thú có nhiều nhà hàng và quầy giải khát trải dọc theo các tuyến đường tham quan chính.'
  },
  {
    keys: ['mien phi', 'tre em duoi', 'chieu cao', 'duoi 1m', 'duoi 1 met'],
    answer: 'Trẻ em có chiều cao dưới 1 mét sẽ được miễn vé hoàn toàn khi đi cùng người lớn.'
  }
];

const MENU_CHIPS = ['Giá vé', 'Giờ mở cửa', 'Địa chỉ', 'Nội quy', 'Tìm động vật'];

const YES_WORDS = ['co', 'có', 'duoc', 'được', 'ok', 'va', 'oke', 'yes', 'dùng'];
const NO_WORDS = ['khong', 'không', 'ko', 'kh o', 'nay', 'no'];

const POLICY_QUESTION_REGEX = /(mang (thuc an|do uong|do an|nuoc uong)|cho (dong vat|dong vat|cho an|an dat)|hut thuoc|u?ong (ruou|bia)|tu y|tu y cho|khong duoc|khong nen|co duoc khong|co duoc ko|duoc khong|duoc ko)/;
const ANIMAL_YESNO_REGEX = /(co|có).*(khong|ko)/;
const ANIMAL_STOP_WORDS = ['co', 'có', 'khong', 'không', 'ko', 'o', 'dau', 'la', 'con', 'loai', 've', 'tim', 'xem'];

const findAnimals = (input) => {
  const q = normalize(input);
  if (!q) return [];

  const tokens = q
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !ANIMAL_STOP_WORDS.includes(t));

  const shouldTry = tokens.length >= 1 || /(?:dong vat|loai|con nao|tim|xem|ve.*dong vat|thong tin.*dong vat)/.test(q);

  if (!shouldTry) return [];

  const scored = animals
    .map((a) => {
      const haystack = normalize([
        a.name,
        a.scientificName,
        a.habitat,
        a.diet,
        a.aliases?.join(' '),
        a.keywords?.join(' ')
      ].filter(Boolean).join(' '));

      let score = 0;
      if (haystack === q) score += 15;
      if (normalize(a.id) === q) score += 12;

      const hayWords = new Set(haystack.split(/\s+/));

      for (const t of tokens) {
        if (t.length < 2) continue;
        if (a.aliases?.some((alias) => normalize(alias) === t)) {
          score += 10;
          continue;
        }
        if (normalize(a.id) === t) {
          score += 10;
          continue;
        }
        if (hayWords.has(t)) {
          score += t.length >= 4 ? 5 : 3;
          continue;
        }
        if (t.length >= 4 && haystack.includes(t)) {
          score += 2;
        }
      }

      return { a, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((entry) => entry.a);

  return scored;
};

const buildReply = (inputRaw, lastIntent = '') => {
  const input = normalize(inputRaw);

  if (!input) {
    return {
      intent: 'help',
      text:
        'Bạn muốn mình tư vấn phần nào? Mình có thể hỗ trợ về giá vé, giờ mở cửa, nội quy, địa chỉ/liên hệ, và tra cứu thông tin động vật.',
      chips: MENU_CHIPS,
      links: [COMMON_LINKS.tickets, COMMON_LINKS.policies]
    };
  }

  if (lastIntent === 'askPoliciesDetail' && hasAny(input, YES_WORDS)) {
    return {
      intent: 'policies',
      text: 'Mời bạn mở trang “Chính sách & Nội quy” để xem đầy đủ thông tin.',
      links: [COMMON_LINKS.policies],
      chips: ['Giờ mở cửa', 'Giá vé', 'Địa chỉ']
    };
  }

  if (lastIntent === 'askPoliciesDetail' && hasAny(input, NO_WORDS)) {
    return {
      intent: 'help',
      text: 'Hiểu rồi. Bạn muốn mình hỗ trợ về giá vé, giờ mở cửa hay tìm động vật?',
      chips: MENU_CHIPS,
      links: [COMMON_LINKS.tickets, COMMON_LINKS.policies]
    };
  }

  if (POLICY_QUESTION_REGEX.test(input)) {
    return {
      intent: 'policy',
      text:
        'Hiện tại Sở thú có các quy định sau:\n• Không mang thức ăn vào khu vực tham quan\n• Không tự ý cho động vật ăn\n• Không hút thuốc trong khu vực tham quan\n• Tuân thủ biển báo và hướng dẫn của nhân viên\nNếu bạn cần thông tin cụ thể về nội quy, mình có thể chuyển sang trang “Nội quy”.',
      chips: ['Nội quy', 'Địa chỉ', 'Giờ mở cửa'],
      links: [COMMON_LINKS.policies]
    };
  }

  for (const faq of FAQS) {
    if (hasAny(input, faq.keys)) {
      return {
        intent: 'faq',
        text: faq.answer,
        chips: ['Giá vé', 'Giờ mở cửa', 'Nội quy'],
        links: [COMMON_LINKS.policies, COMMON_LINKS.tickets]
      };
    }
  }

  if (/(lien he|dia chi|o dau|ban do|map|chi duong|duong di|so dien thoai|website|contact|sdt|hotline|so thu|zoo)/.test(input)) {
    return {
      intent: 'contact',
      text: `Thông tin liên hệ:\n• Địa chỉ: ${CONTACT.address}\n• Điện thoại: ${CONTACT.phone}\n• Website: ${CONTACT.website}`,
      externalLinks: [{ label: 'Mở Google Maps', href: CONTACT.mapsUrl }],
      chips: ['Giờ mở cửa', 'Giá vé', 'Nội quy']
    };
  }

  if (/(gio mo cua|mo cua|dong cua|gio hoat dong|opening|thoi gian)(?:.*)/.test(input)) {
    return {
      intent: 'hours',
      text: `Giờ hoạt động:\n${HOURS_TEXT}`,
      chips: ['Giá vé', 'Địa chỉ', 'Nội quy'],
      links: [COMMON_LINKS.policies]
    };
  }

  if (/(mua ve|dat ve|gia ve|ve tham quan|ticket|thanh toan|bang gia|gia ca|gia.*tre em|ve.*tre em|tre em.*gia|tre em.*ve)/.test(input)) {
    return {
      intent: 'pricing',
      text: `Bảng giá tham quan:\n${TICKET_PRICES_TEXT}\n\nTrong đó, vé trẻ em: 150.000đ (1m - 1m3), miễn phí dưới 1m khi đi cùng người lớn).`,
      chips: ['Cách đặt vé', 'Đổi ngày tham quan?', 'Miễn phí trẻ em?'],
      links: [COMMON_LINKS.tickets]
    };
  }

  if (/(cach dat|dat ve the nao|huong dan dat ve|cach mua|huong dan mua ve)/.test(input)) {
    return {
      intent: 'booking',
      text:
        'Cách đặt vé nhanh:\n1) Vào trang “Mua vé”\n2) Chọn ngày tham quan\n3) Chọn số lượng\n4) Nhập họ tên, email, số điện thoại\n5) Bấm “Tiến hành thanh toán” để hoàn tất',
      chips: ['Giá vé', 'Giờ mở cửa', 'Địa chỉ'],
      links: [COMMON_LINKS.tickets]
    };
  }

  if (/(noi quy|chinh sach|quy dinh|policy|cam|luu y|quy tac)/.test(input)) {
    return {
      intent: 'askPoliciesDetail',
      text:
        'Một số nội quy quan trọng:\n• Không chọc phá/ ném đồ vào chuồng trại\n• Không tự ý cho động vật ăn\n• Chụp ảnh an toàn (tránh flash nơi có biển cấm)\n• Giữ gìn vệ sinh, bỏ rác đúng nơi quy định\n\nBạn muốn xem chi tiết đầy đủ không?',
      chips: ['Có', 'Không', 'Giờ mở cửa'],
      links: [COMMON_LINKS.policies]
    };
  }

  const matchedAnimals = findAnimals(inputRaw);
  const animalSignals = /(dong vat|loai|con nao|co nhung con gi|xem dong vat|tim|ve con|ve loai|co|co.*khong|co.*ko)/.test(input);
  const isAnimalYesNo = ANIMAL_YESNO_REGEX.test(input);
  if (isAnimalYesNo) {
    if (matchedAnimals.length === 0) {
      return {
        intent: 'animal_not_found',
        text:
          'Mình chưa tìm thấy loài này trong danh sách hiện tại của Vườn thú. Bạn có thể thử hỏi tên loài khác hoặc tra cứu các loài có sẵn.',
        chips: ['Tìm động vật', 'Nội quy', 'Địa chỉ']
      };
    }
    const animalNames = matchedAnimals.map((a) => a.name).join(', ');
    return {
      intent: 'animal_exists',
      text:
        matchedAnimals.length === 1
          ? `Có, hiện tại Vườn thú có ${animalNames}. Bạn có thể bấm vào để xem hồ sơ chi tiết.`
          : `Có, hiện tại Vườn thú có các loài: ${animalNames}. Bạn có thể bấm vào để xem hồ sơ chi tiết.`,
      links: matchedAnimals.map((a) => ({
        label: `${a.name} (${a.scientificName})`,
        to: `/animals/${a.id}`
      })),
      chips: matchedAnimals.slice(0, 3).map((a) => a.name)
    };
  }

  if (matchedAnimals.length > 0 && (animalSignals || matchedAnimals.length <= 3)) {
    const links = matchedAnimals.map((a) => ({
      label: `${a.name} (${a.scientificName})`,
      to: `/animals/${a.id}`
    }));
    const chips = matchedAnimals.slice(0, 3).map((a) => a.name);
    return {
      intent: 'animal_search',
      text:
        matchedAnimals.length === 1
          ? `Mình tìm thấy 1 kết quả phù hợp. Bạn bấm vào để xem hồ sơ chi tiết nhé.`
          : `Mình tìm thấy ${matchedAnimals.length} loài phù hợp. Bạn bấm vào để xem hồ sơ chi tiết nhé.`,
      links,
      chips: chips.length ? chips : ['Tìm động vật']
    };
  }

  if (/(dang nhap|admin|quan tri)/.test(input)) {
    return {
      intent: 'admin',
      text:
        'Nếu bạn là quản trị viên, hãy dùng trang đăng nhập quản trị. Người dùng thông thường có thể “Đăng nhập” ở thanh điều hướng để trải nghiệm cá nhân hóa.'
    };
  }

  return {
    intent: 'fallback',
    text:
      'Mình chưa hiểu rõ câu hỏi. Bạn muốn hỏi về phần nào dưới đây?',
    chips: MENU_CHIPS,
    links: [COMMON_LINKS.tickets, COMMON_LINKS.policies]
  };
};

const Chatbot = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    {
      from: 'bot',
      intent: 'welcome',
      text:
        'Chào bạn! Mình là trợ lý tư vấn của website Vườn Thú Hà Nội.\nBạn có thể chọn nhanh hoặc gõ câu hỏi theo ý bạn.',
      chips: MENU_CHIPS,
      links: [COMMON_LINKS.tickets, COMMON_LINKS.policies]
    }
  ]);
  const [lastIntent, setLastIntent] = useState('welcome');

  const lastBotMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].from === 'bot') return messages[i];
    }
    return null;
  }, [messages]);

  const listRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, messages.length]);

  const sendMessage = (textToSend) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');

    const reply = buildReply(trimmed, lastIntent);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', ...reply }]);
      setLastIntent(reply.intent || 'help');
    }, 250);
  };

  if (isAdminRoute) return null;

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot-panel glass-panel" role="dialog" aria-label="Chatbot tư vấn">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <span className="chatbot-title-main">Tư vấn nhanh</span>
              <span className="chatbot-title-sub">Vườn Thú Hà Nội</span>
            </div>
            <button className="chatbot-icon-btn" onClick={() => setOpen(false)} aria-label="Đóng">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chatbot-msg ${m.from === 'user' ? 'user' : 'bot'}`}>
                <div className="chatbot-bubble">{m.text}</div>
                {m.from === 'bot' && m.links?.length ? (
                  <div className="chatbot-links">
                    {m.links.map((l) => (
                      <Link key={l.to} to={l.to} className="chatbot-link-btn" onClick={() => setOpen(false)}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
                {m.from === 'bot' && m.externalLinks?.length ? (
                  <div className="chatbot-links">
                    {m.externalLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="chatbot-link-btn"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {lastBotMessage?.chips?.length ? (
            <div className="chatbot-suggestions">
              {lastBotMessage.chips.map((c) => (
                <button
                  key={`s-${c}`}
                  className="chatbot-suggestion-chip"
                  onClick={() => sendMessage(c)}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          ) : null}

          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button className="chatbot-send" onClick={() => sendMessage()} aria-label="Gửi">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        className="chatbot-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng chatbot' : 'Mở chatbot'}
        type="button"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
};

export default Chatbot;
