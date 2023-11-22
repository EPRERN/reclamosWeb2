const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['https://655d818e01df1a493c2f221b--fabulous-marshmallow-099f6c.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,  // Habilita el intercambio de cookies y credenciales
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

const storage = multer.memoryStorage();

const limits = {
    fileSize: 10 * 1024 * 1024 // 10 MB (en bytes)
};
const upload = multer({
    storage: storage,
    limits: { files: 5, fileSize: limits.fileSize }
});

const mail_rover = async (callback) => {
    const oauth2Client = new OAuth2(
        "417669951457-ridlkaari6jei02nj0jtianhe4i96kfh.apps.googleusercontent.com",
        "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",
        "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04x7gEHkUSub0CgYIARAAGAQSNwF-L9IrtUZMyM0uKMW45H4RHJZSenLuyIVQGew91CDuBDToN1J2_McA-uaNpSKh-ll87Sb--t8"
    });

    const accessToken = await oauth2Client.getAccessToken();

    callback(nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'lautiavila96@gmail.com',
            clientId: '417669951457-ridlkaari6jei02nj0jtianhe4i96kfh.apps.googleusercontent.com',
            clientSecret: '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',
            refreshToken: '1//04x7gEHkUSub0CgYIARAAGAQSNwF-L9IrtUZMyM0uKMW45H4RHJZSenLuyIVQGew91CDuBDToN1J2_McA-uaNpSKh-ll87Sb--t8',
            accessToken: accessToken.token,
        }
    }));
};


app.post('/api/send-email', cors(), upload.array('files'), (req, res) => {
   

    const {
        nombre,
        apellido,
        dni,
        telefono,
        email,
        checkNombrePropio,
        nombreRepresentante,
        apellidoRepresentante,
        dniRepresentante,
        direccion,
        localidad,
        codigoPostal,
        direccionAlternativa,
        localidadAlternativa,
        codigoPostalAlternativo,
        nis,
        numeroDeCliente,
        descripcion,
        errorFacturacion,
        resarcimiento,
        suspencionSuministro,
        malaAtencionComercial,
        negativaConexion,
        inconvenienteTension,
        facturaFueraDeTermino
    } = req.body;


    mail_rover((transporter) => {
        const destinatarios = 'lauti_avila96@hotmail.com, lautiavila96@gmail.com, pbejarano@eprern.gov.ar';







        const mailOptions = {
            from: 'lautiavila96@gmail.com',
            to: destinatarios,
            subject: 'Nuevo formulario de Reclamos',
            html: `
        <h1><FONT color="#69b545"><u>Datos del USUARIO</u></FONT></h1>
        <br>
        


        <p><strong><u>Nombre:</u></strong> ${nombre}</p>
        <p><strong><u>Apellido:</u></strong> ${apellido}</p>
        <p><strong><u>DNI:</u></strong> ${dni}</p>
        <p><strong><u>Teléfono:</u></strong> ${telefono}</p>
        <p><strong><u>Email:</u></strong> ${email}</p>
      
        <p><strong><u>Actúa en Nombre Propio?:</u></strong> ${checkNombrePropio}</p>
        <p><strong><u>Nombre del Representante:</u></strong> ${nombreRepresentante}</p>
        <p><strong><u>Apellido del Representante:</u></strong> ${apellidoRepresentante}</p>
        <p><strong><u>DNI del Representante:</u></strong> ${dniRepresentante}</p>
        <p><strong><u>Dirección:</u></strong> ${direccion}</p>
        <p><strong><u>Localidad:</u></strong> ${localidad}</p>
        <p><strong><u>Código Postal:</u></strong> ${codigoPostal}</p>
        <br>
        <h3><FONT color="#69b545"><u>Coincide Direccion?  Si estos datos están repetidos ha marcado que sí</u></FONT></h3
        <p><strong><u>Dirección 2:</u></strong> ${direccionAlternativa}</p>
        <p><strong><u>Localidad 2:</u></strong> ${localidadAlternativa}</p>
        <p><strong><u>Código Postal 2:</u></strong> ${codigoPostalAlternativo}</p>
        <br><br>
        <p><strong><u>Nº NIS:</u></strong> ${nis}</p>
        <p><strong><u>Número de Cliente:</u></strong> ${numeroDeCliente}</p>
        <br>
        <p><strong><u>Descripción del RECLAMO:</u></strong> ${descripcion}</p>
        <br>
        <h1><FONT color="#69b545"><u>Tipología de Reclamo</u></FONT></h1>
        
        <p><strong><u>Error Facturación:</u></strong> ${errorFacturacion}</p>
        <p><strong><u>Resarcimiento:</u></strong> ${resarcimiento}</p>
        <p><strong><u>Suspensión Suministro:</u></strong> ${suspencionSuministro}</p>
        <p><strong><u>Mala Atención Comercial:</u></strong> ${malaAtencionComercial}</p>
        <p><strong><u>Negativa Conexión:</u></strong> ${negativaConexion}</p>
        <p><strong><u>Inconveniente Tensión:</u></strong> ${inconvenienteTension}</p>
        <p><strong><u>Factura Fuera de Termino/no recibidas:</u></strong> ${facturaFueraDeTermino}</p>
      
        <br>
        <br>
        <br>    
        <h3><FONT color="#612525">si dice true="Se tildó la casilla"&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;si dice false="no se tildó la casilla"
        

    `,
            attachments: req.files.map((file) => ({
                filename: file.originalname,
                content: file.buffer
            }))
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al enviar el correo electrónico');
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
                res.status(200).send('Correo electrónico enviado con éxito');
            }
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 