import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import './Chatbot.css';

const normalize = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const buildReply = (inputRaw) => {
  const input = normalize(inputRaw);

  const commonLinks = {
    tickets: { label: 'Mua vé', to: '/tickets' },
    policies: { label: 'Nội quy', to: '/policies' },
    home: { label: 'Trang chủ', to: '/' }
  };

  if (!input) {
    return {
      text:
        'Bạn có thể hỏi mình về: mua vé, giờ mở cửa, nội quy, thông tin liên hệ, hoặc tìm kiếm động vật.',
      links: [commonLinks.tickets, commonLinks.policies]
    };
  }

  if (/(mua ve|dat ve|gia ve|ve tham quan|ticket|thanh toan)/.test(input)) {
    return {
      text:
        'Bạn có thể đặt vé tại trang “Mua vé”. Ở đó có chọn ngày tham quan, số lượng và thông tin khách.',
      links: [commonLinks.tickets]
    };
  }

  if (/(gio mo cua|mo cua|dong cua|gio hoat dong|opening)/.test(input)) {
    return {
      text:
        'Giờ mở cửa tham khảo: 9:00 – 18:00 (có thể thay đổi theo mùa/sự kiện). Bạn muốn mình hướng dẫn xem mục “Mua vé” để lên kế hoạch không?',
      links: [commonLinks.tickets]
    };
  }

  if (/(noi quy|chinh sach|quy dinh|policy)/.test(input)) {
    return {
      text:
        'Bạn có thể xem “Chính sách & Nội quy” để biết các quy định tham quan, an toàn và bảo tồn.',
      links: [commonLinks.policies]
    };
  }

  if (/(lien he|dia chi|so dien thoai|email|website|contact)/.test(input)) {
    return {
      text:
        'Thông tin liên hệ: Số 1 Cầu Giấy, Giảng Võ, Hà Nội • (028) 3829 1466 • hanoizoo.org.',
      links: [commonLinks.home]
    };
  }

  if (/(dong vat|thu|animal|co nhung con gi|xem gi)/.test(input)) {
    return {
      text:
        'Trang chủ có danh sách các “Gương Mặt Tiêu Biểu”. Bạn có thể bấm vào từng thẻ để xem chi tiết từng loài.',
      links: [commonLinks.home]
    };
  }

  if (/(dang nhap|admin|quan tri)/.test(input)) {
    return {
      text:
        'Nếu bạn là quản trị viên, hãy dùng trang đăng nhập quản trị. Người dùng thông thường có thể “Đăng nhập” ở thanh điều hướng để trải nghiệm cá nhân hóa.'
    };
  }

  return {
    text:
      'Mình có thể tư vấn nhanh về: mua vé, giờ mở cửa, nội quy, thông tin liên hệ, và hướng dẫn tìm xem động vật. Bạn đang muốn tìm phần nào?'
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
      text:
        'Chào bạn! Mình là trợ lý tư vấn của website Vườn Thú Hà Nội. Bạn muốn mình hỗ trợ về mua vé, nội quy hay thông tin liên hệ?',
      links: [
        { label: 'Mua vé', to: '/tickets' },
        { label: 'Nội quy', to: '/policies' }
      ]
    }
  ]);

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

    const reply = buildReply(trimmed);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', ...reply }]);
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
              </div>
            ))}
          </div>

          {lastBotMessage?.links?.length ? (
            <div className="chatbot-suggestions">
              {lastBotMessage.links.map((l) => (
                <button
                  key={`s-${l.to}`}
                  className="chatbot-suggestion-chip"
                  onClick={() => sendMessage(l.label)}
                  type="button"
                >
                  {l.label}
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

