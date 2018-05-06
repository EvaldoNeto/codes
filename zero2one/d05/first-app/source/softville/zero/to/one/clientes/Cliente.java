package softville.zero.to.one.clientes;


import kikaha.jdbi.serializers.Column;
import kikaha.jdbi.serializers.Entity;
import kikaha.jdbi.serializers.Optional;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Cliente {
    @Optional @Column("ID") long id;
    @Column("NOME") String nome;
    @Column("EMAIL") String email;

    @Override
    public String toString(){
        return "Cliente com nome: " + nome;
    }

}