class Cadastro{

    constructor(){

        this.id=1;
        this.arrayCadastros = [];
        this.editId= null;
    }

    cadastrar(e){

        e.preventDefault();

        let cadastro = this.lerDados();

        if(this.validaCampos(cadastro)== true) {
            if(this.editId == null) {
                this.adicionar(cadastro);
            } else{
                this.atualizar(this.editId, cadastro);
            }
            
        }
        console.log(e);
        console.log(this.arrayCadastros);

        this.listaTabela();
        this.cancelar();

    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText= '';

        for(let i= 0; i < this.arrayCadastros.length; i++ ) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_senha = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayCadastros[i].id;
            td_nome.innerText = this.arrayCadastros[i].nomeUsuario;
            td_email.innerText = this.arrayCadastros[i].emailUser;
            td_senha.innerText = this.arrayCadastros[i].senhaUser;

            let imgD =document.createElement('img');
            imgD.src= 'img/trash-alt-solid.svg';

            imgD.setAttribute("onclick", "cadastro.deletar("+ this.arrayCadastros[i].id + ")");

            let imgE =document.createElement('img');
            imgE.src= 'img/pen-square-solid.svg';

            imgE.setAttribute("onclick", "cadastro.pEditar("+ JSON.stringify(this.arrayCadastros[i]) + ")");

            td_acoes.appendChild(imgE);
            td_acoes.appendChild(imgD);

            console.log(this.arrayCadastros);

        }
    }

    adicionar(cadastro){
        this.arrayCadastros.push(cadastro);
        this.id++;
    }

    atualizar(id, cadastro){
        for(let i =0; i < this.arrayCadastros.length; i++){
            if(this.arrayCadastros[i].id == id){
                this.arrayCadastros[i].nomeUsuario = cadastro.nomeUsuario;
                this.arrayCadastros[i].emailUser = cadastro.emailUser;
                this.arrayCadastros[i].senhaUser = cadastro.senhaUser;
            }
        }

    }

    pEditar(dados){
        this.editId = dados.id;

        document.getElementById('nome').value = dados.nomeUsuario;
        document.getElementById('em').value = dados.emailUser;
        document.getElementById('senha').value = dados.senhaUser;

        document.getElementById('btn1').innerHTML ='Atualizar';
    }

    lerDados(){
        let cadastro = {}

        cadastro.id= this.id;
        cadastro.nomeUsuario= document.getElementById('nome').value;
        cadastro.emailUser= document.getElementById('em').value;
        cadastro.senhaUser= document.getElementById('senha').value;
        
        return cadastro;
    }

    validaCampos(cadastro){
        let msg='';

        if(cadastro.nomeUsuario == '') {
            msg += 'Infome nome \n'
        }

        if(cadastro.emailUser == '') {
            msg += 'Infome email \n'
        }

        if(cadastro.senhaUser == '') {
            msg += 'Infome senha \n'
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true;

    }

    cancelar(){
        document.getElementById('nome').value = '';
        document.getElementById('em').value = '';
        document.getElementById('senha').value = '';

        document.getElementById('btn1').innerText = 'Cadastrar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Deseja deletar o cadastro do ID ' + id)){

        }
        let tbody = document.getElementById('tbody');

        for(let i =0; i < this.arrayCadastros.length; i++){
           if(this.arrayCadastros[i].id == id){
               this.arrayCadastros.splice(i,1);
               tbody.deleteRow(i);
            } 
        }

        console.log(this.arrayCadastros);
            
            
   
    }

    
}

var cadastro = new Cadastro();