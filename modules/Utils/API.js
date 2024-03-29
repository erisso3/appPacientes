
const URL_list_doctores = 'https://ProyectoClinica.somee.com/Doctor/ListarDoctores';
const URL_agendar_cita = 'https://ProyectoClinica.somee.com/Citas/AgendarCita';
const URL_list_citas = 'https://ProyectoClinica.somee.com/Citas/MisCitas';
const URL_Login='https://ProyectoClinica.somee.com/Login/LoginMovil';
const URL_agregarPaciente='https://ProyectoClinica.somee.com/Login/RegistroMovil';
const URL_editarPaciente='https://ProyectoClinica.somee.com/Login/EditarMovil';

class API {
    async getDoctores() {
        const query = await fetch(URL_list_doctores,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = query.json();
        return data;
    }

    async sendCita(datos) {
        
        const query = await fetch(URL_agendar_cita,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_paciente: datos.id_paciente,
                    id_doctor: datos.id_doctor,
                    fecha: datos.fecha,
                    hora: datos.hora,
                    observacion: datos.observacion
                })
            }
        );
        const data = query.json();
        return data;
    }

    async getCitas(id) {
        console.log(id);
        const query = await fetch(URL_list_citas,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }
        );
        const data = query.json();
        return data;
    }
    async Login(data){
        const query= await fetch(URL_Login,{
            method:'POST',
            body:data
        });
        return query.json();
    }

    async agregarPaciente(data){
        const query= await fetch(URL_agregarPaciente,{
            method:'POST',
            body:data
        });
        return query.json();
    }

    async editarPaciente(data){
        const query= await fetch(URL_editarPaciente,{
            method:'POST',
            body:data
        });
        return query.json();
    }
}

export default new API();