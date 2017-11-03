/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Place;
import entity.Rating;
import facades.PlaceFacade;
import java.sql.SQLException;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Sanox
 */
@Path("place")
public class PlaceResource {

    @Context
    private UriInfo context;

    private EntityManagerFactory emf;

    public PlaceResource() {
        emf = Persistence.createEntityManagerFactory("pu_development");
    }
    ;

    PlaceFacade pf = new PlaceFacade();

    /**
     * Retrieves representation of an instance of rest.PlaceResource
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/all")
    public String getPlaces() {
        List<Place> places = pf.getPlaces();
        return new Gson().toJson(places);

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("single/{id}")
    public String getPlaceByID(@PathParam("id") int id) {

        Place p = pf.getPlaceByID(id);

        return new Gson().toJson(p);
    }

    @Path("/rate")
    @RolesAllowed("User")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)

    public String submitRating(String context) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        EntityManager em = emf.createEntityManager();
        Rating r = null;

        JsonObject body = new JsonParser().parse(context).getAsJsonObject();
        int placeID = 0;
        String userName = null;
        int rating = 0;

        if (body.has("placeID")) {
            placeID = body.get("placeID").getAsInt();
        }
        if (body.has("userName")) {
            userName = body.get("userName").getAsString();
        }
        if (body.has("rating")) {
            rating = body.get("rating").getAsInt();
        }
        boolean allow = IsUserRate(placeID, userName, rating);
        if (allow == true) {
            try {
                em.getTransaction().begin();
                entity.User u = em.find(entity.User.class, userName);
                Place p = em.find(Place.class, placeID);
                p.setRating(updateRating(p.getId(), rating));
                r = new Rating(u, p, rating);
                em.persist(r);
                em.getTransaction().commit();

            } finally {
                em.close();
            }
        }
        return new Gson().toJson(r);
    }

    public Boolean IsUserRate(int pId, String username, int rating) {
        EntityManager em = emf.createEntityManager();

        List<Rating> ratings = null;

        Boolean exist = true;

        Rating ratingR;

        try {
            ratings = em.createQuery("SELECT r FROM Rating r WHERE r.user.userName ='" + username + "' AND r.place.id  = " + pId + " ").getResultList();
            //ratings = em.createQuery()
        } catch (Exception e) {

        }
        if (!(ratings.isEmpty())) {
            exist = false;
            try {
                em.getTransaction().begin();

                ratingR = em.find(Rating.class, ratings.get(0).getId());

                ratingR.setRate(rating);

                em.getTransaction().commit();
            } finally {
                em.close();
            }
        }
        return exist;

    }

    public int updateRating(int id, int newRating) {
        EntityManager em = emf.createEntityManager();
        List<Integer> ratings;
        try {
            ratings = em.createQuery("SELECT r.rate FROM Rating r WHERE r.place.id = " + id).getResultList();
        } finally {
            em.close();
        }
        int sum = 0;
        for (Integer rating : ratings) {
            sum += rating;
        }
        int average = (sum + newRating) / (ratings.size() + 1);

        return average;

    }

    @RolesAllowed("User")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public String registerPlace(String context) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        Place p = null;

        EntityManager em = emf.createEntityManager();
        JsonObject body = new JsonParser().parse(context).getAsJsonObject();
        String GPS = null;
        String address = null;
        String description = null;
        String imguri = null;
        String name = null;

        if (body.has("GPS")) {
            GPS = body.get("GPS").getAsString();
        }
        if (body.has("address")) {
            address = body.get("address").getAsString();
        }
        if (body.has("description")) {
            description = body.get("description").getAsString();
        }
        if (body.has("imguri")) {
            imguri = body.get("imguri").getAsString();
        }
        if (body.has("name")) {
            name = body.get("name").getAsString();
        }

        try {
            em.getTransaction().begin();
            p = new Place(name, address, GPS, description, 0, imguri);
            em.persist(p);
            em.getTransaction().commit();

        } finally {
            em.close();
        }
        return new Gson().toJson(p);
    }

}
