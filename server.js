const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const express = require('express');
const multer = require('multer'); // Importar multer
const fs = require('fs').promises;
const app = express();

// Configuración de rutas y middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuraciones constantes
const EXCEL_CONFIG = {
    FILE_PATH: path.join(__dirname, 'public', 'plantilla-emision-masiva_v2.xlsx'),
    FIRST_DATA_ROW: 8,
    COLUMNS: {
        TIPO_SERVICIO: 1,
        TIPO_ENTREGA: 2,
        SUCURSAL: 3,
        RUT: 4,
        NOMBRE_COMPLETO: 5,
        TELEFONO: 6,
        EMAIL: 7,
        COMUNA: 8,
        DIRECCION: 9,
        SERVICIO: 10,
        PAGO: 11,
        CONTENIDO: 12,
        VALOR_DECLARADO: 13,
        OBSERVACION1: 14,
        OBSERVACION2: 15,
        DESCRIPCION: 16,
        PESO: 17,
        ALTO: 18,
        ANCHO: 19,
        LARGO: 20
    }
};

// Middleware para logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log('Datos recibidos:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Función para validar el archivo Excel
async function validarArchivoExcel() {
    try {
        const excelPath = EXCEL_CONFIG.FILE_PATH;
        console.log('Verificando archivo Excel en:', excelPath);

        await fs.access(excelPath);
        console.log('Archivo Excel encontrado, verificando estructura...');

        const workbook = await XlsxPopulate.fromFileAsync(excelPath);
        const sheet = workbook.sheet(0);

        if (!sheet) {
            throw new Error('No se encontró la hoja de trabajo principal');
        }

        console.log('Estructura del Excel validada correctamente');
        return true;
    } catch (error) {
        console.error('Error en la validación del Excel:', error.message);
        return false;
    }
}

// Función para normalizar texto (remover tildes)
function normalizarTexto(texto) {
    return texto.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Elimina diacríticos
                .trim();
}

// Función específica para formatear comuna
function formatearComuna(comuna) {
    return comuna
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
        .replace(/Ñ/g, 'N')              // Reemplaza Ñ mayúscula
        .replace(/ñ/g, 'N')              // Reemplaza ñ minúscula
        .toUpperCase()                   // Convierte a mayúsculas
        .trim();                         // Elimina espacios en blanco al inicio y final
}

// Función para formatear los datos con tipos correctos
function formatearDatos(datos) {
    const tipoEntrega = datos.tipoEntrega === 'Domicilio' ? 'En Domicilio' : 'En Sucursal';
    const telefono = datos.telefono.replace(/^\+56\s?/, '');
    
    // Normalizar nombres y apellidos (solo quitar tildes)
    const nombreCompleto = `${normalizarTexto(datos.nombres)} ${normalizarTexto(datos.apellidos)}`;
    
    // Formatear comuna según las reglas especificadas
    const comuna = tipoEntrega === 'En Domicilio' ? formatearComuna(datos.comuna) : '';

    return [
        'EMISION',                                    // String
        tipoEntrega,                                  // String
        tipoEntrega === 'En Sucursal' ? datos.sucursal : '', // String
        datos.rut,                                    // String (RUT debe mantenerse como texto)
        nombreCompleto,                               // String (sin tildes)
        parseInt(telefono, 10),                       // Número
        datos.email,                                  // String
        comuna,                                       // String (formateada)
        datos.tipoEntrega === 'Domicilio' ? datos.direccion : '', // String
        'Normal',                                     // String
        'Por pagar',                                  // String
        'Ropa',                                       // String
        50000,                                        // Número
        '',                                           // String
        '',                                           // String
        'Ropa',                                       // String
        0.8,                                          // Número
        30,                                           // Número
        20,                                           // Número
        15                                            // Número
    ];
}

// Función para encontrar la primera fila vacía
function encontrarPrimeraFilaVacia(sheet) {
    const startRow = EXCEL_CONFIG.FIRST_DATA_ROW;
    const maxRows = sheet.usedRange().endCell().rowNumber();
    
    for (let row = startRow; row <= maxRows + 1; row++) {
        // Solo verificamos la primera columna ya que es obligatoria
        const cellValue = sheet.cell(row, 1).value();
        if (!cellValue) {
            return row;
        }
    }
    
    return maxRows + 1;
}

// Función para escribir datos respetando tipos
async function escribirDatosEnExcel(sheet, rowNumber, values) {
    values.forEach((value, index) => {
        const cell = sheet.cell(rowNumber, index + 1);
        
        if (typeof value === 'number') {
            // Para valores numéricos, aseguramos que se guarden como números
            cell.value(value);
        } else if (value === '') {
            // Para celdas vacías, usamos null en lugar de string vacío
            cell.value(null);
        } else {
            // Para strings, mantenemos el valor como está
            cell.value(value);
        }
    });
}

// Middleware para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public')); // Ruta donde se almacenarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantener el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para subir el archivo Excel
app.post('/upload-excel', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo.');
    }
    
    // Reemplazar el archivo existente con el nuevo archivo subido
    const newFilePath = path.join(__dirname, 'public', 'plantilla-emision-masiva_v2.xlsx');
    const oldFilePath = req.file.path; // Ruta del archivo subido

    try {
        await fs.rename(oldFilePath, newFilePath); // Mover el archivo subido a la ubicación deseada, sobrescribiendo el existente
        res.send(`Archivo subido y sobrescrito exitosamente: ${newFilePath}`);
    } catch (err) {
        console.error('Error al sobrescribir el archivo:', err);
        res.status(500).send('Error al sobrescribir el archivo.');
    }
});

// Ruta para descargar el archivo Excel
app.get('/descargar-excel', (req, res) => {
    const excelPath = EXCEL_CONFIG.FILE_PATH;
    res.download(excelPath, 'plantilla-emision-masiva_v2.xlsx', (err) => {
        if (err) {
            console.error('Error al descargar el archivo:', err);
            res.status(500).send('Error al descargar el archivo');
        } else {
            console.log('Archivo Excel enviado para descarga');
        }
    });
});

// Rutas
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/inscripcion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ingreso.html'));
});

app.get('/catalogo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catalogo.html'));
});

app.get('/starkenpro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'excel.html'));
});

// Modificar la ruta POST para usar la nueva función de escritura
app.post('/enviar-datos', async (req, res) => {
    console.log('Iniciando procesamiento de datos');

    try {
        const archivoValido = await validarArchivoExcel();
        if (!archivoValido) {
            return res.status(500).json({
                error: 'Archivo no válido',
                mensaje: 'El archivo Excel no está disponible o es inválido'
            });
        }

        const workbook = await XlsxPopulate.fromFileAsync(EXCEL_CONFIG.FILE_PATH);
        const sheet = workbook.sheet(0);

        const firstEmptyRow = encontrarPrimeraFilaVacia(sheet);
        if (!firstEmptyRow) {
            return res.status(400).json({
                error: 'Excel lleno',
                mensaje: 'No hay espacio disponible en el Excel'
            });
        }

        // Usar la nueva función de escritura
        const rowValues = formatearDatos(req.body);
        await escribirDatosEnExcel(sheet, firstEmptyRow, rowValues);

        // Guardar el archivo
        await workbook.toFileAsync(EXCEL_CONFIG.FILE_PATH);
        console.log(`Datos guardados exitosamente en la fila ${firstEmptyRow}`);

        res.status(200).json({
            mensaje: 'Datos guardados correctamente',
            fila: firstEmptyRow
        });

    } catch (error) {
        console.error('Error en el procesamiento:', error);
        res.status(500).json({
            error: 'Error interno',
            mensaje: 'Error al procesar la solicitud',
            detalles: error.message
        });
    }
});

// Inicialización del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});