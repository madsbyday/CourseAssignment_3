/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

/**
 * REST Web Service
 *
 * @author vfgya_000
 */
@Path("users")
public class UsersResource {
    
    private EntityManagerFactory emf;

    public UsersResource() {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
    }

    @Context
    private UriInfo context;

    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllUser() {
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
