package rest;

import com.google.gson.Gson;
import facades.UserFacade;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("admin")
//@RolesAllowed("Admin")
public class Admin {

    private EntityManagerFactory emf;

    public Admin() {
        emf = Persistence.createEntityManagerFactory("pu_development");
    }


}
