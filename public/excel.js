export function fillExcel() {
    const workbook = XLSX.readFile('plantilla-emision-masiva_v2.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    let row = findFirstEmptyRow(worksheet, 8);

    if (row > 8) {
        fillRow(worksheet, row);
        XLSX.writeFile(workbook, 'plantilla-emision-masiva_v2.xlsx');
    } else {
        console.error('No hay filas vacías disponibles para llenar los datos.');
    }
}

function findFirstEmptyRow(worksheet, startRow) {
    let row = startRow;
    while (worksheet[`A${row}`] && worksheet[`A${row}`].v) {
        row++;
    }
    return row;
}

function fillRow(worksheet, row) {
    worksheet[`A${row}`] = { t: 's', v: 'EMISION' };
    
    const tipoEntrega = document.querySelector('input[name="tipo_entrega"]:checked').value;
    fillDeliveryDetails(worksheet, row, tipoEntrega);

    worksheet[`D${row}`] = { t: 's', v: document.getElementById('rut').value };
    worksheet[`E${row}`] = { t: 's', v: `${document.getElementById('nombres').value} ${document.getElementById('apellidos').value}` };
    worksheet[`F${row}`] = { t: 's', v: cleanPhone(document.getElementById('telefono').value) };
    worksheet[`G${row}`] = { t: 's', v: document.getElementById('email').value };
    
    fillConstantColumns(worksheet, row);
}

function fillDeliveryDetails(worksheet, row, tipoEntrega) {
    if (tipoEntrega === 'Sucursal') {
        worksheet[`B${row}`] = { t: 's', v: 'En Sucursal' };
        worksheet[`C${row}`] = { t: 's', v: document.getElementById('sucursal').value };
        worksheet[`H${row}`] = { t: 's', v: '' };
        worksheet[`I${row}`] = { t: 's', v: '' };
    } else if (tipoEntrega === 'Domicilio') {
        worksheet[`B${row}`] = { t: 's', v: 'En Domicilio' };
        worksheet[`C${row}`] = { t: 's', v: '' };

        const direccionCompleta = getDireccionCompleta();
        worksheet[`H${row}`] = { t: 's', v: document.getElementById('comuna').value };
        worksheet[`I${row}`] = { t: 's', v: direccionCompleta };
    }
}

function getDireccionCompleta() {
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const deptoCasa = document.getElementById('deptoCasa')?.value || '';
    return deptoCasa ? `${calle}, ${numero}, ${deptoCasa}` : `${calle}, ${numero}`;
}

function cleanPhone(telefono) {
    return telefono.replace('+56', '').replace(' ', '');
}

function fillConstantColumns(worksheet, row) {
    worksheet[`J${row}`] = { t: 's', v: 'Normal' };
    worksheet[`K${row}`] = { t: 's', v: 'Por pagar' };
    worksheet[`L${row}`] = { t: 's', v: 'Ropa' };
    worksheet[`M${row}`] = { t: 'n', v: 50000 };
    worksheet[`N${row}`] = { t: 's', v: '' };
    worksheet[`O${row}`] = { t: 's', v: '' };
    worksheet[`P${row}`] = { t: 's', v: 'ropa' };
    worksheet[`Q${row}`] = { t: 'n', v: 0.8 };
    worksheet[`R${row}`] = { t: 'n', v: 20 };
    worksheet[`S${row}`] = { t: 'n', v: 15 };
    worksheet[`T${row}`] = { t: 'n', v: 30 };
}