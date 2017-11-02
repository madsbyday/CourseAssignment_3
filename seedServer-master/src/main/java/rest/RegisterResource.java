/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Role;
import java.util.List;
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
import javax.ws.rs.core.Response;
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

    private EntityManagerFactory emf;

    public RegisterResource() {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public entity.User registerUser(String context) throws PasswordStorage.CannotPerformOperationException {
        
        entity.User u = null;

        EntityManager em = emf.createEntityManager();

        JsonObject body = new JsonParser().parse(context).getAsJsonObject();

        String username = null;

        String password = null;

        if (body.has("username")) {
            username = body.get("username").getAsString();
        }

        if (body.has("password")) {
            password = body.get("password").getAsString();
        }

        try {
            em.getTransaction().begin();

            u = new entity.User(username, password);
            u.addRole(getUserRole());
            em.persist(u);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
         //return Response.status(200).header("Access-Control-Allow-Origin", "*").entity(new Gson().toJson(u)).build();
        return u;
    }

    public Role getUserRole() {
        EntityManager em = emf.createEntityManager();
        
        Role r;
        try {
            em.getTransaction().begin();
            r = em.find(Role.class, "user");
        }
        finally {
            em.close();
        }

        return r;

    }
}
