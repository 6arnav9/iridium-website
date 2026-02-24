import React, { useState, useContext, createContext, useEffect } from 'react';
import { 
  Globe, Server, Check, Sun, Moon,
  ArrowRight, Phone, Mail, MapPin, 
  Calendar, ChevronRight, Users, Wrench, Package,
  Linkedin, Instagram, Menu, X
} from 'lucide-react';

// --- THEME CONFIGURATION ---
const themes = {
  light: {
    name: 'Light',
    icon: Sun,
    bg: 'bg-violet-950',
    bgCard: 'bg-violet-900/40',
    text: 'text-violet-50',
    textMuted: 'text-violet-300',
    border: 'border-violet-800/30', // Softened
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400 text-violet-950 shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    hover: 'hover:bg-violet-900/80',
    fontBase: 'font-sans',
    fontMono: 'font-mono'
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    bg: 'bg-[#05000a]', // Even deeper black
    bgCard: 'bg-[#120024]/40',
    text: 'text-fuchsia-50',
    textMuted: 'text-fuchsia-400/50',
    border: 'border-white/5', // Removed fuchsia outline, using very subtle neutral border
    accent: 'text-yellow-300',
    accentBg: 'bg-yellow-300 text-black shadow-none border border-yellow-200/20', // Removed heavy glow
    hover: 'hover:bg-[#1a0033]',
    fontBase: 'font-sans',
    fontMono: 'font-mono text-yellow-500'
  }
};

const ThemeContext = createContext();

// --- COMPONENTS ---

const IridiumLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="#facc15" />
    <text x="48" y="66" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="48" fontWeight="900" fill="#4c1d95" style={{ letterSpacing: '-1px' }}>Ir</text>
    <text x="75" y="40" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="bold" fill="#4c1d95">77</text>
  </svg>
);

const Navbar = ({ currentTheme, setTheme, currentPage, setPage }) => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNav = (id) => {
    setPage(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 top-0 backdrop-blur-xl border-b ${theme.border} transition-colors duration-500 bg-opacity-80`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav('home')}
        >
          <IridiumLogo className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
          <span className={`text-xl md:text-2xl font-black tracking-tight ${theme.text}`}>IRIDIUM</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 text-sm font-bold tracking-wide uppercase">
            {navLinks.map((page) => (
              <button 
                key={page.id}
                onClick={() => handleNav(page.id)}
                className={`transition-colors ${currentPage === page.id ? theme.accent : `${theme.textMuted} hover:${theme.accent}`}`}
              >
                {page.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 border-l pl-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className={`flex items-center p-1 rounded-md border ${theme.border} ${theme.bgCard}`}>
              {Object.keys(themes).map(key => {
                const Icon = themes[key].icon;
                return (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`p-1.5 rounded-sm transition-all ${currentTheme === key ? theme.accentBg : `${theme.textMuted} hover:${theme.text}`}`}
                    title={themes[key].name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <button onClick={() => {
              if (currentPage === 'home') {
                const cal = document.getElementById('calendar-section');
                if (cal) cal.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleNav('contact');
              }
            }} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-sm transition-all transform hover:-translate-y-0.5 ${theme.accentBg}`}>
              <Calendar className="w-4 h-4" /> Book Meeting
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')} className={`p-2 rounded-md border ${theme.border} ${theme.text}`}>
            {currentTheme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${theme.text}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute w-full transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen border-b ' + theme.border : 'max-h-0'}`}>
        <div className={`${theme.bg} p-6 flex flex-col gap-5 text-center shadow-2xl`}>
          {navLinks.map((page) => (
            <button 
              key={page.id}
              onClick={() => handleNav(page.id)}
              className={`text-base font-bold uppercase tracking-widest ${currentPage === page.id ? theme.accent : theme.text}`}
            >
              {page.label}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className={`w-full py-3 text-sm font-bold uppercase tracking-wide rounded-md ${theme.accentBg}`}
          >
            Book Meeting
          </button>
        </div>
      </div>
    </nav>
  );
};

const DataMatrixSection = () => {
  const theme = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('catalog');

  const catalogData = [
    { cat: 'Network Support', type: 'Dedicated & FTE', skill: 'End user computing' },
    { cat: 'Wireless Survey', type: 'IMAC/Projects', skill: 'Networking' },
    { cat: 'Cloud & Infra', type: 'Break-fix', skill: 'Data centre' },
    { cat: 'IT Asset Data', type: 'Smart Hands', skill: 'Server & Storage' },
    { cat: 'Warehouse', type: 'Onsite Support', skill: 'Cloud' },
    { cat: 'Lifecycle Mgmt', type: 'Remote Support', skill: 'Telecom' },
    { cat: 'Staffing', type: 'Forward Stocking', skill: 'Project Mgmt' },
  ];

  const slaData = [
    { skill: 'Entry (L0)', response: '4h / Same Day', window: '9x5' },
    { skill: 'Junior (L1)', response: '8h / Same Day', window: '9x7' },
    { skill: 'Mid (L2)', response: 'NBD', window: '12x5' },
    { skill: 'Senior (L3)', response: 'Scheduled', window: '12x7' },
    { skill: 'SME', response: '24x7 Onsite', window: '24x7' },
  ];

  return (
    <section className={`py-16 md:py-24 px-4 md:px-6 bg-black/5 border-t ${theme.border}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6 ${theme.text}`}>Structured Delivery.</h3>
          <p className={`${theme.textMuted} leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0`}>
            Explore our comprehensive service catalog and strict SLA parameters ensuring global consistency.
          </p>
          <div className="flex flex-col gap-2 max-w-sm mx-auto lg:mx-0">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`text-left px-6 py-4 rounded-lg font-bold transition-all flex justify-between items-center border ${activeTab === 'catalog' ? `${theme.border} ${theme.bgCard} ${theme.accent}` : `border-transparent ${theme.textMuted} hover:bg-black/10`}`}
            >
              Service Catalog <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === 'catalog' ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
            <button 
              onClick={() => setActiveTab('sla')}
              className={`text-left px-6 py-4 rounded-lg font-bold transition-all flex justify-between items-center border ${activeTab === 'sla' ? `${theme.border} ${theme.bgCard} ${theme.accent}` : `border-transparent ${theme.textMuted} hover:bg-black/10`}`}
            >
              SLA & Skill Sets <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === 'sla' ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className={`border ${theme.border} ${theme.bgCard} rounded-xl overflow-x-auto shadow-2xl backdrop-blur-md`}>
            <div className="min-w-[600px]">
              {activeTab === 'catalog' ? (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className={`grid grid-cols-3 p-4 border-b ${theme.border} bg-black/20 ${theme.fontMono} text-xs font-bold uppercase tracking-wider ${theme.accent}`}>
                    <div>Service Category</div>
                    <div>Support Type</div>
                    <div>Skill Type</div>
                  </div>
                  <div className={`divide-y ${theme.border}`}>
                    {catalogData.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 p-4 hover:bg-white/5 transition-colors text-xs md:text-sm ${theme.text}`}>
                        <div className="pr-4">{row.cat}</div>
                        <div className="pr-4 opacity-80">{row.type}</div>
                        <div className="opacity-80">{row.skill}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <div className={`grid grid-cols-3 p-4 border-b ${theme.border} bg-black/20 ${theme.fontMono} text-xs font-bold uppercase tracking-wider ${theme.accent}`}>
                    <div>Skill Set</div>
                    <div>SLA Response</div>
                    <div>Window</div>
                  </div>
                  <div className={`divide-y ${theme.border}`}>
                    {slaData.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 p-5 hover:bg-white/5 transition-colors text-xs md:text-sm items-center`}>
                        <div className={`font-bold ${theme.accent}`}>{row.skill}</div>
                        <div className={`${theme.text}`}>{row.response}</div>
                        <div className={`${theme.text}`}>{row.window}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = ({ setPage, setTargetSection }) => {
  const theme = useContext(ThemeContext);
  const calendarRef = React.useRef(null);

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceClick = (id) => {
    setTargetSection(id);
    setPage('about');
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className={`min-h-[calc(100vh-80px)] px-6 relative overflow-hidden flex flex-col items-center justify-center text-center`}>
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-violet-600/10 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-yellow-500/5 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center">
          <div className={`inline-flex items-center gap-3 mb-6 md:mb-8 px-4 py-2 border ${theme.border} ${theme.bgCard} rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest ${theme.accent}`}>
            <Globe className="w-3 h-3 md:w-4 h-4" />
            <span>UAE • Africa • India</span>
          </div>
          
          <h1 className={`text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 ${theme.text}`}>
            Elemental IT.<br/>
            <span className="opacity-40">Global Infrastructure.</span>
          </h1>
          
          <p className={`text-sm md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed px-4 ${theme.textMuted}`}>
            End-to-end hardware and software lifecycle management. Precision-engineered IT support, from dedicated Hands & Feet to Professional Staffing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
            <button onClick={scrollToCalendar} className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 font-bold uppercase tracking-wide rounded-sm transition-all hover:scale-105 active:scale-95 ${theme.accentBg}`}>
              Book a Meeting
            </button>
            <button onClick={() => setPage('about')} className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 font-bold uppercase tracking-wide rounded-sm border ${theme.border} ${theme.bgCard} ${theme.text} ${theme.hover} transition-all active:scale-95`}>
              Discover Iridium
            </button>
          </div>
        </div>
      </section>

      <section className={`py-16 md:py-24 px-4 md:px-6 border-t ${theme.border}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`${theme.fontMono} text-xs md:text-sm font-bold uppercase tracking-widest ${theme.textMuted} mb-12 flex items-center justify-center md:justify-start gap-4`}>
            <span className={`hidden md:block w-8 h-px bg-current opacity-30`}></span> Complete Infrastructure Ecosystem
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              { id: 'onsite', title: 'On-Site IT Support', icon: Wrench, desc: 'Rapid response break-fix, comprehensive IMAC services, and 24x7 Help Desk ensuring your physical presence needs are met.' },
              { id: 'network', title: 'Network & EUC Support', icon: Server, desc: 'Holistic infrastructure support ranging from localized workplace endpoints to global SD-WAN and Datacenter deployments.' },
              { id: 'logistics', title: 'Logistics Solutions', icon: Package, desc: 'Global warehousing, strict RMA handling, and secure last-mile customs clearance delivery for your physical assets.' },
              { id: 'professional', title: 'Professional Staffing', icon: Users, desc: 'Scalable managed IT staffing spanning entry-level engineers to SMEs across all domains for project or long-term needs.' }
            ].map((svc, i) => (
              <button 
                key={i} 
                onClick={() => handleServiceClick(svc.id)} 
                className={`text-left p-8 md:p-10 border ${theme.border} ${theme.bgCard} ${theme.hover} rounded-2xl transition-all duration-300 transform hover:shadow-xl group flex flex-col h-full`}
              >
                <div className="flex items-center gap-4 mb-6 w-full">
                  <svc.icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${theme.accent}`} />
                  <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 ml-auto opacity-0 md:opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0 ${theme.accent}`} />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-4 ${theme.text}`}>{svc.title}</h3>
                <p className={`text-sm md:text-base leading-relaxed ${theme.textMuted}`}>{svc.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <DataMatrixSection />

      <section id="calendar-section" ref={calendarRef} className={`py-16 md:py-24 px-4 md:px-6 border-t ${theme.border} bg-black/5`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${theme.text}`}>Schedule a Strategy Session</h2>
          <p className={`text-base md:text-lg mb-10 ${theme.textMuted}`}>Select a time to speak directly with our infrastructure architects or staffing directors.</p>
          
          <div className={`w-full min-h-[300px] md:h-[500px] rounded-2xl border ${theme.border} ${theme.bgCard} backdrop-blur-md shadow-2xl flex items-center justify-center relative overflow-hidden py-12`}>
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px', color: 'currentColor' }}></div>
             <div className="relative z-10 text-center px-6">
               <Calendar className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 opacity-80 ${theme.accent}`} />
               <h3 className={`text-xl md:text-2xl font-bold mb-2 ${theme.text}`}>Calendar Integration Ready</h3>
               <p className={`${theme.fontMono} text-xs md:text-sm uppercase tracking-widest ${theme.textMuted}`}>[ Embed Scheduling Widget Here ]</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const About = ({ targetSection }) => {
  const theme = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(targetSection || 'onsite');

  useEffect(() => {
    if (targetSection) {
      setExpanded(targetSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [targetSection]);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const sections = [
    {
      id: 'onsite',
      title: 'On-Site Infrastructure Support',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-6 md:space-y-8 mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-base md:text-lg`}>
            Our core competency involves providing swift and reliable physical presence. We ensure your datacenters, offices, and end-user locations are continuously operational.
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>IMAC Services</h4>
              <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                {[
                  'Site readiness & physical site surveys',
                  'Wireless site surveys & audits',
                  'Hardware installation & configuration',
                  'Cable management & organization',
                  'Asset recovery & shipping',
                  'Project-based deployments'
                ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>Break Fix Support</h4>
                <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                  {[
                    'Rigorous troubleshooting and diagnostics',
                    'SLA: 4Hrs / Same Day & NBD',
                    '24x7 coverage with BGV named engineers'
                  ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      title: 'Network & DC Support',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-6 md:space-y-8 mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-base md:text-lg`}>
            Architecture support scaling from localized EUC setups to global Datacenter and Enterprise Network infrastructures.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>Network & Security</h4>
              <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                 {['WAN/LAN assessment', 'LLD & HLD Planning', 'SD-WAN Deployment', 'Wi-Fi support', 'Cybersecurity'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>Cloud & EUC</h4>
              <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                 {['DC Infrastructure assessment', 'Maintenance and build-out', 'Desktop/Laptop solutions', 'AV Conferencing'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'logistics',
      title: 'Logistics & WHS Solutions',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-6 md:space-y-8 mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-base md:text-lg`}>
            We manage the entire physical lifecycle of your assets, operating forward stocking locations and overseeing complex global fulfillments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <ul className={`space-y-3 text-xs md:text-sm ${theme.textMuted} list-none`}>
              {[
                'Spare & RMA management',
                'Forward/Reverse logistics (DDP)',
                'Global & localized warehousing',
                'Pre-staging services'
              ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
            </ul>
            <ul className={`space-y-3 text-xs md:text-sm ${theme.textMuted} list-none`}>
              {[
                'Last-mile delivery with customs',
                'Remote support & Site audits',
                'Stock spares delivery'
              ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'professional',
      title: 'Professional Services & Staffing',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-6 md:space-y-8 mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-base md:text-lg`}>
            Deploying Practice Leaders, Architects, and Senior Engineers across IT & Telecom domains.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>Engineering</h4>
              <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                 {['Presales & RFP Support', 'Architecture design', 'Network Optimization', 'Security Audits'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
              </ul>
            </div>
            <div>
              <h4 className={`text-base md:text-lg font-bold mb-3 ${theme.accent}`}>Managed IT Staffing</h4>
              <ul className={`space-y-2 text-xs md:text-sm ${theme.textMuted} list-none`}>
                 {['Global recruitment methodology', 'Contract-to-hire & Search', 'FTE Engineers (L0-L4)', 'Compliance & Risk mgmt'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accent}`}/> {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 pt-28 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-6 md:mb-8 ${theme.text}`}>Capabilities & Services</h1>
        <div className="space-y-4 md:space-y-6 text-sm md:text-base text-left md:text-center">
          <p className={`leading-relaxed ${theme.textMuted}`}>
            Iridium serves as a premier global IT Infrastructure Support organization, delivering managed field services, break-fix support, and consultancy across UAE, Africa, and India.
          </p>
          <p className={`leading-relaxed ${theme.textMuted}`}>
            We provide end-to-end IT infrastructure support encompassing hardware and software domains, from complex datacenters to diverse end-customer locations.
          </p>
          <p className={`text-lg md:text-xl font-bold leading-relaxed ${theme.accent} pt-4`}>
            Explore our core practice areas below.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {sections.map(sec => (
          <div key={sec.id} className={`border ${theme.border} ${theme.bgCard} rounded-xl overflow-hidden shadow-lg transition-all duration-300`}>
            <button 
              onClick={() => toggle(sec.id)}
              className={`w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-black/10 transition-colors ${expanded === sec.id ? 'bg-black/10' : ''}`}
            >
               <h2 className={`text-lg md:text-2xl font-bold ${expanded === sec.id ? theme.accent : theme.text}`}>{sec.title}</h2>
               <div className={`p-1.5 md:p-2 rounded-full border ${theme.border} ${expanded === sec.id ? theme.accentBg : ''}`}>
                 <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${expanded === sec.id ? 'rotate-90 text-black' : theme.textMuted}`} />
               </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${expanded === sec.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
               <div className="overflow-hidden">
                 <div className="p-5 md:p-6 pt-0 border-t border-inherit">
                   {sec.content}
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const theme = useContext(ThemeContext);
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="animate-in fade-in duration-700 pt-28 pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${theme.text}`}>Engage with Iridium</h1>
        <p className={`text-base md:text-lg ${theme.textMuted}`}>Global presence, local execution. Reach out to coordinate site surveys or staffing requests.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6 md:space-y-8">
          <div className={`p-6 md:p-8 border ${theme.border} ${theme.bgCard} rounded-xl`}>
            <h3 className={`text-xl md:text-2xl font-bold mb-6 ${theme.text}`}>Operating Headquarters</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className={`w-5 h-5 md:w-6 md:h-6 mt-1 ${theme.accent}`} />
                <div>
                  <h4 className={`font-bold ${theme.text}`}>Business Bay</h4>
                  <p className={`${theme.textMuted} text-sm mt-1`}>Dubai, United Arab Emirates<br/>Central Hub for MEA Operations</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-inherit pt-6" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <Phone className={`w-5 h-5 md:w-6 md:h-6 ${theme.accent}`} />
                <p className={`${theme.textMuted} text-sm`}>+971 (0) 4 XXX XXXX</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className={`w-5 h-5 md:w-6 md:h-6 ${theme.accent}`} />
                <p className={`${theme.textMuted} text-sm`}>sales@iridium-infra.com</p>
              </div>
            </div>
          </div>

          <div className={`h-48 md:h-64 rounded-xl border ${theme.border} bg-black/10 relative overflow-hidden flex items-center justify-center`}>
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '20px 20px', color: 'currentColor' }}></div>
             <div className="relative text-center z-10">
               <Globe className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50 ${theme.accent}`} />
               <span className={`${theme.fontMono} text-[10px] md:text-xs uppercase tracking-widest ${theme.textMuted}`}>Map visualization placeholder</span>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {status === 'success' ? (
            <div className={`p-8 md:p-10 border border-green-500/20 bg-green-500/5 rounded-2xl text-center space-y-4 animate-in zoom-in-95 duration-500`}>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
              </div>
              <h3 className={`text-xl md:text-2xl font-bold text-green-400`}>Inquiry Submitted</h3>
              <p className={`${theme.textMuted} text-sm md:text-base mb-6`}>A representative will contact you shortly.</p>
              <button onClick={() => setStatus('idle')} className={`mt-4 px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md border ${theme.border} ${theme.text} hover:bg-black/10 transition-all`}>
                New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`p-6 md:p-8 border ${theme.border} ${theme.bgCard} rounded-xl space-y-4`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 ${theme.text}`}>Send an Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
                <input required type="text" placeholder="Last Name" className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="email" placeholder="Email" className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
                <input required type="tel" placeholder="Phone" className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
              </div>
              <select required className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.textMuted}`}>
                <option value="">Select Service...</option>
                <option value="Infrastructure">Infrastructure Support</option>
                <option value="Staffing">Staffing</option>
                <option value="Logistics">Logistics</option>
                <option value="Other">Other</option>
              </select>
              <textarea required placeholder="Project Details..." rows="3" className={`w-full p-3 bg-black/10 border ${theme.border} rounded-md text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`}></textarea>
              <button type="submit" disabled={status === 'submitting'} className={`w-full py-4 font-bold uppercase tracking-wide rounded-md transition-all flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed grayscale' : `hover:scale-[1.01] active:scale-95 ${theme.accentBg}`}`}>
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setPage }) => {
  const theme = useContext(ThemeContext);

  return (
    <footer className={`py-12 md:py-16 px-6 border-t ${theme.border} bg-black/20 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-center md:items-start text-center md:text-left">
        <div className="flex flex-col gap-6 md:w-1/3 items-center md:items-start">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <IridiumLogo className="h-8 w-8 drop-shadow-md" />
            <span className={`text-xl font-black tracking-tight ${theme.text}`}>IRIDIUM</span>
          </div>
          <div className={`flex flex-col gap-4 text-xs md:text-sm ${theme.textMuted}`}>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Phone className={`w-4 h-4 ${theme.accent}`} />
              <span>+971 (0) 4 XXX XXXX</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Mail className={`w-4 h-4 ${theme.accent}`} />
              <span>sales@iridium-infra.com</span>
            </div>
            <div className="flex items-start justify-center md:justify-start gap-3">
              <MapPin className={`w-4 h-4 mt-1 ${theme.accent}`} />
              <span>Business Bay, Dubai<br/>United Arab Emirates</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          <h4 className={`text-lg font-bold ${theme.accent}`}>Navigation</h4>
          <ul className={`flex flex-col gap-3 text-xs md:text-sm font-medium ${theme.textMuted}`}>
            <li><button onClick={() => setPage('home')} className={`hover:${theme.accent} transition-colors`}>Home</button></li>
            <li><button onClick={() => setPage('about')} className={`hover:${theme.accent} transition-colors`}>About</button></li>
            <li><button onClick={() => setPage('contact')} className={`hover:${theme.accent} transition-colors`}>Contact Us</button></li>
          </ul>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4 w-full max-w-xs">
          <h4 className={`text-lg font-bold ${theme.accent}`}>Connect</h4>
          <div className="flex flex-col gap-2">
            <button className={`flex items-center justify-center md:justify-start gap-3 p-2.5 border ${theme.border} rounded-lg hover:bg-black/20 transition-all text-xs ${theme.text}`}>
               <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
               </svg> Whatsapp
            </button>
            <button className={`flex items-center justify-center md:justify-start gap-3 p-2.5 border ${theme.border} rounded-lg hover:bg-black/20 transition-all text-xs ${theme.text}`}>
               <Instagram className="w-4 h-4 text-pink-500" /> Instagram
            </button>
            <button className={`flex items-center justify-center md:justify-start gap-3 p-2.5 border ${theme.border} rounded-lg hover:bg-black/20 transition-all text-xs ${theme.text}`}>
               <Linkedin className="w-4 h-4 text-blue-500" /> LinkedIn
            </button>
          </div>
        </div>
      </div>
      
      <div className={`mt-12 md:mt-16 pt-8 border-t ${theme.border} text-[10px] md:text-xs ${theme.fontMono} ${theme.textMuted} text-center opacity-50`}>
        © 2026 Iridium IT Infrastructure.
      </div>
    </footer>
  );
};

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');
  const [targetSection, setTargetSection] = useState(null);
  
  const activeTheme = themes[currentTheme];

  useEffect(() => {
    if (!targetSection) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, targetSection]);

  const handlePageChange = (page) => {
    setTargetSection(null);
    setCurrentPage(page);
  };

  return (
    <ThemeContext.Provider value={activeTheme}>
      <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.fontBase} transition-colors duration-700 selection:bg-yellow-400/30 selection:text-white outline-none`}>
        <Navbar 
          currentTheme={currentTheme} 
          setTheme={setCurrentTheme} 
          currentPage={currentPage}
          setPage={handlePageChange}
        />
        
        <main className="pt-20 min-h-[calc(100vh-80px)] overflow-hidden">
          {currentPage === 'home' && <Home setPage={setCurrentPage} setTargetSection={setTargetSection} />}
          {currentPage === 'about' && <About targetSection={targetSection} />}
          {currentPage === 'contact' && <Contact />}
        </main>

        <Footer setPage={handlePageChange} />
      </div>
    </ThemeContext.Provider>
  );
}