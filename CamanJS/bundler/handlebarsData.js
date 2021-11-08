const handlebarsHelperInc = (value, options) => {
  const newVal = parseInt(value) + 1;
  return `${newVal <= 9 ? "0" : ""}${newVal}`;
};

const getHomeUrlFactory = (isHomeView) => {
  return () => {
    return isHomeView ? "" : "/";
  };
};

const handlebarsDataCompile = {
  baseUrl: "/",
  clientsList: [
    { name: "Top Cable" },
    { name: "Ibericus" },
    { name: "Bold Workplanner" },
    { name: "Katia Fabrics" },
    { name: "Dentsply" },
    { name: "Smart City Link" },
    { name: "Notico Deliv" },
    { name: "Figueras" },
    { name: "Easy Tech" },
    { name: "Ajuntament del Prat" },
    { name: "La Cubana" },
    { name: "Movistar" },
    { name: "Fytisa" },
    { name: "Texfel" },
    { name: "HpcNow!" },
    { name: "Doitnow" },
    { name: "Microptic" },
    { name: "Visual Seating" },
    { name: "Font Packaging Group" },
    { name: "Jané" },
    { name: "Luxbag" },
    { name: "Emzer" },
    { name: "Danone" },
    { name: "Henkel" },
    { name: "In store Media" },
    { name: "UOC" },
    { name: "GCO" },
    { name: "Bestplant" },
    { name: "Mediadata TV" },
    { name: "Emotion Experience" },
    { name: "Isard Sat" },
    { name: "Tobelean" },
    { name: "Parkin Barcelona" },
    { name: "BSV" },
    { name: "Uriach" },
    { name: "Cre-a" },
    { name: "Ajuntament el Vendrell" },
    { name: "Termix" },
    { name: "Caprabo" },
    { name: "Marina BCN" },
  ],
  highlightedProjects: [
    {
      name: "Bestplant",
      description: "Brand Design / UI/UX Design / Web / App Development",
      snap: "imgs/bestplant.jpg",
      link: "/projects/bestplant.html",
    },
    {
      name: "Bold Workplanner",
      description: "Brand Design / UI/UX Design / Website Development",
      snap: "imgs/bold.jpg",
      link: "/projects/boldworkplanner.html",
    },
    {
      name: "Doitnow",
      description: "Brand Design / UI/UX Design / Website Development",
      snap: "imgs/doitnow.jpg",
      link: "/projects/doitnow.html",
    },
    {
      name: "Emzer",
      description:
        "Brand Design / UI/UX Design / Website / Development / 3D Concept",
      snap: "imgs/emzer.jpg",
      link: "/projects/emzer.html",
    },
    {
      name: "Gencat",
      description: "Motion Graphics Design",
      snap: "imgs/gencat.jpg",
      link: "/projects/gencat.html",
    },
    {
      name: "ParkinBCN",
      description: "Brand Design / Motion Graphics",
      snap: "imgs/parkin.jpg",
      link: "/projects/parkinbcn.html",
    },
    {
      name: "Nissan",
      description: "Grabación / Edición / Postproducción / Motion Graphics",
      snap: "imgs/nissan.jpg",
      link: "/projects/nissan.html",
    },
    {
      name: "Notico deliv",
      description: "Brand Design / UI/UX Design / Website development",
      snap: "imgs/notico.jpg",
      link: "/projects/noticodeliv.html",
    },
    {
      name: "Palau Güell",
      description:
        "Brand Design / UI/UX Design / App development / Instalación y Montaje",
      snap: "imgs/palauguell.jpg",
      link: "/projects/palauguell.html",
    },
    {
      name: "UPC",
      description: "Brand Design / UI/UX Design / Web / App Development",
      snap: "imgs/upc.jpg",
      link: "/projects/upc.html",
    },
    {
      name: "Tobelean",
      description: "Brand Design / UI/UX Design / Software Development",
      snap: "imgs/tobelean.jpg",
      link: "/projects/tobelean.html",
    },
  ],
  history: [
    {
      Ano: 2021,
      Cliente: "Upc Plus",
      Proyecto: "Desarrollo App Híbrida",
      Servicios: "Diseño y Desarrollo App Híbrida",
    },
    {
      Ano: 2021,
      Cliente: "Ibericus",
      Proyecto: "Ecommerce",
      Servicios: "Diseño UI/UX, Desarrollo web ecommerce",
    },
    {
      Ano: 2021,
      Cliente: "Bold Workplanner",
      Proyecto: "Web Landing Page",
      Servicios: "Branding corporativo, Diseño UI/UX y desarrollo web",
    },
    {
      Ano: 2021,
      Cliente: "Top Cable",
      Proyecto: "Webapp Metal Prices",
      Servicios: "Diseño UI/UX y Desarrollo webapp",
    },
    {
      Ano: 2021,
      Cliente: "Aj. Sant Margarida i els Monjos",
      Proyecto: "APP Instalación táctil (exposición temporal)",
      Servicios: "Diseño UI/UX y Desarrollo App",
    },
    {
      Ano: 2020,
      Cliente: "Doitnow",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2020,
      Cliente: "Top Cable",
      Proyecto: "Proyecto Web DTTS",
      Servicios: "Diseño UI/UX y maquetación web",
    },
    {
      Ano: 2020,
      Cliente: "Top Cable",
      Proyecto: "Motion Graphics Parkings EVC",
      Servicios: "Diseño y animación de contenidos 2D/3D",
    },
    {
      Ano: 2020,
      Cliente: "Sabentis Prime",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2020,
      Cliente: "Bestplant",
      Proyecto: "Desarrollo Software PM",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2020,
      Cliente: "Top Cable",
      Proyecto: "Diseño de Catálogo Solar",
      Servicios: "Diseño editorial",
    },
    {
      Ano: 2020,
      Cliente: "Figueras Seating Europe",
      Proyecto: "Desarrollo Configurador (Web GL)",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2020,
      Cliente: "Notico Deliv",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2020,
      Cliente: "Uoc",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación de contenidos 2D",
    },
    {
      Ano: 2020,
      Cliente: "HpcNow!",
      Proyecto: "Adaptaciones branding corporativo",
      Servicios: "Diseño de adaptaciones para diversos formatos online/offline",
    },
    {
      Ano: 2019,
      Cliente: "Smart City Link",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2019,
      Cliente: "La Cubana",
      Proyecto: "Landing Page Producto",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2019,
      Cliente: "Inditex",
      Proyecto: "Motion Graphics RFID",
      Servicios: "Diseño y animación de contenidos 2D",
    },
    {
      Ano: 2019,
      Cliente: "Upc",
      Proyecto: "Desarrollo APP UPC Plus",
      Servicios: "Diseño UI/UX, Desarrollo APP",
    },
    {
      Ano: 2019,
      Cliente: "Dentsply",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación de contenidos 2D/3D",
    },
    {
      Ano: 2019,
      Cliente: "Top Cable",
      Proyecto: "Campaña Inbound EVC",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2019,
      Cliente: "Ajuntament Santa Margarida Monjos",
      Proyecto: "Desarrollo APP Instalación Expo",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2019,
      Cliente: "Bestplant",
      Proyecto: "Diseño Stand Advanced Factories",
      Servicios: "Diseño gráfico Stand",
    },
    {
      Ano: 2019,
      Cliente: "Top Cable",
      Proyecto: "Motion Graphics - Producto Toxfree",
      Servicios: "Diseño y animación de contenidos 2D/3D",
    },
    {
      Ano: 2019,
      Cliente: "HpcNow!",
      Proyecto: "Web Corporativa HPCKP",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2019,
      Cliente: "Katia Fabrics",
      Proyecto: "Motion Graphics - Katia Academy",
      Servicios: "Diseño y animación de contenidos 2D/3D",
    },
    {
      Ano: 2019,
      Cliente: "Bestplant",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2019,
      Cliente: "Texfel",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2018,
      Cliente: "Top Cable",
      Proyecto: "Desarrollo APP Metal Prices",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2018,
      Cliente: "Microptic",
      Proyecto: "Video SCA Scope",
      Servicios:
        "Grabación y montaje, Diseño y animación Motion Graphics 2D/3D",
    },
    {
      Ano: 2018,
      Cliente: "Visual Seating",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2018,
      Cliente: "Bold Workplanner",
      Proyecto: "Web corporativa de producto",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2018,
      Cliente: "Katia Fabrics",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2018,
      Cliente: "Figueras Seating Solutions",
      Proyecto: "APP Configurador 3D de producto",
      Servicios: "Diseño UI/UX, Desarrollo APP",
    },
    {
      Ano: 2018,
      Cliente: "Font Packaging Group",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación de contenidos 2D",
    },
    {
      Ano: 2018,
      Cliente: "Bestplant",
      Proyecto: "Desarrollo Software Pantallas",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2018,
      Cliente: "Emzer",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, 3D Producto, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2018,
      Cliente: "Fytisa",
      Proyecto: "Diseño Stand  Techtextil",
      Servicios: "Diseño gráfico Stand",
    },
    {
      Ano: 2017,
      Cliente: "Luxbag",
      Proyecto: "Web Corporativa",
      Servicios: "Desarrollo web",
    },
    {
      Ano: 2017,
      Cliente: "Gcon4",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2017,
      Cliente: "Top Cable",
      Proyecto: "Diseño Stand feria EFICAM",
      Servicios: "Diseño gráfico Stand",
    },
    {
      Ano: 2017,
      Cliente: "Henkel",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación de contenidos 2D",
    },
    {
      Ano: 2017,
      Cliente: "Siemprevivas",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2017,
      Cliente: "Colegio Molina",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2017,
      Cliente: "Gco",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2017,
      Cliente: "Top Cable",
      Proyecto: "Desarrollo APP Topmatic",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2017,
      Cliente: "Bold App",
      Proyecto: "Web corporativa de producto",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2017,
      Cliente: "In Store Media",
      Proyecto: "Galería Multimedia",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "GCON4",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Aquarius - Emotion Experience",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación de contenidos 2D",
    },
    {
      Ano: 2016,
      Cliente: "Top Cable",
      Proyecto: "Campaña CPR",
      Servicios:
        "Diseño logotipo, diseño editorial, diseño y animación Motion Graphics",
    },
    {
      Ano: 2016,
      Cliente: "Movistar - Mediadata Tv",
      Proyecto: "Desarrollo APP Movistar Deportes",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Dr. Guillem Saló",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Isard Sat",
      Proyecto: "Web Corporativa",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Top Cable",
      Proyecto: "Web Corporativa Bricable",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Onfan",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Tobelean",
      Proyecto: "Desarrollo Software",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2016,
      Cliente: "Parkin Barcelona",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2016,
      Cliente: "Dentsply",
      Proyecto: "Diseño Packaging",
      Servicios: "Diseño editorial",
    },
    {
      Ano: 2015,
      Cliente: "Aynes Abril y Baher",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2015,
      Cliente: "Top Cable",
      Proyecto: "Diseño Packaging",
      Servicios: "Diseño editorial",
    },
    {
      Ano: 2015,
      Cliente: "New mobility",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2015,
      Cliente: "Bsv",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2015,
      Cliente: "Uriach - Aquilea",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2015,
      Cliente: "Cre-a (Grupo Godó)",
      Proyecto: "Comunicación 360º",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2015,
      Cliente: "Vallestour",
      Proyecto: "E-commerce / Comunicación 360º",
      Servicios: "Diseño UI/UX, Desarrollo web ecommerce",
    },
    {
      Ano: 2015,
      Cliente: "La Cubana",
      Proyecto: "Comunicación 360º",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2015,
      Cliente: "Palau Güell",
      Proyecto: "Instalación Interactiva",
      Servicios: "Diseño UI/UX, Desarrollo aplicación interactiva",
    },
    {
      Ano: 2015,
      Cliente: "Servigrup",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2015,
      Cliente: "Ajuntament El Vendrell",
      Proyecto: "Web Portal de notícies",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2015,
      Cliente: "Playtime Movies",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2015,
      Cliente: "Top Cable",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2014,
      Cliente: "Ajuntament del Prat de Llobregat",
      Proyecto: "Campanya Fira Avícola",
      Servicios: "Instalación Stand Multimedia (Chroma)",
    },
    {
      Ano: 2014,
      Cliente: "Acm (Associació Cat de Municipis)",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2014,
      Cliente: "Top Cable",
      Proyecto: "Campaña Navidad",
      Servicios: "Creatividad, Diseño UI/UX, Desarrollo web, Diseño editorial",
    },
    {
      Ano: 2014,
      Cliente: "Dentsply",
      Proyecto: "Video Salas de espera",
      Servicios: "Infografias 3D, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2014,
      Cliente: "Luxbag",
      Proyecto: "Web Corporativa",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2014,
      Cliente: "Nakawe Project",
      Proyecto: "Comunicación 360º",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2014,
      Cliente: "Ajuntament del Prat de Llobregat",
      Proyecto: "Campaña FEM PLAÇA",
      Servicios: "Branding campaña, Diseño editorial, Diseño de exposición",
    },
    {
      Ano: 2014,
      Cliente: "Iwall in Shop",
      Proyecto: "Campaña Iwall Editorial",
      Servicios: "Creatividad y diseño gráfico de campaña",
    },
    {
      Ano: 2014,
      Cliente: "Ani",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2014,
      Cliente: "Gourmandise",
      Proyecto: "Web Corporativa",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2014,
      Cliente: "Uriach",
      Proyecto: "Video Corporativo",
      Servicios:
        "Grabación y montaje, Diseño y animación Motion Graphics 2D/3D",
    },
    {
      Ano: 2014,
      Cliente: "Focusonemotions",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2014,
      Cliente: "Termix",
      Proyecto: "Realización / Motion Graphics",
      Servicios: "Grabación y montaje, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "Marina Bcn (Grupo Godó)",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2013,
      Cliente: "Caprabo",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "Esteve",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "Topcable",
      Proyecto: "Campaña Navidad",
      Servicios: "Creatividad, Diseño UI/UX, Desarrollo web, Diseño editorial",
    },
    {
      Ano: 2013,
      Cliente: "Dentsply",
      Proyecto: "Motion Graphics Dentsply Implants",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "BBraun",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "Stada",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2013,
      Cliente: "Ajuntament del Prat de Llobregat",
      Proyecto: 'Campaña "El meu Lloc al Prat',
      Servicios: "Creatividad, Diseño UI/UX, Desarrollo web, Diseño editorial",
    },
    {
      Ano: 2012,
      Cliente: "Nissan",
      Proyecto: "Realización / Motion Graphics NISSAN Motorshow",
      Servicios: "Grabación y montaje, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "Festival Embassa't",
      Proyecto: "Realización / Motion Graphics",
      Servicios: "Grabación y montaje, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "Gencat (Generalitat de Catalunya)",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "Henkel",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "JANÉ",
      Proyecto: "Motion Graphics BABYCOOK",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "Fytisa",
      Proyecto: "Comunicación 360º",
      Servicios:
        "Branding corporativo, Diseño UI/UX, Desarrollo web , Diseño editorial",
    },
    {
      Ano: 2012,
      Cliente: "Danone",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2012,
      Cliente: "Ing Direct",
      Proyecto: "Digital Signage",
      Servicios: "Creatividad, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2011,
      Cliente: "Nestlé",
      Proyecto: "Digital Signage",
      Servicios: "Creatividad, Diseño y animación Motion Graphics",
    },
    {
      Ano: 2011,
      Cliente: "Gimage",
      Proyecto: "Digital Signage",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2011,
      Cliente: "JANÉ",
      Proyecto: "Motion Graphics NO COLIC",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2010,
      Cliente: "Aap",
      Proyecto: "Motion Graphics",
      Servicios: "Diseño y animación Motion Graphics",
    },
    {
      Ano: 2010,
      Cliente: "Ais sl",
      Proyecto: "Web Corporativa",
      Servicios: "Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2010,
      Cliente: "Fytisa",
      Proyecto: "Configurador APP Tapizados",
      Servicios: "Branding corporativo, Diseño UI/UX, Desarrollo web",
    },
    {
      Ano: 2010,
      Cliente: "D-Gira",
      Proyecto: "Desarrollo web",
      Servicios:
        "Creatividad, Branding corporativo, Desarrollo web, Diseño editorial",
    },
  ],
};

exports.handlebarsHelperInc = handlebarsHelperInc;
exports.getHomeUrlFactory = getHomeUrlFactory;
exports.handlebarsDataCompile = handlebarsDataCompile;
