package rest;

import com.google.gson.Gson;
import facades.UserFacade;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Path("admin")
@RolesAllowed("Admin")
public class Admin {

    private EntityManagerFactory emf;

    public Admin() {
        emf = Persistence.createEntityManagerFactory("pu_development");
    };
      

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("all")
    public String getAllUsers() {
        EntityManager em = emf.createEntityManager();

        List<String> users;

        try {
            users = em.createQuery("SELECT u.userName FROM SEED_USER u").getResultList();
        } finally {
            em.close();
        }
        JSONArray jsonArray = new JSONArray();

        for (int i = 0; i < users.size(); i++) {
            JSONObject jsonObj = new JSONObject();
            jsonObj.put("username", users.get(i));

            jsonArray.add(jsonObj);
        }
        return jsonArray.toJSONString();

    }

}
