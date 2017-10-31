/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import security.PasswordStorage;

/**
 * REST Web Service
 *
 * @author vfgya_000
 */
@Path("register")
public class RegisterResource {

    @Context
    private UriInfo context;
   
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public void registerUser(String context) throws PasswordStorage.CannotPerformOperationException {
        
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        
        EntityManager em = emf.createEntityManager();
        
        JsonObject body = new JsonParser().parse(context).getAsJsonObject();
        
        String username = null;
        
        String password = null;
        
        if (body.has("username"))
        {
            username = body.get("username").getAsString();
        }
        
        if (body.has("password")) {
            password = body.get("password").getAsString();
        }
        
        try
        {
            em.getTransaction().begin();
            entity.User u = new entity.User(username, password);
            em.persist(u);
            em.getTransaction().commit();
        } finally
        {
            em.close();
        }
    }

}
