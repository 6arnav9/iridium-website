import React, { useState, useContext, createContext, useEffect } from 'react';
import { 
  Server, Check, Sun, Moon,
  ArrowRight, Phone, Mail, MapPin, 
  ChevronDown, ChevronRight, Users, Wrench, Package,
  Linkedin, Menu, X
} from 'lucide-react';

// --- THEME CONFIGURATION ---
const themes = {
  light: {
    name: 'Light',
    icon: Sun,
    bg: 'bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-950',
    bgCard: 'bg-violet-900/30',
    text: 'text-violet-50',
    textMuted: 'text-violet-300',
    border: 'border-violet-800/30',
    accent: 'text-yellow-400',
    accentBg: 'bg-yellow-400 text-violet-950 shadow-[0_0_20px_rgba(250,204,21,0.2)]',
    hover: 'hover:bg-violet-800/50',
    fontBase: 'font-sans',
    fontMono: 'font-mono',
    logoText: '#4c1d95'
  },
  dark: {
    name: 'Dark',
    icon: Moon,
    bg: 'bg-gradient-to-br from-[#05000a] via-[#0f001f] to-[#020005]',
    bgCard: 'bg-white/5',
    text: 'text-white',
    textMuted: 'text-fuchsia-100/50',
    border: 'border-white/10',
    accent: 'text-yellow-300',
    accentBg: 'bg-yellow-300 text-black shadow-none border border-yellow-200/20',
    hover: 'hover:bg-white/10',
    fontBase: 'font-sans',
    fontMono: 'font-mono text-yellow-500',
    logoText: '#ffffff'
  }
};

const ThemeContext = createContext();

// --- COMPONENTS ---

const IridiumLogo = ({ className = "w-10 h-10" }) => {
  const theme = useContext(ThemeContext);
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="#facc15" />
      <text x="48" y="66" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="48" fontWeight="900" fill={theme.logoText} style={{ letterSpacing: '-1px' }}>Ir</text>
      <text x="75" y="40" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="bold" fill={theme.logoText}>77</text>
    </svg>
  );
};

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
    <nav className={`fixed w-full z-50 top-0 backdrop-blur-2xl border-b ${theme.border} transition-colors duration-500 bg-opacity-80`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          onClick={() => handleNav('home')}
        >
          <IridiumLogo className="h-8 w-8 md:h-10 md:w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
          <span className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight ${theme.text}`}>IRIDIUM</span>
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

            <a href="tel:+971567553646" className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-sm transition-all transform hover:-translate-y-0.5 ${theme.accentBg}`}>
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3 sm:gap-4">
          <button onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')} className={`p-2 rounded-md border ${theme.border} ${theme.text}`}>
            {currentTheme === 'light' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${theme.text}`}>
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
          <a 
            href="tel:+971567553646"
            className={`w-full py-3 text-sm font-bold uppercase tracking-wide rounded-md text-center ${theme.accentBg}`}
          >
            Call Us
          </a>
        </div>
      </div>
    </nav>
  );
};

const GlobalFootprintSection = () => {
  const theme = useContext(ThemeContext);
  
  const regions = [
    { name: 'UAE', flag: 'https://flagcdn.com/ae.svg' },
    { name: 'Kenya', flag: 'https://flagcdn.com/ke.svg' },
    { name: 'India', flag: 'https://flagcdn.com/in.svg' }
  ];

  return (
    <section className={`py-12 md:py-24 px-4 md:px-6 border-t ${theme.border} bg-black/5 w-full`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16">
          <h2 className={`text-xl sm:text-2xl md:text-5xl font-black tracking-tight leading-tight ${theme.text}`}>
            We are happy to serve companies in the Middle East, Africa, and India, enabling digital growth in:
          </h2>
        </div>
        
        {/* Adjusted grid to safely maintain 3 columns on all screens without breaking design */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-5xl mx-auto">
          {regions.map((region, i) => (
            <div key={i} className={`p-2 sm:p-4 md:p-8 rounded-lg md:rounded-2xl border ${theme.border} ${theme.bgCard} hover:bg-black/10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex flex-col items-center justify-center text-center gap-2 md:gap-5`}>
              <div className={`w-8 h-5 sm:w-16 sm:h-10 md:w-24 md:h-16 rounded-sm overflow-hidden shrink-0 border border-white/10 shadow-md`}>
                <img src={region.flag} alt={`${region.name} Flag`} className="w-full h-full object-cover" />
              </div>
              <h4 className={`text-[10px] sm:text-sm md:text-2xl font-bold ${theme.text}`}>{region.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DataMatrixSection = () => {
  const theme = useContext(ThemeContext);

  const catalogData = [
    { cat: 'Network Support', type: 'Dedicated & FTE', skill: 'End user computing' },
    { cat: 'Wireless Survey', type: 'IMAC/Projects', skill: 'Networking' },
    { cat: 'Cloud & Infra', type: 'Break-fix', skill: 'Data centre' },
    { cat: 'IT Asset Data', type: 'Smart Hands', skill: 'Server & Storage' },
    { cat: 'Warehouse', type: 'Onsite Support', skill: 'Cloud' },
    { cat: 'Lifecycle Mgmt', type: 'Remote Support', skill: 'Telecom' },
    { cat: 'Staffing', type: 'Forward Stocking', skill: 'Project Mgmt' },
  ];

  return (
    <section className={`py-12 md:py-24 px-4 md:px-6 bg-black/10 border-t ${theme.border} w-full`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12">
        <div className="lg:w-1/3 text-center lg:text-left">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6 ${theme.text}`}>Service Catalog.</h3>
          <p className={`${theme.textMuted} text-sm sm:text-base leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0`}>
            Explore our comprehensive range of specialized IT services designed for global infrastructure management.
          </p>
        </div>

        <div className="lg:w-2/3 w-full">
          <div className={`border ${theme.border} ${theme.bgCard} rounded-xl overflow-x-auto shadow-2xl backdrop-blur-md w-full`}>
            <div className="min-w-[500px] sm:min-w-[600px]">
                <div className="animate-in fade-in duration-300">
                  <div className={`grid grid-cols-3 p-3 sm:p-4 border-b ${theme.border} bg-black/20 ${theme.fontMono} text-[10px] sm:text-xs font-bold uppercase tracking-wider ${theme.accent}`}>
                    <div>Service Category</div>
                    <div>Support Type</div>
                    <div>Skill Type</div>
                  </div>
                  <div className={`divide-y ${theme.border}`}>
                    {catalogData.map((row, i) => (
                      <div key={i} className={`grid grid-cols-3 p-3 sm:p-4 hover:bg-white/5 transition-colors text-[11px] sm:text-xs md:text-sm ${theme.text}`}>
                        <div className="pr-2 sm:pr-4">{row.cat}</div>
                        <div className="pr-2 sm:pr-4 opacity-80">{row.type}</div>
                        <div className="opacity-80">{row.skill}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const theme = useContext(ThemeContext);
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: "How does Iridium manage global IT deployments?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { q: "What are your standard response times for on-site support?", a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { q: "Do you offer localized warehousing in Africa?", a: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida." },
    { q: "How do you handle hardware disposal and data wiping?", a: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." }
  ];

  return (
    <section id="faq-section" className={`py-12 md:py-24 px-4 md:px-6 border-t ${theme.border} bg-black/5 w-full`}>
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center tracking-tight ${theme.text}`}>Frequently Asked Questions</h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border ${theme.border} ${theme.bgCard} rounded-xl overflow-hidden transition-all duration-300`}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className={`font-bold text-sm sm:text-base md:text-lg pr-4 ${theme.text}`}>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-yellow-400' : theme.textMuted}`} />
              </button>
              <div className={`grid transition-all duration-300 ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className={`p-4 sm:p-6 pt-0 text-xs sm:text-sm md:text-base leading-relaxed ${theme.textMuted}`}>
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ setPage, setTargetSection }) => {
  const theme = useContext(ThemeContext);

  const handleServiceClick = (id) => {
    setTargetSection(id);
    setPage('about');
  };

  return (
    <div className="animate-in fade-in duration-700 w-full">
      <section className={`min-h-[calc(100vh-80px)] px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center items-center text-center w-full`}>
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" 
            alt="Data Center Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.name === 'Dark' ? 'from-[#05000a]/80 via-[#0f001f]/60 to-[#020005]/95' : 'from-violet-950/80 via-violet-900/60 to-indigo-950/95'}`}></div>
        </div>

        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-[200px] sm:w-[300px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[600px] bg-violet-600/20 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_10s_ease-in-out_infinite] z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-yellow-500/10 rounded-full blur-[80px] md:blur-[120px] animate-[pulse_8s_ease-in-out_infinite_alternate] z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10 w-full py-12 md:py-20 flex flex-col items-center">
          <div className={`inline-flex items-center gap-1.5 sm:gap-3 md:gap-4 mb-6 md:mb-8 px-3 py-2 sm:px-5 sm:py-2.5 border ${theme.border} ${theme.bgCard} rounded-full text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] shadow-xl backdrop-blur-md ${theme.text} max-w-[95vw]`}>
            <span className={`${theme.accent} drop-shadow-md whitespace-nowrap`}>Rare.</span>
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current opacity-40 shrink-0"></span>
            <span className={`${theme.accent} drop-shadow-md whitespace-nowrap`}>Resilient.</span>
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current opacity-40 shrink-0"></span>
            <span className={`${theme.accent} drop-shadow-md whitespace-nowrap`}>Reliable.</span>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[1.05] mb-4 sm:mb-6 md:mb-8 ${theme.text}`}>
            Elemental IT.<br/>
            <span className="opacity-40">Global Infrastructure.</span>
          </h1>
          
          <p className={`text-sm sm:text-base md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed px-2 sm:px-4 lg:px-0 ${theme.textMuted}`}>
            End-to-end hardware and software lifecycle management. Precision-engineered IT support, from dedicated Hands & Feet to Professional Staffing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button onClick={() => setPage('contact')} className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 text-sm md:text-base font-bold uppercase tracking-wide rounded-sm transition-all hover:scale-105 active:scale-95 text-center ${theme.accentBg}`}>
              Contact Us Now
            </button>
            <button onClick={() => setPage('about')} className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 text-sm md:text-base font-bold uppercase tracking-wide rounded-sm border ${theme.border} ${theme.bgCard} ${theme.text} hover:bg-white/10 transition-all active:scale-95`}>
              Discover Iridium
            </button>
          </div>
        </div>
      </section>

      <section className={`py-12 md:py-24 px-4 md:px-6 border-t ${theme.border} w-full`}>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className={`${theme.fontMono} text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest ${theme.textMuted} mb-8 md:mb-12 flex items-center justify-center md:justify-start gap-3 sm:gap-4 text-center md:text-left`}>
            <span className={`hidden md:block w-8 h-px bg-current opacity-30`}></span> Complete Infrastructure Ecosystem
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-8 w-full">
            {[
              { id: 'onsite', title: 'On-Site IT Support', icon: Wrench, desc: 'Rapid response break-fix, comprehensive IMAC services, and 24x7 Help Desk ensuring your physical presence needs are met.' },
              { id: 'network', title: 'Network & EUC Support', icon: Server, desc: 'Holistic infrastructure support ranging from localized workplace endpoints to global SD-WAN and Datacenter deployments.' },
              { id: 'logistics', title: 'Logistics Solutions', icon: Package, desc: 'Global warehousing, strict RMA handling, and secure last-mile customs clearance delivery for your physical assets.' },
              { id: 'professional', title: 'Professional Services & Staffing', icon: Users, desc: 'Scalable managed IT staffing spanning entry-level engineers to SMEs across all domains for project or long-term needs.' }
            ].map((svc, i) => (
              <button 
                key={i} 
                onClick={() => handleServiceClick(svc.id)} 
                className={`text-left p-6 md:p-10 border ${theme.border} ${theme.bgCard} ${theme.hover} rounded-xl md:rounded-2xl transition-all duration-300 transform hover:shadow-xl group flex flex-col h-full w-full`}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
                  <svc.icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-colors shrink-0 ${theme.accent}`} />
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-auto opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 sm:-translate-x-4 group-hover:translate-x-0 shrink-0 ${theme.accent}`} />
                </div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 ${theme.text}`}>{svc.title}</h3>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${theme.textMuted}`}>{svc.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      <GlobalFootprintSection />
      <DataMatrixSection />
      <FAQSection />
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
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-5 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-sm sm:text-base md:text-lg`}>
            Our core competency involves providing swift and reliable physical presence. We ensure your datacenters, offices, and end-user locations are continuously operational.
          </p>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 md:gap-8">
              <div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>IMAC Services</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                  {[
                    'Site readiness & physical site surveys',
                    'Wireless site surveys & audits',
                    'Hardware installation & configuration',
                    'Cable management & organization',
                    'Asset recovery & shipping',
                    'Project-based deployments'
                  ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                </ul>
              </div>
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>Break Fix Support</h4>
                  <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                    {[
                      'Rigorous troubleshooting and diagnostics',
                      'SLA: 4Hrs / Same Day & NBD',
                      '24x7 coverage with BGV named engineers'
                    ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className={`block w-full min-h-[150px] sm:min-h-[200px] h-[200px] sm:h-[250px] lg:col-span-1 rounded-lg sm:rounded-xl border ${theme.border} overflow-hidden relative mt-2 sm:mt-4 lg:mt-0`}>
               <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop" alt="Structured Cabling" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      title: 'Network & DC Support',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-5 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-sm sm:text-base md:text-lg`}>
            Architecture support scaling from localized EUC setups to global Datacenter and Enterprise Network infrastructures.
          </p>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 md:gap-8">
              <div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>Network & Security</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                   {['WAN/LAN assessment', 'LLD & HLD Planning', 'SD-WAN Deployment', 'Wi-Fi support', 'Cybersecurity'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                </ul>
              </div>
              <div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>Cloud & EUC</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                   {['DC Infrastructure assessment', 'Maintenance and build-out', 'Desktop/Laptop solutions', 'AV Conferencing'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                </ul>
              </div>
            </div>
            <div className={`block w-full min-h-[150px] sm:min-h-[200px] h-[200px] sm:h-[250px] lg:col-span-1 rounded-lg sm:rounded-xl border ${theme.border} overflow-hidden relative mt-2 sm:mt-4 lg:mt-0`}>
               <img src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=2000&auto=format&fit=crop" alt="Data Center Racks" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'logistics',
      title: 'Logistics & WHS Solutions',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-5 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-sm sm:text-base md:text-lg`}>
            We manage the entire physical lifecycle of your assets, operating forward stocking locations and overseeing complex global fulfillments.
          </p>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 md:gap-8">
              <ul className={`space-y-2 sm:space-y-3 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                {[
                  'Spare & RMA management',
                  'Forward/Reverse logistics (DDP)',
                  'Global & localized warehousing',
                  'Pre-staging services'
                ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
              </ul>
              <ul className={`space-y-2 sm:space-y-3 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                {[
                  'Last-mile delivery with customs',
                  'Remote support & Site audits',
                  'Stock spares delivery'
                ].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
              </ul>
            </div>
            <div className={`block w-full min-h-[150px] sm:min-h-[200px] h-[200px] sm:h-[250px] lg:col-span-1 rounded-lg sm:rounded-xl border ${theme.border} overflow-hidden relative mt-2 sm:mt-4 lg:mt-0`}>
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" alt="IT Hardware Logistics and Staging" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'professional',
      title: 'Professional Services & Staffing',
      content: (
        <div className="animate-in slide-in-from-top-2 duration-300 space-y-5 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6">
          <p className={`${theme.textMuted} leading-relaxed text-sm sm:text-base md:text-lg`}>
            Deploying Practice Leaders, Architects, and Senior Engineers across IT & Telecom domains.
          </p>
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 md:gap-8">
              <div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>Engineering</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                   {['Presales & RFP Support', 'Architecture design', 'Network Optimization', 'Security Audits'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                </ul>
              </div>
              <div>
                <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${theme.accent}`}>Managed IT Staffing</h4>
                <ul className={`space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs md:text-sm ${theme.textMuted} list-none`}>
                   {['Global recruitment methodology', 'Contract-to-hire & Search', 'FTE Engineers (L0-L4)', 'Compliance & Risk mgmt'].map((item, i) => <li key={i} className="flex gap-2"><Check className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accent}`}/> <span>{item}</span></li>)}
                </ul>
              </div>
            </div>
            <div className={`block w-full min-h-[150px] sm:min-h-[200px] h-[200px] sm:h-[250px] lg:col-span-1 rounded-lg sm:rounded-xl border ${theme.border} overflow-hidden relative mt-2 sm:mt-4 lg:mt-0`}>
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" alt="IT Professionals Working" className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 pt-24 sm:pt-28 pb-12 sm:pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6 md:mb-8 ${theme.text}`}>Capabilities & Services</h1>
        <div className="space-y-3 sm:space-y-4 md:space-y-6 text-xs sm:text-sm md:text-base text-left md:text-center px-2 sm:px-0">
          <p className={`leading-relaxed ${theme.textMuted}`}>
            Iridium serves as a premier global IT Infrastructure Support organization, delivering managed field services, break-fix support, and consultancy across UAE, Africa, and India.
          </p>
          <p className={`leading-relaxed ${theme.textMuted}`}>
            We provide end-to-end IT infrastructure support encompassing hardware and software domains, from complex datacenters to diverse end-customer locations.
          </p>
          <p className={`text-sm sm:text-lg md:text-xl font-bold leading-relaxed ${theme.accent} pt-2 sm:pt-4`}>
            Explore our core practice areas below.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 w-full">
        {sections.map(sec => (
          <div key={sec.id} className={`border ${theme.border} ${theme.bgCard} rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-all duration-300 w-full`}>
            <button 
              onClick={() => toggle(sec.id)}
              className={`w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-black/10 transition-colors ${expanded === sec.id ? 'bg-black/10' : ''}`}
            >
               <h2 className={`text-base sm:text-lg md:text-2xl font-bold pr-2 ${expanded === sec.id ? theme.accent : theme.text}`}>{sec.title}</h2>
               <div className={`p-1 sm:p-1.5 md:p-2 rounded-full border shrink-0 ${theme.border} ${expanded === sec.id ? theme.accentBg : ''}`}>
                 <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 ${expanded === sec.id ? 'rotate-90 text-black' : theme.textMuted}`} />
               </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${expanded === sec.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
               <div className="overflow-hidden">
                 <div className="p-4 sm:p-5 md:p-6 pt-0 border-t border-inherit">
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
    <div className="animate-in fade-in duration-700 pt-24 sm:pt-28 pb-12 sm:pb-16 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4 ${theme.text}`}>Engage with Iridium</h1>
        <p className={`text-sm sm:text-base md:text-lg px-2 sm:px-0 ${theme.textMuted}`}>Global presence, local execution. Reach out to coordinate site surveys or staffing requests.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 w-full">
        <div className="space-y-6 md:space-y-8 w-full">
          <div className={`p-5 sm:p-6 md:p-8 border ${theme.border} ${theme.bgCard} rounded-lg sm:rounded-xl backdrop-blur-md w-full`}>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${theme.text}`}>Operating Headquarters</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4 w-full">
                <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-1 shrink-0 ${theme.accent}`} />
                <div className="w-full">
                  <p className={`${theme.textMuted} text-xs sm:text-sm md:text-base leading-relaxed break-words`}>
                    D78, 13 B Al Goze First, Adel Mohd Ali Jasin Al Marzouqi,<br/>
                    P.O. Box 25412, Dubai, United Arab Emirates
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 border-t border-inherit pt-4 sm:pt-6 w-full" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <Phone className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 ${theme.accent}`} />
                <a href="tel:+971567553646" className={`${theme.textMuted} text-xs sm:text-sm md:text-base hover:${theme.text} transition-colors break-words`}>+971 56 755 3646</a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 w-full">
                <Mail className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 ${theme.accent}`} />
                <a href="mailto:info@iridiumit.co" className={`${theme.textMuted} text-xs sm:text-sm md:text-base hover:${theme.text} transition-colors break-words`}>info@iridiumit.co</a>
              </div>
            </div>
          </div>

          <div className={`h-48 sm:h-64 md:h-[350px] rounded-lg sm:rounded-xl border ${theme.border} bg-black/10 relative overflow-hidden flex items-center justify-center w-full`}>
            <iframe 
              src="https://maps.google.com/maps?q=Al%20Quoz%201,%20Dubai,%20United%20Arab%20Emirates&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: theme.name === 'Dark' ? 'invert(90%) hue-rotate(180deg) contrast(85%)' : 'none', transition: 'filter 0.5s ease' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Iridium Office Location"
            ></iframe>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 w-full">
          {status === 'success' ? (
            <div className={`p-6 sm:p-8 md:p-10 border border-green-500/20 bg-green-500/5 rounded-lg sm:rounded-2xl text-center space-y-3 sm:space-y-4 animate-in zoom-in-95 duration-500 w-full`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-400" />
              </div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-green-400`}>Inquiry Submitted</h3>
              <p className={`${theme.textMuted} text-xs sm:text-sm md:text-base mb-4 sm:mb-6`}>A representative will contact you shortly.</p>
              <button onClick={() => setStatus('idle')} className={`mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider rounded-md border ${theme.border} ${theme.text} hover:bg-black/10 transition-all`}>
                New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`p-5 sm:p-6 md:p-8 border ${theme.border} ${theme.bgCard} rounded-lg sm:rounded-xl space-y-3 sm:space-y-4 backdrop-blur-md w-full`}>
              <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 ${theme.text}`}>Send an Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                <input required type="text" placeholder="First Name" className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
                <input required type="text" placeholder="Last Name" className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                <input required type="email" placeholder="Email" className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
                <input required type="tel" placeholder="Phone" className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`} />
              </div>
              <select required className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.textMuted}`}>
                <option value="">Select Service...</option>
                <option value="Infrastructure">Infrastructure Support</option>
                <option value="Staffing">Staffing</option>
                <option value="Logistics">Logistics</option>
                <option value="Other">Other</option>
              </select>
              <textarea required placeholder="Project Details..." rows="3" className={`w-full p-2.5 sm:p-3 bg-black/10 border ${theme.border} rounded-md text-xs sm:text-sm focus:outline-none focus:border-yellow-400 ${theme.text}`}></textarea>
              <button type="submit" disabled={status === 'submitting'} className={`w-full py-3 sm:py-4 text-sm sm:text-base font-bold uppercase tracking-wide rounded-md transition-all flex items-center justify-center gap-2 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed grayscale' : `hover:scale-[1.01] active:scale-95 ${theme.accentBg}`}`}>
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
    <footer className={`py-10 sm:py-12 md:py-16 px-4 sm:px-6 border-t ${theme.border} bg-black/40 transition-colors duration-500 w-full`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 justify-between items-center md:items-start text-center md:text-left w-full">
        <div className="flex flex-col gap-4 sm:gap-6 md:w-1/3 items-center md:items-start w-full">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <IridiumLogo className="h-6 w-6 sm:h-8 sm:w-8 drop-shadow-md" />
            <span className={`text-lg sm:text-xl font-black tracking-tight ${theme.text}`}>IRIDIUM</span>
          </div>
          <div className={`flex flex-col gap-3 sm:gap-4 text-[11px] sm:text-xs md:text-sm w-full ${theme.textMuted}`}>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 w-full">
              <Phone className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${theme.accent}`} />
              <a href="tel:+971567553646" className="hover:text-white transition-colors break-words">+971 56 755 3646</a>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 w-full">
              <Mail className={`w-3 h-3 sm:w-4 sm:h-4 shrink-0 ${theme.accent}`} />
              <a href="mailto:info@iridiumit.co" className="hover:text-white transition-colors break-words">info@iridiumit.co</a>
            </div>
            <div className="flex items-start justify-center md:justify-start gap-2 sm:gap-3 w-full">
              <MapPin className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 shrink-0 ${theme.accent}`} />
              <span className="leading-relaxed max-w-[250px] break-words">
                D78, 13 B Al Goze First, Adel Mohd Ali Jasin Al Marzouqi, P.O. Box 25412, Dubai, United Arab Emirates
              </span>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col gap-3 sm:gap-4 w-full">
          <h4 className={`text-base sm:text-lg font-bold ${theme.accent}`}>Navigation</h4>
          <ul className={`flex flex-col gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm font-medium ${theme.textMuted}`}>
            <li><button onClick={() => setPage('home')} className={`hover:${theme.accent} transition-colors`}>Home</button></li>
            <li><button onClick={() => setPage('about')} className={`hover:${theme.accent} transition-colors`}>About</button></li>
            <li><button onClick={() => setPage('contact')} className={`hover:${theme.accent} transition-colors`}>Contact Us</button></li>
          </ul>
        </div>

        <div className="md:w-1/3 flex flex-col gap-3 sm:gap-4 w-full max-w-xs mx-auto md:mx-0">
          <h4 className={`text-base sm:text-lg font-bold ${theme.accent}`}>Connect</h4>
          <div className="flex flex-col gap-2 w-full">
            <a 
              href="https://wa.me/971567553646" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center md:justify-start gap-2 sm:gap-3 p-2 sm:p-2.5 border ${theme.border} rounded-lg hover:bg-black/40 transition-all text-[11px] sm:text-xs ${theme.text} w-full`}
            >
               <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-green-500 shrink-0" xmlns="http://www.w3.org/2000/svg">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
               </svg> WhatsApp
            </a>
            <a 
              href="https://www.linkedin.com/company/iridiumit/about/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center md:justify-start gap-2 sm:gap-3 p-2 sm:p-2.5 border ${theme.border} rounded-lg hover:bg-black/40 transition-all text-[11px] sm:text-xs ${theme.text} w-full`}
            >
               <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 shrink-0" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <div className={`mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t ${theme.border} text-[9px] sm:text-[10px] md:text-xs ${theme.fontMono} ${theme.textMuted} text-center opacity-40 w-full`}>
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
      <div className={`min-h-screen max-w-full overflow-x-hidden ${activeTheme.bg} ${activeTheme.fontBase} transition-colors duration-700 selection:bg-yellow-400/30 selection:text-white outline-none`}>
        <Navbar 
          currentTheme={currentTheme} 
          setTheme={setCurrentTheme} 
          currentPage={currentPage}
          setPage={handlePageChange}
        />
        
        <main className="pt-20 min-h-[calc(100vh-80px)] w-full">
          {currentPage === 'home' && <Home setPage={setCurrentPage} setTargetSection={setTargetSection} />}
          {currentPage === 'about' && <About targetSection={targetSection} />}
          {currentPage === 'contact' && <Contact />}
        </main>

        <Footer setPage={handlePageChange} />
      </div>
    </ThemeContext.Provider>
  );
}