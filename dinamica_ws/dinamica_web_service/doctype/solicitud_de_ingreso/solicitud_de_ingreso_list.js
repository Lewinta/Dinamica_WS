frappe.listview_settings['Solicitud de Ingreso'] = {
    "add_fields": ["status", "docstatus"],
    "onload": (listview) => {
        
    },
    "get_indicator": (doc) => {
        if (doc.status === "Nueva") {
            return ["Nueva", "orange", "status,=,Nueva"]
        } else if (doc.status === "Aprobada") {
            return ["Aprobada", "green", "status,=,Aprobada"]
        } else if (doc.status === "Denegada") {
            return ["Denegada", "red", "status,=,Denegada"]
        } 
    }
}