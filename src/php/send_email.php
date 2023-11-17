<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $dni = $_POST['dni'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $checkNombrePropio = $_POST['checkNombrePropio'];
    $nombreRepresentante = $_POST['nombreRepresentante'];
    $apellidoRepresentante = $_POST['apellidoRepresentante'];
    $dniRepresentante = $_POST['dniRepresentante'];
    $direccion = $_POST['direccion'];
    $localidad = $_POST['localidad'];
    $codigoPostal = $_POST['codigoPostal'];
    $direccionAlternativa = $_POST['direccionAlternativa'];
    $localidadAlternativa = $_POST['localidadAlternativa'];
    $codigoPostalAlternativo = $_POST['codigoPostalAlternativo'];
    $nis = $_POST['nis'];
    $numeroDeCliente = $_POST['numeroDeCliente'];
    $descripcion = $_POST['descripcion'];
    $errorFacturacion = $_POST['errorFacturacion'];
    $resarcimiento = $_POST['resarcimiento'];
    $suspencionSuministro = $_POST['suspencionSuministro'];
    $malaAtencionComercial = $_POST['malaAtencionComercial'];
    $negativaConexion = $_POST['negativaConexion'];
    $inconvenienteTension = $_POST['inconvenienteTension'];
    $facturaFueraDeTermino = $_POST['facturaFueraDeTermino'];
    // Obtén otros campos del formulario de manera similar...

    // Configura los correos
    $to = 'lautiailva96@gmail.com';
    $subject = 'Formulario de reclamo';

    // Construye el cuerpo del mensaje
    $message = "Nombre: $nombre\n";
    $message .= "Apellido: $apellido\n";
    $message = "DNI: $dni\n";
    $message .= "Teléfono: $telefono\n";
    $message .= "Email: $email\n";
    $message .= "Check Nombre Propio: $checkNombrePropio\n";
    $message .= "Nombre Representante: $nombreRepresentante\n";
    $message .= "Apellido Representante: $apellidoRepresentante\n";
    $message .= "DNI Representante: $dniRepresentante\n";
    $message .= "Dirección: $direccion\n";
    $message .= "Localidad: $localidad\n";
    $message .= "Código Postal: $codigoPostal\n";
    $message .= "Dirección Alternativa: $direccionAlternativa\n";
    $message .= "Localidad Alternativa: $localidadAlternativa\n";
    $message .= "Código Postal Alternativo: $codigoPostalAlternativo\n";
    $message .= "NIS: $nis\n";
    $message .= "Número de Cliente: $numeroDeCliente\n";
    $message .= "Descripción: $descripcion\n";
    $message .= "Error Facturación: $errorFacturacion\n";
    $message .= "Resarcimiento: $resarcimiento\n";
    $message .= "Suspensión Suministro: $suspencionSuministro\n";
    $message .= "Mala Atención Comercial: $malaAtencionComercial\n";
    $message .= "Negativa Conexión: $negativaConexion\n";
    $message .= "Inconveniente Tensión: $inconvenienteTension\n";
    $message .= "Factura Fuera de Término: $facturaFueraDeTermino\n";
    // Añade otros campos al mensaje según sea necesario...

    // Configura los límites del mensaje
    $semi_rand = md5(time());
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

    // Encabezados del correo
    $headers = "From: lavila@eprern.gov.ar\r\n";
    $headers .= "Reply-To: lautiavila96@gmail.com\r\n";
    $headers .= "Content-type: multipart/mixed;\r\n";
    $headers .= " boundary=\"{$mime_boundary}\"";

    // Agrega los archivos adjuntos al mensaje
    $message .= "--{$mime_boundary}\r\n";

    foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
        $file_name = $_FILES['files']['name'][$index];
        $file_size = $_FILES['files']['size'][$index];
        $file_type = $_FILES['files']['type'][$index];
        $file_content = file_get_contents($_FILES['files']['tmp_name'][$index]);
        $file_content = chunk_split(base64_encode($file_content));

        $message .= "Content-Type: {$file_type};\n";
        $message .= " name=\"{$file_name}\"\n";
        $message .= "Content-Disposition: attachment;\n";
        $message .= " filename=\"{$file_name}\"\n";
        $message .= "Content-Transfer-Encoding: base64\n\n";
        $message .= "{$file_content}\n\n";
        $message .= "--{$mime_boundary}\n";
    }

    // Agrega el texto del formulario al mensaje
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\n";
    $message .= "Probando....\n";

    // Envía el correo electrónico
    $success = mail($to, $subject, $message, $headers);

    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Correo enviado con éxito']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el correo']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
