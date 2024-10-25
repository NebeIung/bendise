import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { read, utils, write } from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta POST para generar Excel con los datos del cliente
app.post('/generar-excel', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const clienteData = req.body;
        
        // Log de la ruta del archivo
        const excelPath = path.join(__dirname, 'public', 'plantilla-emision-masiva_v2.xlsx');
        console.log('Ruta del archivo Excel:', excelPath);

        // Leer la plantilla Excel existente
        const workbook = read(excelPath, { type: 'file' });
        console.log('Nombres de hojas disponibles:', workbook.SheetNames);

        // Obtener la primera hoja
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Log de la estructura actual de la hoja
        console.log('Estructura actual de la hoja:', worksheet);

        // Crear array con los datos del cliente
        const clienteArray = [
            clienteData.rut,
            clienteData.nombres,
            clienteData.apellidos,
            clienteData.email,
            clienteData.telefono
        ];
        console.log('Datos a insertar:', clienteArray);

        // Agregar los datos del cliente al Excel
        utils.sheet_add_aoa(worksheet, [clienteArray], { origin: 'A2' });

        // Generar el buffer del archivo
        const buffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Enviar el archivo como respuesta
        res.setHeader('Content-Disposition', 'attachment; filename="reporte.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error('Error detallado al generar el Excel:', error);
        res.status(500).json({
            message: 'Error al generar el Excel',
            error: error.message,
            stack: error.stack
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ingreso.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Directorio actual: ${__dirname}`);
});