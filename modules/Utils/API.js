const URL_list_movies='https://yts.mx/api/v2/list_movies.json';
const URL_Login='https://ProyectoClinica.somee.com/Login/LoginMovil';
const URL_agregarPaciente='https://ProyectoClinica.somee.com/Login/RegistroMovil';
const URL_editarPaciente='https://ProyectoClinica.somee.com/Login/EditarMovil';

class API{
    async getData(){
        const query= await fetch(URL_list_movies);
        const data=query.json();
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