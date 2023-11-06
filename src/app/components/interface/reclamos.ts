interface FormularioReclamo {
    nombre: string;
    apellido: string;
    dni: number;
    direccion: string;
    localidad: string;
    codigoPostal: string;
    telefono: string;
    direccionAlternativa: string;
    localidadAlternativa: string;
    codigoPostalAlternativo: string;
    email: string;
    errorFacturacion: boolean;
    resarcimiento: boolean;
    suspencionSuministro: boolean;
    malaAtencionComercial: boolean;
    negativaConexion: boolean;
    inconvenienteTension: boolean;
    descripcion: string;
  }