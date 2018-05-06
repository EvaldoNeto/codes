package softville.zero.to.one.clientes;

import kikaha.core.test.KikahaRunner;
import lombok.val;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.inject.Inject;

@RunWith(KikahaRunner.class)
public class ClienteQueriesTest {

    @Inject ClienteQueries clienteQueries;

    @Test
    public void getAllClients(){
        val clientes = clienteQueries.listarTodosClientes();
        System.out.println(clientes);

        for(val c : clientes){
            val msg = "id:" + c.id + " nome: " + c.nome + " email: " + c.email;
            System.out.println(msg);
        }
    }

    /*@Test
    public void inserirCliente(){
        val cliente = new Cliente();
        cliente.nome = "Mopa";
        cliente.email = "mopa@mozo.com";
        clienteQueries.inserirCliente(cliente);
    }*/
}