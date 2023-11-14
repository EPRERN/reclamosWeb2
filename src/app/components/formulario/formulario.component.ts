import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxService } from 'src/app/services/checkbox.service';
import { EmailService } from 'src/app/services/email.service';
import { PopupService } from 'src/app/services/popup.service';
import Swal from 'sweetalert2';


import { MatDialog } from '@angular/material/dialog';
import { EasterComponent } from '../easter/easter.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() isDisabled: boolean = false;
  formularioReclamo!: FormGroup;
  formularios: any;
  files: File[] = [];


  errorMessage: string = '';
  isButtonDisabled: boolean = true;
  showPopup = false;


  constructor(public fb: FormBuilder, private emailService: EmailService,
    private checkboxService: CheckboxService,
    private popupService:PopupService,
    private router:Router,
    public dialog:MatDialog
  ) { }

  localidades: any[] = [
    { localidad: 'AGUADA CECILIO', codigoPostal: '8534' },
    { localidad: 'AGUADA DE CORDOBA', codigoPostal: '8332' },
    { localidad: 'AGUADA DE GUANACO', codigoPostal: '8418' },
    { localidad: 'AGUADA DE GUERRA', codigoPostal: '8424' },
    { localidad: 'AGUADA DEL LORO', codigoPostal: '8520' },
    { localidad: 'AGUADA DE LOS PAJARITOS', codigoPostal: '8301' },
    { localidad: 'AGUADA DE PIEDRA', codigoPostal: '8422' },
    { localidad: 'AGUADA ESCONDIDA', codigoPostal: '8418' },
    { localidad: 'AGUADA GUZMAN', codigoPostal: '8333' },
    { localidad: 'AGUADA TRONCOSO (EMBARCADERO FCGR)', codigoPostal: '8415' },
    { localidad: 'AGUA DEL CERRO', codigoPostal: '8415' },
    { localidad: 'AGUARA', codigoPostal: '8307' },
    { localidad: 'ALANITOS', codigoPostal: '8333' },
    { localidad: 'ALEJANDRO STEFENELLI', codigoPostal: '8332' },
    { localidad: 'ALLEN', codigoPostal: '8328' },
    { localidad: 'ANECON CHICO', codigoPostal: '8418' },
    { localidad: 'ANECON GRANDE', codigoPostal: '8416' },
    { localidad: 'ANTIGUO GENERAL ROCA', codigoPostal: '8332' },
    { localidad: 'ARROYO BLANCO', codigoPostal: '8403' },
    { localidad: 'ARROYO CHACAY', codigoPostal: '8401' },
    { localidad: 'ARROYO DE LA VENTANA', codigoPostal: '8521' },
    { localidad: 'ARROYO LAS MINAS', codigoPostal: '8415' },
    { localidad: 'ARROYO LOS BERROS', codigoPostal: '8521' },
    { localidad: 'ARROYO MARTIN (ÑORQUINCO, DPTO. ÑORQUINCO)', codigoPostal: '8415' },
    { localidad: 'ARROYO MARTIN (MAQUINCHAO, DPTO. 25 DE MAYO)', codigoPostal: '8422' },
    { localidad: 'ARROYO SALADO', codigoPostal: '8532' },
    { localidad: 'ARROYO TEMBRADO', codigoPostal: '8521' },
    { localidad: 'ARROYO VERDE', codigoPostal: '8521' },
    { localidad: 'ATRAICO', codigoPostal: '8418' },
    { localidad: 'BAHIA LOPEZ', codigoPostal: '8400' },
    { localidad: 'BAJO PICASO', codigoPostal: '8536' },
    { localidad: 'BAJO RICO', codigoPostal: '8360' },
    { localidad: 'BALNEARIO EL CONDOR', codigoPostal: '8501' },
    { localidad: 'BALNEARIO LA BOCA', codigoPostal: '8501' },
    { localidad: 'BALNEARIO LAS GRUTAS', codigoPostal: '8521' },
    { localidad: 'BALNEARIO MASSINI', codigoPostal: '8500' },
    { localidad: 'BARDA COLORADA', codigoPostal: '8333' },
    { localidad: 'BARDA CHICA', codigoPostal: '8324' },
    { localidad: 'BARDA DEL MEDIO', codigoPostal: '8305' },
    { localidad: 'BARILOCHE', codigoPostal: '8400' },
    { localidad: 'BARRIL NIYEO', codigoPostal: '8422' },
    { localidad: 'BARRIO DON BOSCO', codigoPostal: '8336' },
    { localidad: 'BARRIO LAGUNA', codigoPostal: '8520' },
    { localidad: 'BARRIO LAS QUINTAS', codigoPostal: '8400' },
    { localidad: 'BARRIO MATADEROS', codigoPostal: '8336' },
    { localidad: 'BARRIO NIRECO', codigoPostal: '8400' },
    { localidad: 'BARRIO NORTE', codigoPostal: '8328' },
    { localidad: 'BARRIO TRESCIENTAS VIVIENDAS', codigoPostal: '8324' },
    { localidad: 'BENJAMIN ZORRILLA', codigoPostal: '8360' },
    { localidad: 'BLANCA CHICA', codigoPostal: '8422' },
    { localidad: 'BLANCA LOMA', codigoPostal: '8332' },
    { localidad: 'BOCA DE LA TRAVESIA', codigoPostal: '8505' },
    { localidad: 'BUENA PARADA', codigoPostal: '8138' },
    { localidad: 'BUENZANIYEU', codigoPostal: '8424' },
    { localidad: 'CAIN', codigoPostal: '8332' },
    { localidad: 'CALTRAUNA', codigoPostal: '8424' },
    { localidad: 'CAMPAMENTO', codigoPostal: '8332' },
    { localidad: 'CAÑADA GRANDE', codigoPostal: '8424' },
    { localidad: 'CAÑADON COMALLO', codigoPostal: '8416' },
    { localidad: 'CAÑADON CHILENO', codigoPostal: '8417' },
    { localidad: 'CAÑADON DEL CORRAL', codigoPostal: '8412' },
    { localidad: 'CAÑADON DE LOS SAUCES', codigoPostal: '8363' },
    { localidad: 'CAÑADON TRINCAO', codigoPostal: '8332' },
    { localidad: 'CARHUE', codigoPostal: '8412' },
    { localidad: 'CARRILAUQUEN', codigoPostal: '8418' },
    { localidad: 'CARRI YEGUA', codigoPostal: '8417' },
    { localidad: 'CASA QUEMADA', codigoPostal: '8412' },
    { localidad: 'CATRIEL', codigoPostal: '8307' },
    { localidad: 'CERRO ABANICO (APEADERO FCGR)', codigoPostal: '8424' },
    { localidad: 'CERRO ALTO', codigoPostal: '8403' },
    { localidad: 'CERRO BARAJA', codigoPostal: '8505' },
    { localidad: 'CERRO CATEDRAL', codigoPostal: '8401' },
    { localidad: 'CERRO DAVID', codigoPostal: '8412' },
    { localidad: 'CERRO DE LA POLICIA', codigoPostal: '8333' },
    { localidad: 'CERRO DE LOS VIEJOS', codigoPostal: '8138' },
    { localidad: 'CERRO DE POLICIA', codigoPostal: '8333' },
    { localidad: 'CERRO FRANCISCO', codigoPostal: '8505' },
    { localidad: 'CERRO GALENSE', codigoPostal: '8363' },
    { localidad: 'CERRO MESA', codigoPostal: '8415' },
    { localidad: 'CERVANTES', codigoPostal: '8326' },
    { localidad: 'CINCO CHAÑARES', codigoPostal: '8520' },
    { localidad: 'CINCO LAGUNAS', codigoPostal: '8138' },
    { localidad: 'CINCO SALTOS', codigoPostal: '8303' },
    { localidad: 'CIPOLLETTI', codigoPostal: '8324' },
    { localidad: 'CLEMENTE ONELLI', codigoPostal: '8416' },
    { localidad: 'COLINIYEN', codigoPostal: '8332' },
    { localidad: 'COLI TORO', codigoPostal: '8418' },
    { localidad: 'COLONIA ALMIRANTE GUERRICO', codigoPostal: '8307' },
    { localidad: 'COLONIA CATRIEL', codigoPostal: '8307' },
    { localidad: 'COLONIA CHILAVERT', codigoPostal: '8532' },
    { localidad: 'COLONIA EL MANZANO', codigoPostal: '8305' },
    { localidad: 'COLONIA GRAL. FRIAS', codigoPostal: '8501' },
    { localidad: 'COLONIA JOSEFA', codigoPostal: '8363' },
    { localidad: 'COLONIA JULIA y ECHARREN', codigoPostal: '8138' },
    { localidad: 'COLONIA LA LUISA', codigoPostal: '8503' },
    { localidad: 'COLONIA LOS CANALES', codigoPostal: '8316' },
    { localidad: 'COLONIA REGINA', codigoPostal: '8336' },
    { localidad: 'COLONIA RUSA', codigoPostal: '8332' },
    { localidad: 'COLONIA SAN JUAN', codigoPostal: '8503' },
    { localidad: 'COLONIA SUIZA', codigoPostal: '8400' },
    { localidad: 'COMALLO', codigoPostal: '8416' },
    { localidad: 'COMALLO ABAJO', codigoPostal: '8416' },
    { localidad: 'COMI-C', codigoPostal: '8424' },
    { localidad: 'CONA NIYEU', codigoPostal: '8521' },
    { localidad: 'CONTRALMIRANTE CORDERO', codigoPostal: '8301' },
    { localidad: 'CONTRALMIRANTE MARTIN GUERRICO', codigoPostal: '8328' },
    { localidad: 'COQUELEN', codigoPostal: '8416' },
    { localidad: 'CORONEL BELISLE', codigoPostal: '8364' },
    { localidad: 'CORONEL EUGENIO DEL BUSTO', codigoPostal: '8138' },
    { localidad: 'CORONEL FRANCISCO SOSA (EMBARCADRO FCGR)', codigoPostal: '8503' },
    { localidad: 'CORONEL JUAN JOSE GOMEZ', codigoPostal: '8333' },
    { localidad: 'CORONEL VIDAL', codigoPostal: '8305' },
    { localidad: 'CORRAL CHICO', codigoPostal: '8534' },
    { localidad: 'CORRAL DE LOS PINOS', codigoPostal: '8412' },
    { localidad: 'CORRALITO', codigoPostal: '8403' },
    { localidad: 'COSTA DEL RIO AZUL', codigoPostal: '8430' },
    { localidad: 'COSTAS DEL PICHI LEUFU', codigoPostal: '8412' },
    { localidad: 'COS ZAURES', codigoPostal: '8307' },
    { localidad: 'COYUE CO', codigoPostal: '8333' },
    { localidad: 'CUATRO ESQUINAS', codigoPostal: '8324' },
    { localidad: 'CUBANEA', codigoPostal: '8501' },
    { localidad: 'CUENCA VIDAL', codigoPostal: '8301' },
    { localidad: 'CURA LAUQUEN', codigoPostal: '8417' },
    { localidad: 'CUYEN-LEUFU', codigoPostal: '8534' },
    { localidad: 'CHACALHUA RUCA', codigoPostal: '8415' },
    { localidad: 'CHACAY HUARRUCA', codigoPostal: '8415' },
    { localidad: 'CHACOY (BRACA)', codigoPostal: '8415' },
    { localidad: 'CHACRAS DE ALLEN', codigoPostal: '8328' },
    { localidad: 'CHAIFUL', codigoPostal: '8418' },
    { localidad: 'CHASICO', codigoPostal: '8417' },
    { localidad: 'CHAUQUEN', codigoPostal: '8536' },
    { localidad: 'CHELFORO', codigoPostal: '8366' },
    { localidad: 'CHENQUENIYEU', codigoPostal: '8412' },
    { localidad: 'CHICHIHUAO', codigoPostal: '8422' },
    { localidad: 'CHICHINALES', codigoPostal: '8326' },
    { localidad: 'CHIMPAY', codigoPostal: '8364' },
    { localidad: 'CHINA MUERTA', codigoPostal: '8504' },
    { localidad: 'CHINQUENIYEU', codigoPostal: '8412' },
    { localidad: 'CHIPAUQUIL', codigoPostal: '8536' },
    { localidad: 'CHOCORI', codigoPostal: '8503' },
    { localidad: 'CHOELE CHOEL', codigoPostal: '8360' },
    { localidad: 'CHURQUIÑEO', codigoPostal: '8412' },
    { localidad: 'DARWIN', codigoPostal: '8364' },
    { localidad: 'DOCTOR ROGELIO CORTIZO (EMPALME)', codigoPostal: '8520' },
    { localidad: 'DON GUILLERMO', codigoPostal: '8418' },
    { localidad: 'EL AGUILA', codigoPostal: '8138' },
    { localidad: 'EL BOLSON', codigoPostal: '8430' },
    { localidad: 'EL CACIQUE', codigoPostal: '8417' },
    { localidad: 'EL CAIN', codigoPostal: '8422' },
    { localidad: 'EL CALDEN', codigoPostal: '8138' },
    { localidad: 'EL CAMARURO', codigoPostal: '8417' },
    { localidad: 'EL CUY', codigoPostal: '8333' },
    { localidad: 'EL CHEIFUL', codigoPostal: '8418' },
    { localidad: 'EL DIQUE', codigoPostal: '8500' },
    { localidad: 'EL FOYEL', codigoPostal: '8401' },
    { localidad: 'EL GAUCHO POBRE', codigoPostal: '8417' },
    { localidad: 'EL HINOJO', codigoPostal: '8364' },
    { localidad: 'EL JARDINERO', codigoPostal: '8417' },
    { localidad: 'EL MANSO', codigoPostal: '8430' },
    { localidad: 'EL MANZANO', codigoPostal: '8328' },
    { localidad: 'EL MIRADOR', codigoPostal: '8418' },
    { localidad: 'EL MOLIGUE', codigoPostal: '8418' },
    { localidad: 'EL MOLINO', codigoPostal: '8364' },
    { localidad: 'EL MONTOSO', codigoPostal: '8418' },
    { localidad: 'EL PANTANOSO', codigoPostal: '8412' },
    { localidad: 'EL SALADO', codigoPostal: '8536' },
    { localidad: 'EL TREBOL', codigoPostal: '8138' },
    { localidad: 'EMPALME DOCTOR ROGELIO CORTISO', codigoPostal: '8520' },
    { localidad: 'EMPALME KILOMETRO 648 (APEADERO FCGR)', codigoPostal: '8418' },
    { localidad: 'ESTANCIA EL CONDOR', codigoPostal: '8400' },
    { localidad: 'ESTANCIA LAS JULIAS', codigoPostal: '8363' },
    { localidad: 'FALCKNER', codigoPostal: '8534' },
    { localidad: 'FERRI', codigoPostal: '8301' },
    { localidad: 'FITALANCAO (EMBARCADERO FCGR)', codigoPostal: '8415' },
    { localidad: 'FITAMICHE', codigoPostal: '8415' },
    { localidad: 'FITATIMEN', codigoPostal: '8415' },
    { localidad: 'FORTIN UNO', codigoPostal: '8360' },
    { localidad: 'FUERTE GENERAL ROCA', codigoPostal: '8332' },
    { localidad: 'FUERTE RUIN (EMBARCADERO FCGR)', codigoPostal: '8418' },
    { localidad: 'GARZU LAUQUEN (APEADERO FCGR)', codigoPostal: '8424' },
    { localidad: 'GARRAS', codigoPostal: '8324' },
    { localidad: 'GENERAL CONESA', codigoPostal: '8503' },
    { localidad: 'GENERAL ENRIQUE GODOY', codigoPostal: '8336' },
    { localidad: 'GENERAL FERNANDEZ ORO', codigoPostal: '8324' },
    { localidad: 'GENERAL LIBORIO BERNAL', codigoPostal: '8500' },
    { localidad: 'GENERAL LORENZO VINTTER', codigoPostal: '8514' },
    { localidad: 'GENERAL NICOLAS H. PALACIOS', codigoPostal: '8514' },
    { localidad: 'GENERAL ROCA', codigoPostal: '8332' },
    { localidad: 'GUARDIA MITRE', codigoPostal: '8505' },
    { localidad: 'HOTEL BAHIA LOPEZ', codigoPostal: '8400' },
    { localidad: 'HOTEL EL TREBOL', codigoPostal: '8409' },
    { localidad: 'HOTEL ENTRE LAGOS', codigoPostal: '8409' },
    { localidad: 'HOTEL LOS COIHUES', codigoPostal: '8400' },
    { localidad: 'HUA-MICHE', codigoPostal: '8417' },
    { localidad: 'HUAN LUAN', codigoPostal: '8418' },
    { localidad: 'HURRACA (CHACAY)', codigoPostal: '8415' },
    { localidad: 'INGENIERO HUERGO', codigoPostal: '8334' },
    { localidad: 'INGENIERO JACOBACCI', codigoPostal: '8418' },
    { localidad: 'INGENIERO JULIAN ROMERO', codigoPostal: '8336' },
    { localidad: 'INGENIERO OTTO KRAUSE', codigoPostal: '8336' },
    { localidad: 'INGENIERO ZIMMERMANN RESTA (APEADERO FCGR)', codigoPostal: '8416' },
    { localidad: 'INGENIO SAN LORENZO', codigoPostal: '8503' },
    { localidad: 'ISLA CHICA', codigoPostal: '8363' },
    { localidad: 'ISLA GRANDE', codigoPostal: '8361' },
    { localidad: 'JAGUEL CAMPO MONTE', codigoPostal: '8520' },
    { localidad: 'JANINUE', codigoPostal: '8534' },
    { localidad: 'JITA RUSIA', codigoPostal: '8417' },
    { localidad: 'JONES', codigoPostal: '8506' },
    { localidad: 'JUAN DE GARAY', codigoPostal: '8138' },
    { localidad: 'KILI MALAL', codigoPostal: '8417' },
    { localidad: 'KILOMETRO 823', codigoPostal: '8134' },
    { localidad: 'KILOMETRO 1071', codigoPostal: '8336' },
    { localidad: 'KILOMETRO 1099', codigoPostal: '8336' },
    { localidad: 'KILOMETRO 1218', codigoPostal: '8305' },
    { localidad: 'LA ADELA', codigoPostal: '8138' },
    { localidad: 'LA ALIANZA', codigoPostal: '8324' },
    { localidad: 'LA AMISTAD', codigoPostal: '9138' },
    { localidad: 'LA ANGOSTURA', codigoPostal: '8417' },
    { localidad: 'LA BALSA', codigoPostal: '8332' },
    { localidad: 'LA BOMBILLA', codigoPostal: '8520' },
    { localidad: 'LA CAROLINA', codigoPostal: '8503' },
    { localidad: 'LA COSTA', codigoPostal: '8332' },
    { localidad: 'LA CRIOLLITA', codigoPostal: '8417' },
    { localidad: 'LA CHILENA', codigoPostal: '8417' },
    { localidad: 'LA ELVIRA', codigoPostal: '8360' },
    { localidad: 'LA EMILIA', codigoPostal: '8324' },
    { localidad: 'LA ESMERALDA (DARWIN, DPTO. AVELLANEDA)', codigoPostal: '8364' },
    { localidad: 'LA ESMERALDA (CIPOLLETTI, DPTO. GRAL. ROCA)', codigoPostal: '8324' },
    { localidad: 'LA ESPERANZA', codigoPostal: '8534' },
    { localidad: 'LA ESTANCIA VIEJA', codigoPostal: '8324' },
    { localidad: 'LA ESTRELLA', codigoPostal: '8417' },
    { localidad: 'LA EXCURRA', codigoPostal: '8417' },
    { localidad: 'LA FLECHA', codigoPostal: '8503' },
    { localidad: 'LA GEROMITA', codigoPostal: '8332' },
    { localidad: 'LAGO GUTIERREZ', codigoPostal: '8400' },
    { localidad: 'LAGO MASCARDI', codigoPostal: '8401' },
    { localidad: 'LAGO MORENO', codigoPostal: '8400' },
    { localidad: 'LAGO PELLEGRINI', codigoPostal: '8305' },
    { localidad: 'LA GRANJA', codigoPostal: '8501' },
    { localidad: 'LAGUNA BLANCA', codigoPostal: '8417' },
    { localidad: 'LAGUNA CORTES', codigoPostal: '8520' },
    { localidad: 'LAGUNA DE LA PRUEBA', codigoPostal: '8520' },
    { localidad: 'LAGUNA DEL BARRO', codigoPostal: '8514' },
    { localidad: 'LAGUNA DEL CHASICO', codigoPostal: '8138' },
    { localidad: 'LAGUNA DEL MONTE', codigoPostal: '8514' },
    { localidad: 'LAGUNA FRIAS', codigoPostal: '8411' },
    { localidad: 'LAGUNA GUANACO', codigoPostal: '8422' },
    { localidad: 'LAGUNITA', codigoPostal: '8424' },
    { localidad: 'LA JUANITA (DARWIN, DPTO. AVELLANEDA)', codigoPostal: '8364' },
    { localidad: 'LA JUANITA (RIO COLORADO, DPTO. PICHI MAHUIDA)', codigoPostal: '8138' },
    { localidad: 'LA JULIA', codigoPostal: '8363' },
    { localidad: 'LA LUCINDA', codigoPostal: '8324' },
    { localidad: 'LA LUNA', codigoPostal: '8138' },
    { localidad: 'LA MARIA INES', codigoPostal: '8138' },
    { localidad: 'LAMARQUE', codigoPostal: '8363' },
    { localidad: 'LA MESETA', codigoPostal: '8500' },
    { localidad: 'LA MIMOSA', codigoPostal: '8417' },
    { localidad: 'LA MONTAÑESA', codigoPostal: '8138' },
    { localidad: 'LANQUIÑEO', codigoPostal: '8417' },
    { localidad: 'LA PAMPA', codigoPostal: '8138' },
    { localidad: 'LA PICASA', codigoPostal: '8303' },
    { localidad: 'LA PORTEÑA', codigoPostal: '8417' },
    { localidad: 'LA PRIMAVERA', codigoPostal: '8520' },
    { localidad: 'LA QUEBRADA', codigoPostal: '8412' },
    { localidad: 'LA RINCONADA', codigoPostal: '8424' },
    { localidad: 'LA RUBIA', codigoPostal: '8417' },
    { localidad: 'LA SARA', codigoPostal: '8360' },
    { localidad: 'LAS BAYAS', codigoPostal: '8412' },
    { localidad: 'LAS GRUTAS', codigoPostal: '8520' },
    { localidad: 'LA SIN BOMBO', codigoPostal: '8336' },
    { localidad: 'LAS MAQUINAS', codigoPostal: '8520' },
    { localidad: 'LAS MELLIZAS', codigoPostal: '8417' },
    { localidad: 'LAS MOCHAS', codigoPostal: '8534' },
    { localidad: 'LAS ÑATITAS', codigoPostal: '8324' },
    { localidad: 'LA TEODOLINA', codigoPostal: '8366' },
    { localidad: 'LA VENCEDORA', codigoPostal: '8417' },
    { localidad: 'LANZANIYEN', codigoPostal: '8424' },
    { localidad: 'LIPETREN', codigoPostal: '8534' },
    { localidad: 'LOMA BLANCA', codigoPostal: '8424' },
    { localidad: 'LOMA PARTIDA', codigoPostal: '8418' },
    { localidad: 'LOS CANTAROS', codigoPostal: '8411' },
    { localidad: 'LOS COSTEROS', codigoPostal: '8417' },
    { localidad: 'LOS JUNCOS (DPTO. PILCANIYEU)', codigoPostal: '8400' },
    { localidad: 'LOS JUNCOS (APEADERO FCGR) (MAQUINCHAO, DPTO. 25 DE MAYO)', codigoPostal: '8422' },
    { localidad: 'LOS MANANTIALES', codigoPostal: '8422' },
    { localidad: 'LOS MENUCOS (DPTO. 25 DE MAYO)', codigoPostal: '8424' },
    { localidad: 'LOS MOLINOS', codigoPostal: '8360' },
    { localidad: 'LOS PIRINEOS', codigoPostal: '8417' },
    { localidad: 'LOS QUEBRACHOS', codigoPostal: '8417' },
    { localidad: 'LOS REPOLLOS', codigoPostal: '8430' },
    { localidad: 'LOS SAUCES', codigoPostal: '8307' },
    { localidad: 'LUIS BELTRAN', codigoPostal: '8361' },
    { localidad: 'LUIS M. ZAGAGLIA', codigoPostal: '8503' },
    { localidad: 'LUPAY NIYEO', codigoPostal: '8332' },
    { localidad: 'LLAO LLAO', codigoPostal: '8409' },
    { localidad: 'MACACHIN', codigoPostal: '8536' },
    { localidad: 'MAINQUE', codigoPostal: '8326' },
    { localidad: 'MALLIN AHOGADO', codigoPostal: '8430' },
    { localidad: 'MAMUEL CHOIQUE', codigoPostal: '8415' },
    { localidad: 'MANCULLIQUE', codigoPostal: '8422' },
    { localidad: 'MANCHA BLANCA', codigoPostal: '8520' },
    { localidad: 'MAQUINCHAO', codigoPostal: '8422' },
    { localidad: 'MARI LAUQUEN', codigoPostal: '8422' },
    { localidad: 'MATA NEGRA', codigoPostal: '8500' },
    { localidad: 'MEDIA LUNA', codigoPostal: '8332' },
    { localidad: 'MENCUE', codigoPostal: '8417' },
    { localidad: 'MENUCO NEGRO', codigoPostal: '8534' },
    { localidad: 'MENUCO VACA MUERTA', codigoPostal: '8412' },
    { localidad: 'MICHI HONOCA', codigoPostal: '8333' },
    { localidad: 'MICHIHUAO', codigoPostal: '8417' },
    { localidad: 'MINISTRO RAMOS MEXIA', codigoPostal: '8534' },
    { localidad: 'MIRA PAMPA', codigoPostal: '8366' },
    { localidad: 'MONTE BAGUAL', codigoPostal: '8501' },
    { localidad: 'MONTE REDONDO', codigoPostal: '8138' },
    { localidad: 'MULANILLO', codigoPostal: '8417' },
    { localidad: 'MUSTERS', codigoPostal: '8536' },
    { localidad: 'NAHUEL NIYEU', codigoPostal: '8536' },
    { localidad: 'NAUPA HUEN', codigoPostal: '8313' },
    { localidad: 'NEGRO MUERTO', codigoPostal: '8360' },
    { localidad: 'NENEO RUCA (ESTACION FCGR)', codigoPostal: '8416' },
    { localidad: 'NILUAN', codigoPostal: '8422' },
    { localidad: 'NIRIHUAO (ESTACION FCGR)', codigoPostal: '8400' },
    { localidad: 'NITRALA MACOHUE', codigoPostal: '8418' },
    { localidad: 'NUEVA CAROLINA', codigoPostal: '8503' },
    { localidad: 'NUEVO LEON', codigoPostal: '8514' },
    { localidad: 'ÑIRIHUAO', codigoPostal: '8400' },
    { localidad: 'ÑORQUINCO', codigoPostal: '8415' },
    { localidad: 'OJOS DE AGUA (LLAO LLAO, DPTO. BARILOCHE)', codigoPostal: '8409' },
    { localidad: 'OJOS DE AGUA (EMBARC. FCGR, ING. JACOBACCI, DPTO.25 DE MAYO)', codigoPostal: '8418' },
    { localidad: 'PADRE ALEJANDRO STEFENELLI', codigoPostal: '8332' },
    { localidad: 'PAJALTA (APEADERO FCGR)', codigoPostal: '8536' },
    { localidad: 'PALENQUE NIYEU', codigoPostal: '8417' },
    { localidad: 'PANQUEHUAO', codigoPostal: '8412' },
    { localidad: 'PASO CORDOVA', codigoPostal: '8333' },
    { localidad: 'PASO CHACABUCO', codigoPostal: '8401' },
    { localidad: 'PASO DEL LIMAY', codigoPostal: '8403' },
    { localidad: 'PASO DE LOS MOLLES', codigoPostal: '8412' },
    { localidad: 'PASO FLORES', codigoPostal: '8403' },
    { localidad: 'PASO LEZCANO', codigoPostal: '8361' },
    { localidad: 'PASO MIRANDA', codigoPostal: '8403' },
    { localidad: 'PASO PEÑALVA', codigoPostal: '8363' },
    { localidad: 'PASO PIEDRA', codigoPostal: '8360' },
    { localidad: 'PATU CO', codigoPostal: '8333' },
    { localidad: 'PENINSULA HUEMUL', codigoPostal: '8400' },
    { localidad: 'PENINSULA SAN PEDRO', codigoPostal: '8401' },
    { localidad: 'PEÑAS BLANCAS', codigoPostal: '8307' },
    { localidad: 'PERCY H. SCOTT (APEADERO FCGR)', codigoPostal: '8520' },
    { localidad: 'PERITO MORENO', codigoPostal: '8416' },
    { localidad: 'PICHI LEUFU (APEADERO FCGR)', codigoPostal: '8412' },
    { localidad: 'PICHI LEUFU ABAJO', codigoPostal: '8412' },
    { localidad: 'PICHI LEUFU ARRIBA', codigoPostal: '8412' },
    { localidad: 'PICHI MAHUIDA', codigoPostal: '8138' },
    { localidad: 'PIEDRA BLANCA (SAN CARLOS DE BARILOCHE, DPTO. BARILOCHE)', codigoPostal: '8400' },
    { localidad: 'PIEDRA BLANCA (GRAL. ROCA, DPTO. GRAL. ROCA)', codigoPostal: '8332' },
    { localidad: 'PIEDRA CLAVADA', codigoPostal: '8536' },
    { localidad: 'PILAHUE', codigoPostal: '8417' },
    { localidad: 'PILCANIYEU', codigoPostal: '8412' },
    { localidad: 'PILCANIYEU VIEJO', codigoPostal: '8412' },
    { localidad: 'PLANICIE DE JAGUELITO', codigoPostal: '8333' },
    { localidad: 'PLAYA BONITA', codigoPostal: '8400' },
    { localidad: 'POMONA', codigoPostal: '8363' },
    { localidad: 'PORTEZUELO', codigoPostal: '8415' },
    { localidad: 'POZO MORO', codigoPostal: '8520' },
    { localidad: 'POZO SALADO', codigoPostal: '8514' },
    { localidad: 'PRAHUANIYEU', codigoPostal: '8424' },
    { localidad: 'PRIMERA ANGOSTURA', codigoPostal: '8505' },
    { localidad: 'PRONUNCIAMIENTO', codigoPostal: '8505' },
    { localidad: 'PUEBLO VIEJO', codigoPostal: '8332' },
    { localidad: 'PUERTO BLEST', codigoPostal: '8411' },
    { localidad: 'PUERTO HERMOSO', codigoPostal: '8422' },
    { localidad: 'PUERTO MORENO', codigoPostal: '8400' },
    { localidad: 'PUERTO OJO DE AGUA', codigoPostal: '8401' },
    { localidad: 'PUERTO PAÑUELO', codigoPostal: '8409' },
    { localidad: 'PUERTO PICHI MAHUIDA', codigoPostal: '8400' },
    { localidad: 'PUERTO SANTA MARIA', codigoPostal: '8401' },
    { localidad: 'PUERTO TIGRE', codigoPostal: '8400' },
    { localidad: 'PUESTO FARIA', codigoPostal: '8360' },
    { localidad: 'PUESTO GAVIÑA', codigoPostal: '8503' },
    { localidad: 'PUNTA DE AGUA', codigoPostal: '8356' },
    { localidad: 'QUEMPU NIYEU', codigoPostal: '8332' },
    { localidad: 'QUETREQUILE', codigoPostal: '8418' },
    { localidad: 'QUINIÑAU', codigoPostal: '8415' },
    { localidad: 'QUINTA PANAL', codigoPostal: '8416' },
    { localidad: 'QUO VADIS', codigoPostal: '8422' },
    { localidad: 'RAYHUAO', codigoPostal: '8412' },
    { localidad: 'REPOLLOS', codigoPostal: '8415' },
    { localidad: 'RINCONADA', codigoPostal: '8360' },
    { localidad: 'RINCON DE GASTRE', codigoPostal: '8503' },
    { localidad: 'RIO COLORADO', codigoPostal: '8138' },
    { localidad: 'RIO CHICO', codigoPostal: '8415' },
    { localidad: 'RIO NIRIHUANO', codigoPostal: '8400' },
    { localidad: 'RIO VILLEGAS', codigoPostal: '8401' },
    { localidad: 'RIVADAVIA', codigoPostal: '8418' },
    { localidad: 'RUCU LUAN', codigoPostal: '8422' },
    { localidad: 'RUTA 3 KILOMETRO 974', codigoPostal: '8500' },
    { localidad: 'SACO VIEJO', codigoPostal: '8514' },
    { localidad: 'SALITRAL NEGRO', codigoPostal: '8363' },
    { localidad: 'SAN ANTONIO DEL CUY', codigoPostal: '8333' },
    { localidad: 'SAN ANTONIO OESTE', codigoPostal: '8520' },
    { localidad: 'SAN CARLOS DE BARILOCHE', codigoPostal: '8400' },
    { localidad: 'SAN CAYETANO', codigoPostal: '8138' },
    { localidad: 'SAN EDUARDO', codigoPostal: '8332' },
    { localidad: 'SAN JAVIER', codigoPostal: '8501' },
    { localidad: 'SAN JORGE', codigoPostal: '8324' },
    { localidad: 'SAN JOSE DE PAJA ALTA', codigoPostal: '8536' },
    { localidad: 'SAN JUAN (GRAL. CONESA, DPTO. CONESA)', codigoPostal: '8503' },
    { localidad: 'SAN JUAN (RIO COLORADO, DPTO. PICHI MAHUIDA)', codigoPostal: '8138' },
    { localidad: 'SAN LEON', codigoPostal: '8138' },
    { localidad: 'SAN LORENZO', codigoPostal: '8503' },
    { localidad: 'SAN PABLO', codigoPostal: '8364' },
    { localidad: 'SAN PEDRO (RIO COLORADO, DPTO. PICHI MAHUIDA)', codigoPostal: '8138' },
    { localidad: 'SAN PEDRO (PILCANIYEU, DPTO. PILCANIYEU)', codigoPostal: '8412' },
    { localidad: 'SAN RAMON', codigoPostal: '8416' },
    { localidad: 'SAN SIMON', codigoPostal: '8503' },
    { localidad: 'SANTA ANA', codigoPostal: '8138' },
    { localidad: 'SANTA ELENA', codigoPostal: '8417' },
    { localidad: 'SANTA GENOVEVA', codigoPostal: '8363' },
    { localidad: 'SANTA GREGORIA', codigoPostal: '8364' },
    { localidad: 'SANTA JULIA', codigoPostal: '8366' },
    { localidad: 'SANTA NICOLASA', codigoPostal: '8364' },
    { localidad: 'SAUCE BLANCO (GUARDIA MITRE, DPTO. ADOLFO ALSINA)', codigoPostal: '8505' },
    { localidad: 'SAUCE BLANCO (CHOELE CHOEL, DPTO. AVELLANEDA)', codigoPostal: '8360' },
    { localidad: 'SEGUNDA ANGOSTURA', codigoPostal: '8501' },
    { localidad: 'SIERRA BLANCA', codigoPostal: '8534' },
    { localidad: 'SIERRA COLORADA', codigoPostal: '8534' },
    { localidad: 'SIERRA DE LA VENTANA', codigoPostal: '8521' },
    { localidad: 'SIERRA GRANDE', codigoPostal: '8532' },
    { localidad: 'SIERRA PAILEMAN', codigoPostal: '8521' },
    { localidad: 'TALCAHUALA (APEADERO FCGR)', codigoPostal: '8534' },
    { localidad: 'TAPILUQUE', codigoPostal: '8534' },
    { localidad: 'TENIENTE GRAL. EUSTAQUIO FRIAS', codigoPostal: '8501' },
    { localidad: 'TENIENTE MAZA (ESTACION FCGR)', codigoPostal: '8534' },
    { localidad: 'TERCERA ZONA', codigoPostal: '8336' },
    { localidad: 'TRAGUA TRAGUA', codigoPostal: '8360' },
    { localidad: 'TRAVESIA CASTRO', codigoPostal: '8503' },
    { localidad: 'TRECA-CO', codigoPostal: '8333' },
    { localidad: 'TRENETA', codigoPostal: '8534' },
    { localidad: 'TRES OJOS DE AGUA', codigoPostal: '8416' },
    { localidad: 'TRICACO', codigoPostal: '8332' },
    { localidad: 'TROMENIYEU', codigoPostal: '8422' },
    { localidad: 'TUNKELEN', codigoPostal: '8409' },
    { localidad: 'VACA LAUQUEN', codigoPostal: '8422' },
    { localidad: 'VALCHETA', codigoPostal: '8536' },
    { localidad: 'VALLE AZUL', codigoPostal: '8336' },
    { localidad: 'VALLE DE LOS ALAMOS', codigoPostal: '8307' },
    { localidad: 'VICEALMIRANTE EDUARDO O’CONNOR (ESTACION FCGR)', codigoPostal: '8514' },
    { localidad: 'VIEDMA', codigoPostal: '8500' },
    { localidad: 'VILLA ALBERDI', codigoPostal: '8336' },
    { localidad: 'VILLA LLANQUIN', codigoPostal: '8401' },
    { localidad: 'VILLA MASCARDI', codigoPostal: '8401' },
    { localidad: 'VILLA REGINA', codigoPostal: '8336' },
    { localidad: 'VILLA TURISMO', codigoPostal: '8430' },
    { localidad: 'YUQUINCHE', codigoPostal: '8418' },
    { localidad: 'ZANJON DE OYUELA', codigoPostal: '8501' },

  ];


  updatePostalCode(event: any) {
    const selectedLocality = event.target.value;
    const selectedObject = this.localidades.find(item => item.localidad === selectedLocality);
    if (selectedObject) {
      this.formularioReclamo.patchValue({
        localidad: selectedObject.localidad, // si quieres mostrar el nombre de la localidad seleccionada en el campo de selección
        codigoPostal: selectedObject.codigoPostal
      });
    }
  }




  ngOnInit(): void {
    this.showWelcomePopup();
    this.formularioReclamo = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: [''],

      checkNombrePropio: [false],
      nombreRepresentante: [''],
      apellidoRepresentante: [''],
      dniRepresentante: [''],

      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      codigoPostal: ['', Validators.required],

      direccionAlternativa: [''],
      localidadAlternativa: [''],
      codigoPostalAlternativo: [''],


      nis: [''],
      numeroDeCliente: [''],

      email: [''],


      errorFacturacion: [false],
      resarcimiento: [false],
      suspencionSuministro: [false],
      malaAtencionComercial: [false],
      negativaConexion: [false],
      inconvenienteTension: [false],
      facturaFueraDeTermino: [false],

      descripcion: [''],

      emailNotifications: [false],



      files: ['']
    });
    this.checkboxService.getCheckboxState().subscribe((state) => {
      // console.log('Estado actual de los checkboxes:', state);
      // this.isDisabled = !state;
      this.isButtonDisabled = !state;
    });

  }

  showWelcomePopup() {
     Swal.fire({
      title: '¡Bienvenido!',
      html: '<h2>Por favor, complete todos los campos antes de enviar el formulario.<br> <FONT color="red">Los Campos con (*) son OBLIGATORIOS</FONT></h2>',
      icon: 'warning',
      confirmButtonText: 'Entendido'
    });
  }


  isChecked1: boolean = false;

  isChecked2: boolean = false;
  isChecked3: boolean = false;

  toggleEmailInput() {
    const emailControl = this.formularioReclamo.get('email');
    if (emailControl && !this.isChecked2) {
      emailControl.setValue(null);
    }
    this.isChecked2 = !this.isChecked2;
  }
  togglecheckNombrePropioInput() {
    this.isChecked3 = !this.isChecked3;
  }


  //CHECKBOX DE COINCIDE CON DATOS 
  isChecked: boolean = false;




  copiarLocalidad(event: any) {
    const localidadValue = this.formularioReclamo.get('localidad')?.value;
    if (event.target.checked && localidadValue) {
      this.formularioReclamo.get('localidadAlternativa')?.setValue(localidadValue);
    } else {
      this.formularioReclamo.get('localidadAlternativa')?.setValue('');
    }
  }
  copiarCodigoPostal() {
    const codigoPostalValue = this.formularioReclamo.get('codigoPostal')?.value;
    if (this.isChecked && codigoPostalValue) {
      this.formularioReclamo.get('codigoPostalAlternativo')?.setValue(codigoPostalValue);
    } else {
      this.formularioReclamo.get('codigoPostalAlternativo')?.setValue('');
    }
  }
  copiarDireccion() {
    const direccionValue = this.formularioReclamo.get('direccion')?.value;
    if (this.isChecked && direccionValue) {
      this.formularioReclamo.get('direccionAlternativa')?.setValue(direccionValue);
    } else {
      this.formularioReclamo.get('direccionAlternativa')?.setValue('');
    }
  }





  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
    this.copiarLocalidad(event);
    this.copiarCodigoPostal();
    this.copiarDireccion();
  }






  private showSweetAlertSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Enviado!...',
      text: 'Se han enviado sus datos, gracias!',

    });
  }







  onSubmit() {

    if (this.formularioReclamo.valid) {

      // console.log('Valor de descripcion:', this.formularioReclamo.value.descripcion);

      const formData = new FormData();

      Object.keys(this.formularioReclamo.value).forEach((key) => {
        const value = this.formularioReclamo.value[key];

        // Verificar si es un array antes de intentar iterar
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      // console.log('Archivos seleccionados:', this.files);

      if (this.files.length > 0) {
        this.files.forEach((file, index) => {
          formData.append('files', file, file.name);
        });
      } else {
        // console.log('No se han seleccionado archivos');
      }

      console.log('FormData:', formData);

      this.showSweetAlertSuccess();

      this.emailService.sendEmailWithAttachment(formData).subscribe(
        (response) => {
          // console.log('Correo electrónico enviado con éxito', response);
        },
        (error) => {
          // console.error('Error al enviar el correo electrónico:', error);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        html: '<h1><FONT color="red">Por favor, complete todos los campos obligatorios antes de enviar el formulario.</FONT></h1>',
      });
    }

  }



  checkboxChanged(checkboxData: any) {
    this.formularioReclamo.patchValue(checkboxData);
  }

  onFileSelected(files: FileList) {
    this.files = Array.from(files);
  }
  openPopup(): void {
    const dialogRef = this.dialog.open(EasterComponent, {
      width: '480px', 
      height:'550px',
      
    });
  }


}




























// updatePostalCodeAlternativo(event:any){
//   const selectedLocalidadAlternativa = event.target.value;
//   const selectedObjectAlternativo = this.localidadesAlternativas2.find(item => item.localidad2 === selectedLocalidadAlternativa);
//   if(selectedObjectAlternativo){
//     this.formularioReclamo.patchValue({
//       localidad2: selectedObjectAlternativo.localidad2,
//       codigoPostal2: selectedObjectAlternativo.codigoPostal2
//     });
//   }
// }