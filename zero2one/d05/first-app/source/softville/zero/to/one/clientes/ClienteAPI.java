package softville.zero.to.one.clientes;

import kikaha.urouting.api.*;

import javax.inject.Inject;
import java.util.List;

@Path("/api/clientes")
public class ClienteAPI {

    @Inject ClienteQueries clienteQueries;

    @GET
    public List<Cliente> listarTodosClientes(){
        return clienteQueries.listarTodosClientes();
    }

    @GET
    @Path("{id}")
    public Cliente getClientById(
            @PathParam("id") long idCliente
    ){
        return clienteQueries.getClienteById(idCliente);
    }

    @POST
    @Path("inserir")
    public Response inserirCliente(Cliente cliente){
        long id = clienteQueries.inserirCliente(cliente);
        return DefaultResponse.created();
        //return DefaultResponse.ok().statusCode(201).header("ID", id + "");
    }

    @PUT
    @Path("{id}")
    public void updateCliente(@PathParam("id") long idCliente, Cliente cliente){
        clienteQueries.updateClientViaId(idCliente, cliente);
    }

    @DELETE
    @Path("{id}")
    public void deleteClient(@PathParam("id") long idClient){
        clienteQueries.deleteClient(idClient);
    }
}
