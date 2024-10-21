const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

// Alternar el menú al hacer clic en el ícono de hamburguesa
hamburgerMenu.addEventListener("click", (e) => {
    document.body.classList.toggle("show-nav");
    e.stopPropagation(); // Evita el cierre inmediato si haces clic en la hamburguesa
});

// Cerrar el menú si se hace clic fuera del menú o la hamburguesa
document.addEventListener("click", (e) => {
    const isMenuOpen = document.body.classList.contains("show-nav");

    if (isMenuOpen && !navLinks.contains(e.target) && e.target !== hamburgerMenu) {
        document.body.classList.remove("show-nav");
    }
});

// Comunas por región
const comunasPorRegion = {
    "Región Metropolitana de Santiago": [
        "Colina",
        "Lampa",
        "Til Till",
        "Pirque",
        "Puente Alto",
        "San José de Maipo",
        "Buin",
        "Calera de Tango",
        "Paine",
        "San Bernardo",
        "Alhué",
        "Curacaví",
        "María Pinto",
        "Melipilla",
        "San Pedro",
        "Cerrillos",
        "Cerro Navia",
        "Conchalí",
        "El Bosque",
        "Estación Central",
        "Huechuraba",
        "Independencia",
        "La Cisterna",
        "La Granja",
        "La Florida",
        "La Pintana",
        "La Reina",
        "Las Condes",
        "Lo Barnechea",
        "Lo Espejo",
        "Lo Prado",
        "Macul",
        "Maipú",
        "Ñuñoa",
        "Pedro Aguirre Cerda",
        "Peñalolén",
        "Providencia",
        "Pudahuel",
        "Quilicura",
        "Quinta Normal",
        "Recoleta",
        "Renca",
        "San Miguel",
        "San Joaquín",
        "San Ramón",
        "Santiago",
        "Vitacura",
        "El Monte",
        "Isla de Maipo",
        "Padre Hurtado",
        "Peñaflor",
        "Talagante"
    ],
    "Región de Tarapacá": [
        "Iquique",
        "Pozo Almonte",
        "Alto Hospicio",
        "Pica",
        "Huara",
        "La Tirana",
        "Yape",
        "Pisagua"
    ],
    "Región de Arica y Parinacota": [
        "Arica"
    ],
    "Región de Antofagasta": [
        "Maria Elena",
        "Mejillones",
        "Taltal",
        "Sierra Gorda",
        "San Pedro de Atacama",
        "La Negra",
        "Calama",
        "Antofagasta",
        "Tocopilla"
    ],
    "Región de Atacama": [
        "Caldera",
        "Chanaral",
        "Paipote",
        "Tierra Amarilla",
        "El Salvador",
        "Diego de Almagro",
        "Huasco",
        "Freirina",
        "Bahia Inglesa",
        "Copiapó",
        "Vallenar"
    ],
    "Región de Coquimbo": [
        "Vicuna",
        "Guanaqueros",
        "Sotaqui",
        "El Paqui",
        "Monte Patria",
        "Chanaral Alto",
        "Combarbala",
        "Illapel",
        "Salamanca",
        "Andacollo",
        "La Higuera",
        "Canela",
        "Punitaqui",
        "Camarico",
        "Las Tacas",
        "Tierras Blancas",
        "Pichidangui",
        "Quilimari",
        "Guanguali",
        "Huentelauquen",
        "Altovalsol",
        "Gabriela Mistral",
        "La Marquesa",
        "El Molle",
        "El Tambo",
        "Los Hornos",
        "Las Dunas",
        "Puerto Velero",
        "El Penon",
        "Tambillo",
        "Huamalata",
        "Los Vilos",
        "Socos",
        "Cerrillos de Tamaya",
        "Pichicuy",
        "Caimanes",
        "Chillepin",
        "La Serena",
        "Coquimbo",
        "Ovalle"
    ],
    "Región de Valparaíso": [
        "Papudo",
        "Zapallar",
        "Llay Llay",
        "El Melon",
        "Catemu",
        "San Esteban",
        "Catapilco",
        "Las Cruces",
        "Cachagua",
        "El Tabo",
        "Maitencillo",
        "Isla Negra",
        "Puchuncavi",
        "San Sebastian",
        "Rinconada",
        "La Cruz",
        "Hijuelas",
        "Curauma",
        "Laguna Verde",
        "Belloto",
        "Quintero",
        "Santa Maria",
        "Penablanca",
        "Nogales",
        "Calle Larga",
        "Algarrobo",
        "Cartagena",
        "Llolleo",
        "Rocas de Santo Domingo",
        "Artificio",
        "Horcon",
        "Panqueue",
        "Putaendo",
        "La Dormida",
        "Petorca",
        "Quintay",
        "Las Ventanas",
        "Placilla",
        "Alicahue",
        "Punta de Tralca",
        "Matanzas",
        "Lagunillas",
        "Las Dichas",
        "El Sauce",
        "Tabolango",
        "San Pedro de Quillota",
        "Ocoa",
        "Boco de Quillota",
        "San Isidro de Quillota",
        "La Palma de Quillota",
        "La Retuca",
        "La Ligua",
        "Quilpue",
        "Longotoma",
        "San Antonio",
        "Olmue",
        "El Quisco",
        "La Calera",
        "Renaca",
        "Valparaíso",
        "Viña del Mar",
        "Villa Alemana",
        "Quillota",
        "San Felipe",
        "Los Andes",
        "Limache",
        "Concon",
        "Casablanca",
        "El Convento"
    ],
    "Región del Libertador General Bernardo O’Higgins": [
        "Graneros",
        "Requinoa",
        "Donihue",
        "Olivar Alto",
        "Codegua",
        "Coinco",
        "Lo Miranda",
        "Malloa",
        "Pelequen",
        "Las Cabras",
        "Pichidegua",
        "Peumo",
        "Quinta de Tilcoco",
        "San Vicente de Taguatagua",
        "Chimbarongo",
        "Cunaco",
        "Chepica",
        "Nancagua",
        "Rosario",
        "Palmilla",
        "Placilla",
        "San Francisco de Mostazal",
        "Coltauco",
        "Pichilemu",
        "La Estrella",
        "Litueche",
        "Coya",
        "Sewell",
        "Olivar Bajo",
        "Machali",
        "Santa Cruz",
        "Navidad",
        "Rancagua",
        "Rengo",
        "San Fernando"
    ],
    "Región del Maule": [
        "Maule",
        "San Clemente",
        "San Javier",
        "Villa Alegre",
        "Parral",
        "Teno",
        "Sagrada Familia",
        "Rio Claro",
        "Hualane",
        "Licanten",
        "Rauco",
        "Romeral",
        "Pelarco",
        "Pencahue",
        "San Rafael",
        "Colbun",
        "Yerbas Buenas",
        "Longavi",
        "Los Niches",
        "Rauquen",
        "Bobadilla",
        "Culenar",
        "Constitucion",
        "Cauquenes",
        "Molina",
        "Talca",
        "Curicó",
        "Linares"
    ],
    "Región del Biobío": [
        "Cabrero",
        "Carampangue",
        "Hualpencillo",
        "Curanilahue",
        "Laja",
        "Lebu",
        "Los Alamos",
        "Lota",
        "Mulchen",
        "Nacimiento",
        "Santa Barbara",
        "Arauco",
        "Yumbel",
        "El Carmen Chillan",
        "Lirquen",
        "Yungay",
        "Bulnes",
        "Pemuco",
        "Florida",
        "Colcura",
        "Contulmo",
        "Dichato",
        "Ranguelmo",
        "Hualqui",
        "Laraquete",
        "Monte Aguila",
        "Santa Clara",
        "Tucapel",
        "Nipas",
        "Trehuaco",
        "Viluco",
        "Charrua",
        "Campanario",
        "Ramadillas",
        "Vegas de Itata",
        "Cholguan",
        "Tanilvoro",
        "Rucapequen",
        "Quinchamali",
        "Pueblo Seco",
        "Nahueltoro",
        "Minas del Prado",
        "Cachapoal",
        "Los Horcones",
        "Coliumo",
        "Copiulemu",
        "Meipo",
        "Perales",
        "Guarilihue",
        "Checura",
        "Leonera",
        "Filomena",
        "Toroico",
        "Los Tilos",
        "Quillaitun",
        "Cerro Alto",
        "La Araucana",
        "Tres Pinos",
        "Antihuala",
        "Villa Los Rios",
        "Tome",
        "Penco",
        "Cañete",
        "Coronel",
        "Chiguayante",
        "Concepción",
        "Talcahuano",
        "Millantu",
        "Santa Fe",
        "Hualpen",
        "Los Angeles",
        "San Pedro de la Paz"
    ],
    "Región de La Araucanía": [
        "Temuco",
        "Pucon",
        "Villarrica",
        "Cajon",
        "Carahue",
        "Collipulli",
        "Curacautin",
        "Freire",
        "Gorbea",
        "Lautaro",
        "Loncoche",
        "los Sauces",
        "Nueva Imperial",
        "Pitrufquen",
        "Angol",
        "Traiguen",
        "Victoria",
        "Vilcun",
        "Galvarino",
        "Puerto Saavedra",
        "Cholchol",
        "Cunco",
        "Teodoro Schmidt",
        "Lonquimay",
        "Puren",
        "Tolten",
        "Lumaco",
        "Conaripe",
        "Licanray",
        "Capitan Pastene",
        "Quepe",
        "Padre Las Casas",
        "Labranza",
        "Metrenco",
        "Huiscapi",
        "San Ramon",
        "Quitratue",
        "Selva Oscura",
        "Lastarria"
    ],
    "Región de Los Lagos": [
        "Puerto Montt",
        "Calbuco",
        "Fresia",
        "Frutillar",
        "Purranque",
        "Los Muermos",
        "Rio Negro",
        "Llanquihue",
        "Quellon",
        "Puerto Octay",
        "Maullin",
        "San Pablo",
        "Alerce",
        "Nueva Braunau",
        "Carelmapu",
        "Entre Lagos",
        "San Juan de la Costa",
        "Trumao",
        "Pargua",
        "Pichi Pelluco",
        "Ahue",
        "Quetalmahue",
        "Lechagua",
        "Pauldeo",
        "Castro",
        "Puerto Varas",
        "Pucatrihue",
        "Puaucho",
        "Bahia Mansa",
        "Maicolpue",
        "Piedra Azul",
        "Quillaipe",
        "Metri",
        "Lenca",
        "Chaica",
        "La Arena",
        "Casma",
        "Osorno",
        "Chamiza",
        "El Yeco",
        "Panitao",
        "Ancud"
    ],
    "Región Aysén del General Carlos Ibáñez del Campo": [
        "Coyhaique",
        "Puerto Aysén"
    ],
    "Región de Magallanes y Antártica Chilena": [
        "Punta Arenas",
        "Puerto Natales",
        "San Gregorio"
    ],
    "Región de Los Ríos": [
        "Lago Ranco",
        "Tralcapulli",
        "Ancacomoe",
        "Pullinque",
        "Rio Trafun",
        "Llonguen",
        "Panguilelfun",
        "Puerto Fuy",
        "Cayumapu",
        "Punahue",
        "Playa Monje",
        "Los Cajones",
        "Los Tallos",
        "Huerquehue",
        "Melefquen",
        "Releco",
        "Llongahue",
        "Malalhue",
        "Paillaco",
        "Puerto Nuevo",
        "Lanco",
        "Los Lagos",
        "Panguipulli",
        "San Jose de la Mariquina",
        "Futrono",
        "Los Esteros",
        "Los Chilcos",
        "Valdivia",
        "La Union",
        "Río Bueno"
    ],
    "Región de Ñuble": [
        "Chillan",
        "San Carlos",
        "Coelemu",
        "Quillon",
        "Quirihue",
        "Coihueco",
        "Pinto",
        "San Ignacio",
        "San Nicolas",
        "Ninhue",
        "Portezuelo",
        "Ranquil"
    ]
};

const sucursales = [
    "10 DE JULIO",
    "ABDON CIFUENTES",
    "AGUSTINAS",
    "Alamparte",
    "ALGARROBO",
    "ALTO HOSPICIO",
    "ALTO LAS CONDES",
    "ANCUD",
    "ANGOL",
    "ANTOFAGASTA CENTRAL ENCARGOS",
    "ANTOFAGASTA LATORRE",
    "ARAUCO CARGA",
    "ARICA CENTRAL DE CARGA",
    "AVENIDA LAS CONDES",
    "BELLAVISTA",
    "BICENTENARIO",
    "BODEGA SAN FRANCISCO",
    "Boulevard del valle - San Pedro de la Paz",
    "BUENAVENTURA",
    "BUIN",
    "BULNES",
    "BUSTAMANTE",
    "CABILDO",
    "CABRERO",
    "CALAMA CENTRAL CARGA",
    "CALAMA TERMINAL",
    "CALBUCO",
    "CALDERA CENTRO",
    "CANTAGALLO",
    "CAÑETE",
    "CARAHUE",
    "CASABLANCA CARGA",
    "CASTRO",
    "CAUQUENES",
    "C&C Mall Plaza Egaña",
    "C&C Mall Plaza Norte",
    "C&C Mall Plaza Vespucio",
    "CENTRO DISTRIBUCION SAN BERNARDO",
    "CERRILLOS",
    "CHACABUCO",
    "CHANARAL",
    "Chicureo",
    "CHICUREO",
    "CHIGUAYANTE",
    "CHILLAN CENTRAL CARGA",
    "CHILLAN SANTA ISABEL",
    "CIENFUEGOS",
    "CIUDAD EMPRESARIAL",
    "CLAVERO",
    "COELEMU",
    "CÓLINA",
    "COLLIPULLI",
    "CON CON CARGA",
    "CONARIPE",
    "CONCEPCION CAMILO HENRIQUEZ",
    "CONCEPCION SAN PEDRO DE LA PAZ",
    "CONCEPCION SOTOMAYOR",
    "CONCEPCION TUCAPEL",
    "CONSTITUCION",
    "COPIAPO CARGA",
    "COPIAPO LOS CARRERA",
    "COQUIMBO ARENAS",
    "COQUIMBO CENTRAL ENCARGOS",
    "COQUIMBO TERMINAL",
    "CORONEL",
    "COYHAIQUE",
    "CUNCO",
    "CURACAUTIN",
    "CURACAVI",
    "CURANILAHUE",
    "CURAUMA",
    "CURICO AGUAS NEGRAS",
    "CURICO ALAMEDA",
    "CUSTODIA CARGA",
    "DIEGO DE ALMAGRO",
    "EINSTEIN",
    "EL BOSQUE",
    "EL CARMEN",
    "EL CARMEN",
    "EL GOLF",
    "EL QUISCO",
    "EL QUISCO CENTRO",
    "EL ROSAL",
    "EL SALVADOR",
    "ENEA",
    "ERCILLA",
    "ESCUELA MILITAR",
    "EXPOSICION",
    "FRANKLIN",
    "FREIRE",
    "FRESIA",
    "FRUTILLAR",
    "FUTRONO",
    "GABRIELA ORIENTE",
    "GALVARINO",
    "GORBEA",
    "GRAN AVENIDA",
    "GRANEROS",
    "GRANEROS",
    "HUALPEN",
    "HUASCO",
    "HUB LAS CONDES",
    "HUB PLACILLA",
    "ILLAPEL",
    "INDEPENDENCIA",
    "IQUIQUE BARROS ARANAS",
    "IQUIQUE CENTRAL ENCARGOS",
    "IQUIQUE ESMERALDA",
    "IQUIQUE LOS HEROES",
    "IQUIQUE ZOFRI",
    "JOTABECHE",
    "JUAN MOYA",
    "LA CALERA",
    "LA CALERA CAMILO HENRIQUEZ",
    "LA CALERA CENTRO",
    "LA CISTERNA",
    "LA DEHESA",
    "LA FLORIDA",
    "LA LIGUA",
    "LA REINA",
    "LA SERENA BALMACEDA",
    "LA SERENA TERMINAL",
    "LA UNION",
    "LABRANZA",
    "LAGO RANCO",
    "LAJA",
    "LANCO LIBERTAD",
    "LAUTARO",
    "LEBU ENCOMIENDAS",
    "LICAN RAY",
    "LIMACHE CARGA",
    "LINARES",
    "LITUECHE",
    "LLAY LLAY",
    "LLOLLEO AV CHILE",
    "LO ECHEVERS",
    "LO PRADO",
    "LOMAS COLORADAS",
    "LOMAS DE SAN SEBASTIÁN",
    "LONCOCHE",
    "LONCOCHE CARGA",
    "LONQUIMAY",
    "LOS ALAMOS",
    "LOS ANDES",
    "LOS ANDES SANTA TERESA",
    "LOS ANGELES CENTRAL DE CARGA",
    "LOS ANGELES CENTRO",
    "LOS ANGELES PASEO",
    "LOS LAGOS",
    "LOS VILOS CENTRO",
    "LOTA",
    "MACHALI",
    "MACUL",
    "MAIPU BELARMINO OSORIO",
    "MANQUEHUE",
    "MANUEL MONTT",
    "MAPOCHO",
    "MARIA ELENA",
    "MATTA",
    "MEJILLONES",
    "Melipilla",
    "Midmall",
    "MINI HUB CAUQUENES",
    "MOLINA",
    "MONEDA",
    "MORANDE",
    "MULCHEN",
    "NACIMIENTO TERMINAL",
    "NUEVA IMPERIAL",
    "ÑUBLE",
    "ÑUÑOA LOS ALERCES",
    "OCHAGAVIA",
    "OSORNO CENTRAL DE CARGA",
    "OSORNO RAHUE",
    "OSORNO SEBASTAPOL",
    "OSSA",
    "OVALLE",
    "PADRE HURTADO",
    "PADRE LAS CASAS",
    "PAILLACO",
    "PAJARITOS",
    "PANGUIPULLI",
    "PAPUDO",
    "PARRAL CARGA",
    "PATIO EUCALIPTUS",
    "PATIO QUILICURA",
    "PATRONATO",
    "Pedro Fontova",
    "PENCO",
    "PEÑAFLOR",
    "PEÑALOLEN",
    "PETORCA",
    "Pichilemu",
    "PITRUFQUEN",
    "PLAZA RENCA",
    "PORTUGAL",
    "PORVENIR",
    "POZO ALMONTE ENCARGOS",
    "PROVIDENCIA",
    "prueba",
    "PUCON",
    "PUDAHUEL",
    "PUENTE ALTO ELISA CORREA",
    "PUENTE ALTO LAS MERCEDES",
    "PUERTO AYSEN",
    "PUERTO MONTT ALCALDE",
    "PUERTO MONTT ALERCE",
    "PUERTO MONTT ENCOMIENDAS",
    "PUERTO MONTT TENIENTE",
    "PUERTO NATALES",
    "PUERTO SAAVEDRA",
    "PUERTO VARAS ENCOMIENDAS",
    "PUNTA ARENAS",
    "PUNTA ARENAS UNIMARC",
    "PUREN",
    "PURRANQUE",
    "QUELLON",
    "QUILICURA",
    "QUILIN",
    "QUILLON",
    "QUILLOTA",
    "QUILLOTA SENDERO",
    "QUILPUE EL BELLOTO",
    "QUILPUE MARGA MARGA",
    "QUILPUE TERMINAL",
    "QUILPUÉ VALENCIA",
    "QUINTA NORMAL",
    "QUIRIHUE",
    "RANCAGUA CENTRAL ENCARGOS",
    "RANCAGUA CONDEL",
    "RANCAGUA MEMBRILLAR",
    "Rapa Nui",
    "RECOLETA",
    "RENCA",
    "RENGO",
    "REÑACA",
    "RICARDO LYON",
    "RIO BUENO",
    "ROJAS MAGALLANES",
    "ROMAN DIAZ",
    "ROTONDA ATENAS",
    "RUIZ TAGLE",
    "SALAMANCA",
    "SAN ANTONIO",
    "SAN ANTONIO BARRANCAS",
    "SAN BERNARDO",
    "SAN CARLOS",
    "SAN DIEGO",
    "SAN FELIPE SANTO DOMINGO",
    "SAN FELIPE TRASLAVINA",
    "San Felipe Yungay",
    "SAN FERNANDO CARGA",
    "San Javier",
    "SAN JOSE MARIQUINA",
    "SAN PABLO",
    "SAN PEDRO DE ATACAMA",
    "SAN VICENTE",
    "SANTA AMALIA",
    "SANTA BARBARA",
    "SANTA CRUZ",
    "SANTA ROSA",
    "SANTIAGO IQUIQUE 3334",
    "SIERRA GORDA",
    "TAL TAL",
    "TALAGANTE",
    "Talca Oriente",
    "TALCA PONIENTE",
    "TALCA TERMINAL",
    "TALCA VAROLI",
    "TALCAHUANO CARGA",
    "TARAPACA",
    "TEMUCO ANTONIO VARAS",
    "TEMUCO FUNDO EL CARMEN",
    "TEMUCO ORTEGA",
    "TEMUCO PABLO NERUDA",
    "TEMUCO TORREMOLINOS",
    "TEMUCO TORREMOLINOS",
    "TENIENTE CRUZ",
    "TERMINAL ALAMEDA",
    "Tobalaba",
    "TOCOPILLA",
    "TOESCA",
    "TOLTEN",
    "TOME",
    "TRAIGUEN",
    "UNIMARC MIRADOR",
    "VALDIVIA AV ESPAÑA",
    "VALDIVIA CENTRAL DE CARGA",
    "VALDIVIA ISLA TEJA",
    "VALLENAR",
    "VALPARAISO BRASIL",
    "VALPARAISO RODOVIARIO",
    "VALPO RODOVIARIO LOCAL 9",
    "Vespucio Sur",
    "VICTORIA",
    "VICUÑA",
    "VILCÚN",
    "VILLA ALEMANA MATURANA",
    "VILLARRICA",
    "VIÑA ARLEGUI",
    "VIÑA CARGA CALLE BATUCO",
    "VIÑA CENTRAL CARGA",
    "VIÑA QUILPUE",
    "VIÑA UNO PONIENTE",
    "VITACURA",
    "WALKER MARTINEZ",
    "YUMBEL",
    "YUNGAY",
    "ZAPALLAR"
];

// Ordenar comunas por región alfabéticamente
Object.keys(comunasPorRegion).forEach(region => {
    comunasPorRegion[region].sort((a, b) => a.localeCompare(b));
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    let currentSlide = 0;
    let slideInterval;

    // Mostrar la imagen activa y el indicador correspondiente
    function showSlide(index) {
        images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
        });
        indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
        });
    }

    // Cambiar a la siguiente imagen
    function nextSlide() {
        currentSlide = (currentSlide + 1) % images.length;
        showSlide(currentSlide);
    }

    // Cambiar a la imagen anterior
    function previousSlide() {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        showSlide(currentSlide);
    }

    // Ir a una imagen específica al hacer clic en un indicador
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Iniciar la rotación automática
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Detener la rotación automática al interactuar
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Agregar eventos a las flechas y los indicadores
    leftArrow.addEventListener('click', () => {
        stopAutoSlide();
        previousSlide();
        startAutoSlide();
    });

    rightArrow.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(index);
        startAutoSlide();
        });
    });

    // Iniciar el carrusel
    showSlide(currentSlide);
    startAutoSlide();
    });

// Validación del RUT con dígito verificador
function validateRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');  // Eliminar puntos y guion
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();  // Aceptar "K" y "k"

    // Cálculo del dígito verificador
    let suma = 0;
    let multiplo = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(body.charAt(i), 10);  // Convertir a entero
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const expectedDV = 11 - (suma % 11);
    const finalDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();

    return dv === finalDV;  // Devuelve true si el dígito verificador es correcto
}

document.getElementById("rutForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const rut = document.getElementById("rut").value.replace(/\./g, '').replace('-', '');
    const rutError = document.getElementById("rutError");
    const rutInput = document.getElementById("rut");

    if (validateRUT(rut)) {
        rutError.textContent = "";
        rutInput.classList.remove("error");
        document.getElementById("extraFieldsSection").style.display = "block";
    } else {
        rutError.textContent = "Por favor ingrese un RUT válido con dígito verificador.";
        rutInput.classList.add("error");
    }
});

// Formateo del RUT en tiempo real mientras el usuario escribe
document.getElementById('rut').addEventListener('input', function () {
    let input = this.value.replace(/[^0-9kK]/g, '');  // Permitir solo dígitos y "K/k"
    this.value = formatRUT(input);  // Formatear el RUT
});

// Formatear RUT con puntos y guion
function formatRUT(rut) {
    const body = rut.slice(0, -1);  // Parte numérica
    const dv = rut.slice(-1);  // Dígito verificador

    let formattedBody = '';
    for (let i = 0; i < body.length; i++) {
        if (i > 0 && (body.length - i) % 3 === 0) {
            formattedBody += '.';  // Insertar punto cada 3 dígitos
        }
        formattedBody += body[i];
    }

    return dv ? `${formattedBody}-${dv}` : formattedBody;  // Agregar guion si hay DV
}

// Validación al enviar el formulario
document.getElementById('rutForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevenir envío del formulario

    const rut = document.getElementById('rut').value.replace(/[^\dkK]/g, '');  // Limpiar y mantener K/k
    const rutError = document.getElementById('rutError');

    if (!validateRUT(rut)) {
        rutError.textContent = "RUT no válido";  // Mostrar error
        document.getElementById('rut').classList.add('error');  // Borde rojo en caso de error
    } else {
        rutError.textContent = "";  // Limpiar mensaje de error
        document.getElementById('rut').classList.remove('error');  // Quitar borde roj
    }
});

// Modificar el campo de teléfono para mantener el formato +56
document.getElementById('telefono').addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length < 2) {
    input = '56';
    }
    if (input.length > 2) {
    input = input.slice(0, 2) + ' ' + input.slice(2); // Formato +56 XXXXXXXXX
    }
    if (input.length > 12) {
    input = input.slice(0, 12);
    }
    e.target.value = '+' + input;
    });

// Actualizar comunas al seleccionar región
document.getElementById('region').addEventListener('change', function() {
    const regionSeleccionada = this.value;
    const comunaSelect = document.getElementById('comuna');

    // Limpiar opciones de comuna
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    // Agregar comunas según la región seleccionada
    if (comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    }
});

// Obtén los elementos necesarios
const sucursalInput = document.getElementById('sucursal');
const suggestionsList = document.getElementById('suggestions');
const errorMessage = document.getElementById('error-message');
const nextButton = document.getElementById('nextButton');

// Evento para manejar la entrada del usuario
sucursalInput.addEventListener('input', () => {
    const input = sucursalInput.value.toUpperCase();
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
    errorMessage.style.display = 'none'; // Oculta el mensaje de error

    if (input) {
        const filteredSuggestions = sucursales.filter(sucursal => 
            sucursal.toUpperCase().includes(input) // Comparar en mayúsculas
        );

        if (filteredSuggestions.length > 0) {
            filteredSuggestions.forEach(sucursal => {
                const li = document.createElement('li');
                li.textContent = sucursal;
                li.style.cursor = 'pointer';
                li.addEventListener('click', () => {
                    sucursalInput.value = sucursal;
                    suggestionsList.innerHTML = '';
                    suggestionsList.style.display = 'none';
                    errorMessage.style.display = 'none'; // Oculta el mensaje de error al seleccionar una sugerencia
                    nextButton.disabled = false; // Habilita el botón Siguiente al seleccionar una sugerencia válida
                });
                suggestionsList.appendChild(li);
            });
            suggestionsList.style.display = 'block';
        }
    }
});

// Evento para ocultar las sugerencias al perder el foco
sucursalInput.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionsList.style.display = 'none';
    }, 100);
});

// Validar que solo se ingresen letras y números
sucursalInput.addEventListener('keypress', (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[a-zA-Z0-9 ]/.test(char)) {
        e.preventDefault();
    }
});

// Validar la sucursal al salir del campo
sucursalInput.addEventListener('blur', () => {
    const input = sucursalInput.value.toUpperCase();
    const isValidSucursal = sucursales.some(sucursal => sucursal.toUpperCase() === input); // Compara en mayúsculas

    if (input && !isValidSucursal) {
        errorMessage.style.display = 'block'; // Muestra el mensaje de error
        nextButton.disabled = true; // Deshabilita el botón Siguiente si la sucursal es inválida
    } else {
        errorMessage.style.display = 'none'; // Oculta el mensaje de error si es válido
        nextButton.disabled = false; // Habilita el botón Siguiente si es válido
    }
});

// Validar la sucursal al hacer clic en el botón Siguiente
nextButton.addEventListener('click', () => {
    const input = sucursalInput.value.toUpperCase();
    const isValidSucursal = sucursales.some(sucursal => sucursal.toUpperCase() === input);

    if (!isValidSucursal) {
        errorMessage.style.display = 'block'; // Muestra el mensaje de error
    } else {
        errorMessage.style.display = 'none'; // Oculta el mensaje de error
        // Aquí puedes añadir la lógica para avanzar al siguiente paso
        console.log("Sucursal válida, avanzando al siguiente paso.");
    }
});

// Validación del teléfono con el formato +56 9XXXXXXXX
function validatePhone(phone) {
    const regex = /^\+56 9\d{8}$/;
    return regex.test(phone);
}

// Validación del email
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Restringir caracteres en el campo de email
document.getElementById('email').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9._%+-@]/g, '');
});

// Validación de los nombres y apellidos (solo letras)
function validateNames(name) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
}

// Restricción de caracteres en el campo de calle (permitiendo letras, números, puntos y espacios)
document.getElementById('calle').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9\. ]/g, '');
});

// Restricción de caracteres en el campo de número (solo letras y números)
document.getElementById('numero').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
});

// Restricción de caracteres en el campo de referencia (permitiendo letras, números, puntos y espacios)
document.getElementById('dptoCasa').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9\. ]/g, '');
});

// Restricción de caracteres en los campos de nombres y apellidos
document.getElementById('nombres').addEventListener('input', restrictToLetters);
document.getElementById('apellidos').addEventListener('input', restrictToLetters);

function restrictToLetters(event) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    const inputField = event.target;
    if (!regex.test(inputField.value)) {
        inputField.value = inputField.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
}

// Validación de los campos adicionales
document.getElementById('extraFieldsForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevenir envío
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    
    let valid = true;

    // Validar nombres
    if (!validateNames(nombres)) {
        document.getElementById('nombresError').textContent = "Nombres solo pueden contener letras.";
        valid = false;
    } else {
        document.getElementById('nombresError').textContent = ""; // Limpiar mensaje
    }

    // Validar apellidos
    if (!validateNames(apellidos)) {
        document.getElementById('apellidosError').textContent = "Apellidos solo pueden contener letras.";
        valid = false;
    } else {
        document.getElementById('apellidosError').textContent = ""; // Limpiar mensaje
    }

    // Validar email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = "Email inválido.";
        valid = false;
    } else {
        document.getElementById('emailError').textContent = ""; // Limpiar mensaje
    }

    // Validar teléfono
    if (!validatePhone(telefono)) {
        document.getElementById('telefonoError').textContent = "Teléfono inválido.";
        valid = false;
    } else {
        document.getElementById('telefonoError').textContent = ""; // Limpiar mensaje
    }

    // Si todos los campos son válidos, mostrar la sección de entrega
    if (valid) {
        document.getElementById('extraFieldsSection').style.display = 'none'; // Ocultar datos personales
        document.getElementById('deliverySection').style.display = 'block'; // Mostrar entrega
    }
});

// Mostrar campos según tipo de entrega
document.getElementById('tipoEntrega').addEventListener('change', function () {
    const tipoEntrega = this.value;
    const domicilioFields = document.getElementById('domicilioFields');
    const sucursalFields = document.getElementById('sucursalFields');

    if (tipoEntrega === 'Domicilio') {
        domicilioFields.style.display = 'block';  // Mostrar campos de domicilio
        sucursalFields.style.display = 'none';     // Ocultar campos de sucursal
    } else if (tipoEntrega === 'Sucursal') {
        domicilioFields.style.display = 'none';     // Ocultar campos de domicilio
        sucursalFields.style.display = 'block';    // Mostrar campos de sucursal
    } else {
        domicilioFields.style.display = 'none';     // Ocultar ambos si no hay selección
        sucursalFields.style.display = 'none';
    }
});

// Funcionalidad del botón retroceder
document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('deliverySection').style.display = 'none'; // Ocultar entrega
    document.getElementById('extraFieldsSection').style.display = 'block'; // Volver a datos personales
});

// Funcionalidad del botón retroceder
document.getElementById('backButton2').addEventListener('click', function () {
    document.getElementById('resumenSection').style.display = 'none'; // Ocultar entrega
    document.getElementById('deliverySection').style.display = 'block'; // Volver a datos personales
});

// Lógica de flujo del formulario de entrega
document.getElementById('nextButton').addEventListener('click', function (e) {
    e.preventDefault();  // Evitar el comportamiento predeterminado

    const tipoEntrega = document.getElementById('tipoEntrega').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;

    // Validación de tipo de entrega
    if (!tipoEntrega) {
        alert("Por favor seleccione un tipo de entrega.");  // Mensaje si no se selecciona tipo
        return;
    }

    // Validar campos adicionales (solo si el tipo de entrega es "domicilio")
    if (tipoEntrega === 'Domicilio') {
        document.getElementById('resumenDomicilio').style.display = 'block'; // mostrar domicilio
        document.getElementById('resumenDeSucursal').style.display = 'none'; // Ocultar sucursal
        const calle = document.getElementById('calle').value;
        const numero = document.getElementById('numero').value;
        const referencia = document.getElementById('dptoCasa').value;  // Nuevo campo referencia
        const comuna = document.getElementById('comuna').value;
        const region = document.getElementById('region').value;

        let valid = true;

        if (!calle || !numero || !comuna || !region) {
            alert("Por favor complete todos los campos de dirección.");
            valid = false;
        }

        if (valid) {
            // Formatear la dirección con o sin referencia
            const direccion = referencia 
                ? `${calle}, ${numero}, ${referencia}, ${comuna}, ${region}` 
                : `${calle}, ${numero}, ${comuna}, ${region}`;

            // Mostrar resumen
            document.getElementById('resumenRut').textContent = document.getElementById('rut').value;
            document.getElementById('resumenNombre').textContent = `${nombres} ${apellidos}`;
            document.getElementById('resumenEmail').textContent = document.getElementById('email').value;
            document.getElementById('resumenTelefono').textContent = document.getElementById('telefono').value;
            document.getElementById('resumenDireccion').textContent = direccion;

            document.getElementById('deliverySection').style.display = 'none'; // Ocultar entrega
            document.getElementById('resumenSection').style.display = 'block'; // Mostrar resumen
        }
    } else if (tipoEntrega === 'Sucursal') {
        // Mostrar resumen para entrega en sucursal
        document.getElementById('resumenDomicilio').style.display = 'none'; // ocultar Domicilio
        document.getElementById('resumenDeSucursal').style.display = 'block'; // mostrar sucursal
        document.getElementById('resumenRut').textContent = document.getElementById('rut').value;
        document.getElementById('resumenNombre').textContent = `${nombres} ${apellidos}`;
        document.getElementById('resumenEmail').textContent = document.getElementById('email').value;
        document.getElementById('resumenTelefono').textContent = document.getElementById('telefono').value;
        document.getElementById('resumenSucursal').textContent = document.getElementById('sucursal').value;

        document.getElementById('deliverySection').style.display = 'none'; // Ocultar entrega
        document.getElementById('resumenSection').style.display = 'block'; // Mostrar resumen
    }
});

// Lógica para mostrar SweetAlert al finalizar
document.getElementById('finalizarButton').addEventListener('click', function () {
    const rut = document.getElementById('rut').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Guardar datos en LocalStorage
    const clienteData = { nombres, apellidos, email, telefono };
    localStorage.setItem(rut, JSON.stringify(clienteData));

    // Mostrar mensaje de éxito y recargar página
    Swal.fire({
        title: '¡Ingreso exitoso!',
        text: 'Nos pondremos en contacto pronto para enviar su comprobante de ingreso.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();  // Reiniciar la página
        }
    });
});