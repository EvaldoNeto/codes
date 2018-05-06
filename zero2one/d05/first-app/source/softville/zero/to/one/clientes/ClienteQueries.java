package softville.zero.to.one.clientes;

import kikaha.jdbi.JDBI;
import kikaha.urouting.api.PathParam;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

@JDBI
public interface ClienteQueries {
    String SELECT_CLIENTES = "SELECT * FROM Clientes",
        INSERT_CLIENTES = "INSERT INTO Clientes(NOME, EMAIL) VALUES (:nome, :email)",
        GET_CLIENT = "SELECT * FROM Clientes WHERE ID = :id",
        UPDATE_CLIENT = "UPDATE Clientes SET NOME = :nome, EMAIL = :email WHERE ID = :idCliente",
        DELETE_CLIENT = "DELETE FROM Clientes WHERE ID = :id";

    @SqlQuery( SELECT_CLIENTES )
    List<Cliente> listarTodosClientes();

    @SqlQuery( GET_CLIENT )
    Cliente getClienteById(
            @Bind("id") long id
    );

    @SqlUpdate( DELETE_CLIENT )
    void deleteClient(
            @Bind("id") long id
    );

    @SqlUpdate( UPDATE_CLIENT )
    void updateClientViaId(
            @Bind("idCliente") long idCliente,
            @BindBean Cliente cliente
    );

    @GetGeneratedKeys
    @SqlUpdate( INSERT_CLIENTES )
    long inserirCliente(
            @BindBean Cliente cliente
    );
}
