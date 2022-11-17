// Copyright (c) 2020, Lewin Villar and contributors
// For license information, please see license.txt

frappe.ui.form.on('Solicitud de Ingreso', {
	refresh: frm => {

	},
	nombres: frm => {
		frm.set_value("nombres", upper(frm.doc.nombres));
		frm.trigger('set_nombre_completo');
	},
	apellidos: frm => {
		frm.set_value("apellidos", upper(frm.doc.apellidos));
		frm.trigger('set_nombre_completo');

	},
	nombre_completo_pareja: frm => {
		frm.set_value(
			"nombre_completo_pareja", 
			upper(frm.doc.nombre_completo_pareja)
		);
	},
	set_nombre_completo: frm => 
	{
		var name = `${frm.doc.nombres} ${frm.doc.apellidos}`.trim();
		frm.set_value("nombre_completo", name)
	},
	cedula: frm => {
		if (!frm.doc.cedula)
			return
		frm.set_value("cedula", mask_ced_pas_rnc(frm.doc.cedula));
	},
	cedula_pareja: frm => {
		if (!frm.doc.cedula_pareja)
			return
		frm.set_value("cedula_pareja", mask_ced_pas_rnc(frm.doc.cedula_pareja));
	},
	telefono: frm => {
		if (!frm.doc.telefono)
			return
		frm.set_value("telefono", mask_phone(frm.doc.telefono));
	},
	celular: frm => {
		if (!frm.doc.celular)
			return
		frm.set_value("celular", mask_phone(frm.doc.celular));
	},
	otro: frm => {
		if (!frm.doc.otro)
			return
		frm.set_value("otro", mask_phone(frm.doc.otro));
	}
});

function upper(str){
	if (!str)
		return ""
	else
		return	str.toUpperCase().trim()
}

function valida_cedula(ced) {
    var c = ced.replace(/-/g, '');
    var Cedula = c.substr(0, c.length - 1);
    var Verificador = c.substr(c.length - 1, 1);
    var suma = 0;

    if (c.length < 11) {
        frappe.msgprint("La Cedula ingresada no es valida!")
        return undefined
    }

    for (i = 0; i < Cedula.length; i++) {
        mod = "";
        /*
            se evaluan la posicion en la que esta cada digito, si esta en una
            posicion par el multiplicador sera 1 de lo contrario el 
            multiplicador sera 2
            Ex. 12121212121
            223-0087201-1
        */
        if ((i % 2) == 0) {
            mod = 1
        } else {
            mod = 2
        }
        //luego se multiplica el valor de la posicion con su multiplicador
        res = Cedula.substr(i, 1) * mod;
        /* en caso de que el multiplicador sea mayor que 9 se suman ambos 
            digitos
            Ex. res = 14 entonces sumamos 1 + 4 = 5
            luego acumulamos el reultado
         */
        if (res > 9) {
            res = res.toString();
            uno = res.substr(0, 1);
            dos = res.substr(1, 1);
            res = eval(uno) + eval(dos);
        }
        suma += eval(res);
    }
    /*
        luego a 10 le restamos el modulo del acumulativo, 
    */
    el_numero = (10 - (suma % 10)) % 10;
    if (el_numero == Verificador && Cedula.substr(0, 3) != "000") {
        return "{0}{1}{2}-{3}{4}{5}{6}{7}{8}{9}-{10}".format(c)
    } else {
        frappe.msgprint("La Cedula ingresada no es valida!")
        return undefined
    }
}

function mask_ced_pas_rnc(input)
{
    if (!input)
    	return
    
    input = input.trim().replace(/-/g,"")
    
    if (input.length == 11)
        return ("{0}{1}{2}-{3}{4}{5}{6}{7}{8}{9}-{10}".format(input));

    if (input.length == 9)
        return ("{0}-{1}{2}-{3}{4}{5}{6}{7}-{8}".format(input));
    
    return valida_cedula(input)
}

function mask_phone(phone)
{
    temp = phone.trim().replace(/-/g,"")

    if (temp.length == 10)
        return ("({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}".format(temp));
    else
        return phone;

    /*var pattern = new RegExp("((^[0-9]{3})[0-9]{3}[0-9]{4})$");
    var pattern1 = new RegExp("([(][0-9]{3}[)] [0-9]{3}-[0-9]{4})$");
    var pattern2 = new RegExp("([(][0-9]{3}[)][0-9]{3}-[0-9]{4})$");

    if(pattern.test(phone))
        return ("({0}{1}{2}) {3}{4}{5}-{6}{7}{8}{9}".format(phone));
    else if(pattern1.test(phone))
        return phone;
    else if(pattern2.test(phone))
        return ("{0}{1}{2}{3}{4} {5}{6}{7}{8}{9}{10}{11}{12}".format(phone));*/
}

String.prototype.format = function () {
    "use strict";

    var formatted = this;
    for (var prop in arguments[0]) {
        if (arguments[0].hasOwnProperty(prop)) {
            var regexp = new RegExp("\\{" + prop + "\\}", "gi");
            formatted = formatted.replace(regexp, arguments[0][prop]);
        }
    }
    return formatted;
};
