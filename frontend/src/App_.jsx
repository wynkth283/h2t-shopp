import { useEffect, useState } from 'react'
import './App.css'

const navLinks = [
  { label: 'Trang chủ', href: '#homepage' },
  { label: 'Sản phẩm', href: '#collection', type: 'mega' },
  { label: 'Sale', href: '#flash-sale' },
  { label: 'Blog', href: '#static-pages' },
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Liên hệ', href: '#contact' },
]

const megaMenuColumns = [
  {
    title: 'Bộ sưu tập',
    items: ['Minimal Luxe', 'Essential Line', 'Limited Capsule', 'New Season'],
  },
  {
    title: 'Danh mục',
    items: ['Áo', 'Đầm', 'Quần', 'Outerwear', 'Phụ kiện'],
  },
  {
    title: 'Chất liệu nổi bật',
    items: ['Lụa Ý', 'Cotton Organic', 'Cashmere Blend', 'Linen Premium'],
  },
  {
    title: 'Lookbook gợi ý',
    items: ['Công sở', 'Dạo phố', 'Sự kiện', 'Du lịch'],
  },
]

const categories = [
  { title: 'Bộ sưu tập mới', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80' },
  { title: 'Thời trang công sở', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80' },
  { title: 'Phong cách tối giản', image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80' },
  { title: 'Phụ kiện sang trọng', image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80' },
  { title: 'Limited Capsule', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Nhẫn & trang sức', image: 'https://images.unsplash.com/photo-1433622070098-754fdf81c929?auto=format&fit=crop&w=800&q=80' },
]

const bestSellers = [
  { name: 'Blazer Lụa Tối Giản', price: '3.290.000', badge: 'Best seller', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Đầm Satin Cổ Yếm', price: '2.590.000', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80' },
  { name: 'Set Công Sở Monochrome', price: '4.150.000', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80' },
  { name: 'Áo Len Cashmere', price: '2.190.000', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80' },
]

const newArrivals = [
  { name: 'Midi Dress High Neck', price: '3.450.000', tag: 'New', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80' },
  { name: 'Áo Khoác Cashmere', price: '5.990.000', tag: 'Limited', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80' },
  { name: 'Túi Envelope Mini', price: '2.250.000', tag: 'New', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Giày Mule Leather', price: '3.290.000', tag: 'Exclusive', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80' },
]

const flashSaleProducts = [
  { name: 'Đầm Lụa Draped', price: '2.190.000', compareAt: '3.090.000', discount: 30, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Áo Khoác Tweed', price: '3.450.000', compareAt: '4.890.000', discount: 25, image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80' },
  { name: 'Túi Top Handle', price: '2.750.000', compareAt: '3.890.000', discount: 29, image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=900&q=80' },
]

const partnerBrands = ['Luna Atelier', 'Maison V', 'Atelier 9', 'Verde Milano', 'Yūna Studio', 'Studio Noir']

const filterGroups = [
  { title: 'Khoảng giá', options: ['Dưới 1.000.000', '1.000.000 - 3.000.000', '3.000.000 - 5.000.000', 'Trên 5.000.000'] },
  { title: 'Kích cỡ', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { title: 'Màu sắc', options: ['Trắng', 'Đen', 'Be', 'Vàng gold', 'Xanh ngọc'] },
  { title: 'Chất liệu', options: ['Lụa', 'Lanh', 'Cashmere', 'Cotton hữu cơ'] },
  { title: 'Thương hiệu', options: ['Luna Atelier', 'Verde', 'Studio Noir'] },
  { title: 'Sắp xếp', options: ['Mới nhất', 'Bán chạy', 'Giá tăng dần', 'Giá giảm dần'] },
]

const pdpFeatures = [
  { label: 'Mã sản phẩm', value: 'LA-SS25-008' },
  { label: 'Chất liệu', value: 'Lụa satin cao cấp 22 momme' },
  { label: 'Xuất xứ', value: 'Gia công tại Việt Nam - tiêu chuẩn Ý' },
]

const staticPages = [
  { id: 'about', title: 'Giới thiệu', description: 'Câu chuyện thương hiệu, triết lý thiết kế và hành trình phát triển.' },
  { id: 'return', title: 'Chính sách đổi trả', description: 'Đổi trả trong 14 ngày với điều kiện sản phẩm còn nguyên tem mác.' },
  { id: 'privacy', title: 'Chính sách bảo mật', description: 'Bảo mật tuyệt đối thông tin cá nhân và thanh toán của khách hàng.' },
  { id: 'guide', title: 'Hướng dẫn mua hàng', description: 'Các bước đặt hàng, lựa chọn size và phương thức thanh toán.' },
  { id: 'contact', title: 'Liên hệ', description: 'Kết nối nhanh qua hotline, email hoặc ghé showroom trải nghiệm.' },
]

const accountMenu = [
  'Đơn hàng của tôi',
  'Địa chỉ',
  'Thông tin cá nhân',
  'Đổi mật khẩu',
  'Danh sách yêu thích',
  'Đăng xuất',
]

const recentOrders = [
  { code: '#OD12345', date: '25/11/2025', status: 'Đang giao', total: '5.280.000' },
  { code: '#OD12312', date: '10/11/2025', status: 'Hoàn tất', total: '3.150.000' },
]

const recentlyViewed = [
  { name: 'Set Linen Be', price: '2.190.000', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80' },
  { name: 'Đầm Midi Noir', price: '2.890.000', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=700&q=80' },
]

const IconButton = ({ children, label }) => (
  <button
    type="button"
    className="relative flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 transition hover:border-transparent hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900"
    aria-label={label}
  >
    {children}
  </button>
)

const IconBadge = ({ value }) => (
  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-semibold text-black">
    {value}
  </span>
)

const Countdown = ({ data }) => (
  <div className="flex gap-3">
    {Object.entries(data).map(([label, value]) => (
      <div key={label} className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-2 text-white">
        <span className="text-2xl font-semibold tabular-nums">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
      </div>
    ))}
  </div>
)

const ProductCard = ({ product, highlight }) => (
  <div className="group rounded-3xl bg-white/80 p-4 shadow-[0_10px_45px_rgba(15,23,42,0.05)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:bg-slate-900/60">
    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
      <img src={product.image} alt={product.name} className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
      {product.badge && (
        <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white">{product.badge}</span>
      )}
      {product.tag && (
        <span className="absolute left-4 top-4 rounded-full bg-[#D4AF37]/90 px-3 py-1 text-xs font-medium uppercase tracking-widest text-black">{product.tag}</span>
      )}
      {product.discount && (
        <span className="absolute right-4 top-4 rounded-full bg-[#004D40]/95 px-3 py-1 text-xs font-semibold text-white">-{product.discount}%</span>
      )}
      {highlight && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-16 text-sm text-white">
          {highlight}
        </span>
      )}
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{product.category ?? 'Look'}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-slate-500">Từ {product.price}₫</p>
      </div>
      <button className="rounded-full border border-slate-200 p-3 transition hover:border-transparent hover:bg-black hover:text-white dark:border-slate-800 dark:hover:bg-slate-100 dark:hover:text-slate-900" aria-label="Thêm nhanh">
        +
      </button>
    </div>
  </div>
)

const IconSearch = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20L17 17" />
  </svg>
)

const IconHeart = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 20s-7-4.434-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.566-7 10-7 10Z" />
  </svg>
)

const IconUser = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-3 3.5-4 8-4s6.5 1 8 4" />
  </svg>
)

const IconCart = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M4 6h18l-2 9H6L4 4H1" />
    <circle cx="9" cy="20" r="1.2" />
    <circle cx="18" cy="20" r="1.2" />
  </svg>
)

const IconMenu = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

const IconClose = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M6 6l12 12M18 6l-12 12" />
  </svg>
)

const IconStar = () => (
  <svg className="h-4 w-4 fill-[#D4AF37]" viewBox="0 0 20 20">
    <path d="m10 1.5 2.507 5.07 5.6.814-4.054 3.952.957 5.584L10 14.84l-5.01 2.08.957-5.584L1.894 7.384l5.6-.813L10 1.5Z" />
  </svg>
)

const IconChevron = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const IconMap = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3V6" />
    <path d="M9 6v12m6-9v12" />
  </svg>
)

const IconPhone = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M5 3h4l2 6-3 1c1 2.5 3.5 5 6 6l1-3 6 2v4c0 1-1 2-2 2C9.8 21 3 14.2 3 5c0-1 1-2 2-2Z" />
  </svg>
)

const IconMail = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M3 5h18v14H3z" />
    <path d="m3 5 9 9 9-9" />
  </svg>
)

const PageHeading = ({ label, description }) => (
  <div className="mb-8 flex flex-col gap-2">
    <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</span>
    {description && <p className="max-w-3xl text-sm text-slate-500">{description}</p>}
  </div>
)

const CountdownTargetHours = 72

const getCountdownState = (target) => {
  const now = Date.now()
  const diff = Math.max(target - now, 0)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [countdownTarget] = useState(() => Date.now() + CountdownTargetHours * 60 * 60 * 1000)
  const [countdown, setCountdown] = useState(getCountdownState(countdownTarget))

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownState(countdownTarget))
    }, 1000)
    return () => clearInterval(timer)
  }, [countdownTarget])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f7f7f3] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/85">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 lg:px-10">
            <div className="flex items-center gap-6">
              <button className="lg:hidden" onClick={() => setMobileMenu(true)} aria-label="Mở menu">
                <IconMenu />
              </button>
              <div className="flex items-center gap-2 text-lg font-semibold tracking-[0.4em] uppercase">
                <span className="h-8 w-8 rounded-full bg-black text-white dark:bg-white dark:text-black" />
                Luna Maison
              </div>
            </div>
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <a href={link.href} className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500 transition hover:text-black dark:hover:text-white">
                    {link.label}
                  </a>
                  {link.type === 'mega' && (
                    <div className="invisible absolute left-1/2 top-full z-50 mt-6 w-[720px] -translate-x-1/2 rounded-3xl border border-slate-200/70 bg-white/95 p-8 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900/95">
                      <div className="grid grid-cols-4 gap-6 text-sm">
                        {megaMenuColumns.map((col) => (
                          <div key={col.title} className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{col.title}</p>
                            <ul className="space-y-2 text-slate-700 dark:text-slate-200">
                              {col.items.map((item) => (
                                <li key={item} className="flex items-center justify-between text-sm transition hover:text-black">
                                  {item}
                                  <IconChevron />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-100/80 p-6 dark:bg-slate-800/80">
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Lookbook mới</p>
                          <h4 className="mt-2 text-xl font-semibold">Bộ sưu tập Resort 2025</h4>
                        </div>
                        <button className="rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#D4AF37] hover:text-black">
                          Xem ngay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 dark:border-slate-800 lg:flex">
                <IconSearch />
                <input type="text" placeholder="Tìm sản phẩm..." className="w-32 bg-transparent text-sm focus:outline-none" />
              </div>
              <IconButton label="Yêu thích">
                <IconHeart />
              </IconButton>
              <IconButton label="Tài khoản">
                <IconUser />
              </IconButton>
              <div className="relative">
                <IconButton label="Giỏ hàng">
                  <IconCart />
                  <IconBadge value={2} />
                </IconButton>
              </div>
              <button
                className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:bg-black hover:text-white dark:border-slate-800 lg:block"
                onClick={() => setDarkMode((prev) => !prev)}
                type="button"
              >
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </header>

        {mobileMenu && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenu(false)}>
            <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm overflow-y-auto bg-white p-6 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold tracking-[0.4em] uppercase">Menu</p>
                <button onClick={() => setMobileMenu(false)} aria-label="Đóng menu">
                  <IconClose />
                </button>
              </div>
              <div className="mt-6 space-y-6">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="block text-lg font-medium uppercase tracking-[0.4em] text-slate-600">
                    {link.label}
                  </a>
                ))}
                <button
                  className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] dark:border-slate-800"
                  onClick={() => setDarkMode((prev) => !prev)}
                  type="button"
                >
                  {darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-[1440px] space-y-24 px-4 py-10 lg:px-12">
          <section id="homepage" className="space-y-16 rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang chủ — Homepage" description="Tổng quan layout desktop 1440px với hero banner, danh mục nổi bật, sản phẩm bán chạy, sản phẩm mới, flash sale, thương hiệu đối tác và footer đầy đủ." />
            <div className="relative flex flex-col gap-8 rounded-[36px] bg-gradient-to-r from-black via-slate-900 to-slate-800 px-8 py-12 text-white lg:flex-row lg:px-16 lg:py-16">
              <div className="flex-1 space-y-6">
                <p className="text-xs uppercase tracking-[0.5em] text-[#D4AF37]">Minimal Luxury 2025</p>
                <h1 className="text-4xl font-semibold leading-tight lg:text-6xl">Thiết kế tối giản cao cấp, dành riêng cho bạn</h1>
                <p className="max-w-lg text-sm text-slate-200">
                  Bộ sưu tập Resort 2025 mang đến trải nghiệm trang phục cao cấp với chất liệu nhập khẩu Ý, phom dáng tinh giản và điểm nhấn vàng ánh kim.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-white hover:text-black">
                    Mua ngay
                  </button>
                  <button className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-white hover:text-black">
                    Xem bộ sưu tập
                  </button>
                </div>
                <div className="flex gap-8 text-sm uppercase tracking-[0.4em] text-slate-300">
                  <div>
                    <p className="text-3xl font-semibold text-white">48h</p>
                    Ưu đãi riêng
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-white">30+</p>
                    Sản phẩm mới
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-white">12</p>
                    Lookbook
                  </div>
                </div>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-[28px]">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
                  alt="Sản phẩm hot"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <p className="text-xs uppercase tracking-[0.5em] text-[#D4AF37]">Limited Capsule</p>
                  <p className="text-2xl font-semibold">Satin Backless Dress</p>
                  <p className="text-sm text-slate-200">Chỉ 120 chiếc trên toàn hệ thống</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Danh mục nổi bật</p>
                <a href="#collection" className="text-sm uppercase tracking-[0.4em] text-slate-500 hover:text-black">
                  Xem tất cả
                </a>
              </div>
              <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                  <div key={category.title} className="group relative overflow-hidden rounded-3xl bg-slate-100">
                    <img src={category.image} alt={category.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Danh mục</p>
                      <p className="text-lg font-semibold text-white">{category.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Sản phẩm bán chạy</p>
                  <h2 className="text-3xl font-semibold">Best Sellers</h2>
                </div>
                <div className="flex gap-3">
                  <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] hover:bg-black hover:text-white dark:border-slate-800">
                    Tất cả
                  </button>
                  <button className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] hover:bg-black hover:text-white dark:border-slate-800">
                    Lookbook
                  </button>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {bestSellers.map((product) => (
                  <ProductCard key={product.name} product={product} highlight="Vải satin nhập Ý, phom tailored fit" />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Sản phẩm mới</p>
                  <h2 className="text-3xl font-semibold">New Arrivals</h2>
                </div>
                <button className="text-sm uppercase tracking-[0.4em] text-[#004D40]">Xem bộ sưu tập</button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {newArrivals.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </div>
            </div>

            <div id="flash-sale" className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0a0a0a] to-[#1f1f1f] p-10 text-white">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.5em] text-[#D4AF37]">Flash Sale 48h</p>
                  <h2 className="text-4xl font-semibold">Ưu đãi độc quyền cho hội viên</h2>
                  <p className="text-sm text-slate-300">Miễn phí vận chuyển toàn quốc - Tặng thêm gói làm quà cao cấp.</p>
                  <Countdown data={countdown} />
                </div>
                <div className="grid flex-1 gap-6 md:grid-cols-3">
                  {flashSaleProducts.map((product) => (
                    <div key={product.name} className="rounded-2xl bg-white/5 p-5">
                      <img src={product.image} alt={product.name} className="h-36 w-full rounded-2xl object-cover" loading="lazy" />
                      <p className="mt-4 text-lg font-semibold">{product.name}</p>
                      <p className="text-sm text-slate-300">
                        <span className="text-xl font-semibold text-[#D4AF37]">{product.price}₫</span>
                        <span className="ml-2 text-xs line-through">{product.compareAt}₫</span>
                      </p>
                      <button className="mt-4 w-full rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                        thêm vào giỏ
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Thương hiệu đối tác</p>
                <a href="#collection" className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Instagram @luna.maison
                </a>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-sm uppercase tracking-[0.3em] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 md:col-span-1">
                  Trusted by leading fashion houses
                  <div className="mt-6 grid gap-3 text-2xl font-semibold text-slate-900 dark:text-white">
                    {partnerBrands.slice(0, 3).map((brand) => (
                      <p key={brand}>{brand}</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/50 md:col-span-2">
                  <div className="grid grid-cols-3 gap-4 text-center text-lg font-semibold uppercase tracking-[0.4em] text-slate-500">
                    {partnerBrands.map((brand) => (
                      <div key={brand} className="rounded-2xl border border-slate-200/70 p-4 text-slate-700 dark:border-slate-800 dark:text-slate-200">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <footer className="rounded-[32px] border border-slate-200/70 bg-white/90 p-10 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="grid gap-8 md:grid-cols-4">
                <div className="space-y-4">
                  <p className="text-lg font-semibold uppercase tracking-[0.4em]">Luna Maison</p>
                  <p className="text-sm text-slate-500">Thương hiệu thời trang tối giản cao cấp.</p>
                  <div className="flex gap-3">
                    <button className="rounded-full bg-black px-4 py-2 text-xs uppercase tracking-[0.4em] text-white">Instagram</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-xs uppercase tracking-[0.4em]">Facebook</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Menu</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>Trang chủ</li>
                    <li>Bộ sưu tập</li>
                    <li>Sale</li>
                    <li>Blog</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Chính sách</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>Đổi trả 14 ngày</li>
                    <li>Bảo mật thông tin</li>
                    <li>Thanh toán an toàn</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Đăng ký nhận tin</p>
                  <div className="mt-4 space-y-3">
                    <input type="email" placeholder="Email của bạn" className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:outline-none dark:border-slate-800 bg-transparent" />
                    <button className="w-full rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[#D4AF37] hover:text-black">
                      Đăng ký
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Hotline 1900 636 882 • support@lunamaison.com</p>
                </div>
              </div>
            </footer>
          </section>

          <section id="collection" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang danh mục — Collection Page" description="Phân trang sản phẩm với thanh lọc bên trái (desktop) / bottom sheet (mobile), grid 4 cột, banner quảng cáo giữa danh sách và pagination + nút xem thêm." />
            <div className="flex flex-col gap-10 lg:flex-row">
              <aside className="lg:w-64">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Bộ lọc</p>
                  <div className="mt-6 space-y-6">
                    {filterGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">{group.title}</p>
                        <div className="mt-3 space-y-2 text-sm text-slate-500">
                          {group.options.map((option) => (
                            <label key={option} className="flex items-center gap-2">
                              <input type="checkbox" className="rounded border-slate-300 accent-black" />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Mobile filter</p>
                  <p className="mt-3 text-sm text-slate-500">Hiển thị dạng bottom sheet khi màn hình &lt; 1024px.</p>
                </div>
              </aside>
              <div className="flex-1 space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCard
                      key={`collection-${index}`}
                      product={{
                        name: `Look ${index + 1}`,
                        price: `${(index + 2) * 750}.000`,
                        image: categories[index % categories.length].image,
                        badge: index === 1 ? 'New' : undefined,
                      }}
                    />
                  ))}
                </div>
                <div className="rounded-3xl bg-gradient-to-r from-[#e8e4da] to-white p-10 text-slate-900">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-600">Lookbook Capsule</p>
                      <h3 className="text-3xl font-semibold">Quảng cáo xen kẽ giữa sản phẩm</h3>
                      <p className="text-sm text-slate-500">Đặt sau 8-12 sản phẩm để giữ nhịp xem.</p>
                    </div>
                    <button className="rounded-full border border-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em]">Khám phá</button>
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCard
                      key={`collection-bottom-${index}`}
                      product={{
                        name: `Essential ${index + 1}`,
                        price: `${(index + 3) * 650}.000`,
                        image: categories[(index + 2) % categories.length].image,
                        tag: index % 2 === 0 ? 'Hot' : undefined,
                      }}
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((page) => (
                      <button
                        key={page}
                        className={`h-12 w-12 rounded-full border text-sm font-semibold ${page === 1 ? 'border-black bg-black text-white' : 'border-slate-200 text-slate-600 dark:border-slate-800'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button className="rounded-full border border-slate-200 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] hover:bg-black hover:text-white dark:border-slate-800">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="pdp" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang chi tiết sản phẩm — Product Detail Page" description="Layout 2 cột: gallery ảnh lớn bên trái (thumbnail + zoom), thông tin sản phẩm bên phải, tab thông tin và section sản phẩm liên quan + vừa xem gần đây." />
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="overflow-hidden rounded-[32px]">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80" alt="detail" className="h-[520px] w-full object-cover" loading="lazy" />
                </div>
                <div className="flex gap-4 overflow-x-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <img
                      key={index}
                      src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=${500 + index * 50}&q=80`}
                      alt="thumb"
                      className="h-24 w-32 rounded-2xl object-cover opacity-80 hover:opacity-100"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Limited capsule</p>
                  <h2 className="text-4xl font-semibold">Luna Satin Evening Dress</h2>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <IconStar key={index} />
                      ))}
                      4.9 (128 đánh giá)
                    </span>
                    <span>Mã SP: LA-SS25-008</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-4">
                  <p className="text-3xl font-semibold text-[#D4AF37]">3.450.000₫</p>
                  <p className="text-sm text-slate-400 line-through">4.290.000₫</p>
                  <span className="rounded-full bg-[#004D40]/10 px-3 py-1 text-xs font-semibold text-[#004D40]">-20%</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Chọn màu</p>
                    <div className="mt-3 flex gap-3">
                      {['#0f0f0f', '#f5f5f2', '#D4AF37', '#004D40'].map((color) => (
                        <button key={color} className="h-10 w-10 rounded-full border-2 border-transparent" style={{ background: color }} type="button" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Chọn size</p>
                    <div className="mt-3 flex gap-3">
                      {['XS', 'S', 'M', 'L'].map((size) => (
                        <button key={size} className="h-12 w-12 rounded-full border border-slate-200 text-sm font-semibold uppercase tracking-[0.3em] hover:bg-black hover:text-white dark:border-slate-800" type="button">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3 dark:border-slate-800">
                      <button type="button" aria-label="Giảm">-</button>
                      <span className="text-sm font-semibold">1</span>
                      <button type="button" aria-label="Tăng">
                        +
                      </button>
                    </div>
                    <button className="flex-1 rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white hover:bg-[#D4AF37] hover:text-black" type="button">
                      Thêm vào giỏ
                    </button>
                    <button className="flex-1 rounded-full border border-slate-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em]" type="button">
                      Mua ngay
                    </button>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                  <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-4 text-xs uppercase tracking-[0.4em] text-slate-500 dark:border-slate-800">
                    <button className="font-semibold text-black dark:text-white" type="button">
                      Mô tả
                    </button>
                    <button type="button">Kích thước</button>
                    <button type="button">Chính sách đổi trả</button>
                    <button type="button">Đánh giá</button>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-500">
                    {pdpFeatures.map((item) => (
                      <div key={item.label} className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="text-right text-slate-700">{item.value}</span>
                      </div>
                    ))}
                    <p className="pt-3 text-sm text-slate-500">Khách hàng đánh giá cao phom dáng ôm vừa, chất liệu mát lạnh và đường may tinh xảo.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Sản phẩm liên quan</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {newArrivals.slice(0, 2).map((product) => (
                    <ProductCard key={`related-${product.name}`} product={product} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Vừa xem gần đây</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {recentlyViewed.map((product) => (
                    <ProductCard key={`recent-${product.name}`} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="cart" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Giỏ hàng — Cart Page" description="Bảng sản phẩm với ảnh, tên, giá, số lượng +/- và xóa. Bên phải gồm ô mã giảm giá, tổng tiền, phí ship, tổng thanh toán và CTA lớn." />
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                {[1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
                    <img src={categories[index].image} alt="cart item" className="h-24 w-24 rounded-2xl object-cover" loading="lazy" />
                    <div className="flex-1">
                      <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Lookbook</p>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Sản phẩm {index}</h4>
                      <p className="text-sm text-slate-500">Màu đen • Size M</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-800" type="button">
                        -
                      </button>
                      <span>1</span>
                      <button className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-800" type="button">
                        +
                      </button>
                    </div>
                    <p className="text-lg font-semibold">2.{index}90.000₫</p>
                    <button className="text-sm text-slate-400" type="button">
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full rounded-3xl border border-slate-200 p-6 dark:border-slate-800 lg:w-96">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Mã giảm giá</p>
                  <div className="flex gap-3">
                    <input type="text" placeholder="Nhập mã" className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                    <button className="rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white">Áp dụng</button>
                  </div>
                  <div className="space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>5.480.000₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí ship</span>
                      <span>Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-slate-900 dark:text-white">
                      <span>Tổng thanh toán</span>
                      <span>5.480.000₫</span>
                    </div>
                  </div>
                  <button className="w-full rounded-full bg-[#D4AF37] px-6 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-black">
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="checkout" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang thanh toán — Checkout" description="Form 3 bước (thông tin giao hàng → vận chuyển → thanh toán) kèm tóm tắt đơn hàng sticky bên phải. Mobile có thể collapse thành accordion." />
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-6">
                {['Thông tin giao hàng', 'Phương thức vận chuyển', 'Thanh toán'].map((step, index) => (
                  <div key={step} className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                        Bước {index + 1} — {step}
                      </p>
                      <span className="text-xs text-slate-400">Hoàn tất 0{index + 1}/03</span>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <input type="text" placeholder="Họ tên" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                      <input type="text" placeholder="Số điện thoại" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                      <input type="email" placeholder="Email" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                      <input type="text" placeholder="Địa chỉ" className="md:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                      <textarea placeholder="Ghi chú đơn hàng" className="md:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" rows={3} />
                    </div>
                    {index === 1 && (
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {['Giao tiêu chuẩn (2-4 ngày)', 'Giao nhanh (24h)'].map((option) => (
                          <label key={option} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                            <span>{option}</span>
                            <input type="radio" name="shipping" />
                          </label>
                        ))}
                      </div>
                    )}
                    {index === 2 && (
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        {['COD', 'Chuyển khoản', 'Momo', 'ZaloPay', 'Thẻ tín dụng'].map((option) => (
                          <label key={option} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                            <span>{option}</span>
                            <input type="radio" name="payment" />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-96">
                <div className="sticky top-24 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Tóm tắt đơn hàng</p>
                  <div className="mt-4 space-y-4">
                    {bestSellers.slice(0, 2).map((product) => (
                      <div key={`summary-${product.name}`} className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold">{product.name}</p>
                          <p className="text-xs text-slate-500">Size S • Màu đen</p>
                        </div>
                        <p className="text-sm font-semibold">{product.price}₫</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>5.480.000₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span>0₫</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold text-slate-900 dark:text-white">
                      <span>Tổng</span>
                      <span>5.480.000₫</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded-full bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-white" type="button">
                    Hoàn tất đơn hàng
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="account" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang tài khoản — My Account" description="Menu dọc gồm Đơn hàng, Địa chỉ, Thông tin cá nhân, Đổi mật khẩu, Danh sách yêu thích, Đăng xuất. Dashboard hiển thị đơn hàng gần nhất." />
            <div className="flex flex-col gap-10 lg:flex-row">
              <aside className="w-full lg:w-72">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Tài khoản</p>
                  <div className="mt-6 space-y-3 text-sm">
                    {accountMenu.map((item, index) => (
                      <button
                        key={item}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left ${index === 0 ? 'bg-black text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        type="button"
                      >
                        {item}
                        <IconChevron />
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
              <div className="flex-1">
                <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Đơn hàng gần nhất</p>
                  <div className="mt-6 space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.code} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 px-4 py-3 text-sm dark:border-slate-800">
                        <span className="font-semibold">{order.code}</span>
                        <span className="text-slate-500">{order.date}</span>
                        <span className="rounded-full bg-[#004D40]/10 px-3 py-1 text-xs font-semibold text-[#004D40]">{order.status}</span>
                        <span className="ml-auto font-semibold">{order.total}₫</span>
                        <button className="text-xs uppercase tracking-[0.3em] text-slate-500" type="button">
                          Xem chi tiết
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 p-4 text-sm dark:border-slate-800">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Địa chỉ mặc định</p>
                      <p className="mt-3 text-slate-600">12 Nguyễn Huệ, Quận 1, TP.HCM</p>
                      <button className="mt-4 text-xs uppercase tracking-[0.3em] text-[#004D40]" type="button">
                        Chỉnh sửa
                      </button>
                    </div>
                    <div className="rounded-2xl border border-slate-100 p-4 text-sm dark:border-slate-800">
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Danh sách yêu thích</p>
                      <p className="mt-3 text-slate-600">08 sản phẩm — cập nhật 24/11/2025</p>
                      <button className="mt-4 text-xs uppercase tracking-[0.3em] text-[#004D40]" type="button">
                        Xem danh sách
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="static-pages" className="rounded-[40px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
            <PageHeading label="Trang tĩnh — About / Policy / Guide / Contact" description="Các trang Giới thiệu, Chính sách đổi trả, Chính sách bảo mật, Hướng dẫn mua hàng, Liên hệ (form + Google Maps)." />
            <div className="grid gap-6 lg:grid-cols-2">
              {staticPages.map((page) => (
                <div key={page.id} id={page.id} className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{page.title}</p>
                  <p className="mt-3 text-sm text-slate-500">{page.description}</p>
                  <button className="mt-6 text-xs uppercase tracking-[0.3em] text-[#004D40]" type="button">
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </div>
            <div id="contact" className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Liên hệ</p>
                <form className="mt-4 space-y-4">
                  <input type="text" placeholder="Họ và tên" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                  <input type="email" placeholder="Email" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                  <textarea placeholder="Lời nhắn" rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 bg-transparent" />
                  <button className="w-full rounded-full bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.4em] text-white" type="submit">
                    Gửi thông tin
                  </button>
                </form>
                <div className="mt-6 space-y-3 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <IconPhone /> Hotline 1900 636 882
                  </p>
                  <p className="flex items-center gap-2">
                    <IconMail /> hello@lunamaison.com
                  </p>
                  <p className="flex items-center gap-2">
                    <IconMap /> 12 Nguyễn Huệ, Quận 1, TP.HCM
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Google Maps</p>
                <div className="mt-4 h-80 overflow-hidden rounded-2xl">
                  <iframe
                    title="Luna Maison"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4439281398375!2d106.70042357582971!3d10.777738389377054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4144111111%3A0xf5b6c3b2dae23b27!2zMTIgTmd1eeG7hW4gSHXhur8sIFF14bqjbSBN4buZdCwgUXXhuq1uIDEgLSBIEE1D!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 py-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-md items-center justify-around text-xs uppercase tracking-[0.4em] text-slate-500">
            {[
              { label: 'Trang chủ', href: '#homepage' },
              { label: 'Danh mục', href: '#collection' },
              { label: 'Giỏ hàng', href: '#cart' },
              { label: 'Tài khoản', href: '#account' },
            ].map((item) => (
              <a key={item.label} href={item.href} className="flex flex-col items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default App

