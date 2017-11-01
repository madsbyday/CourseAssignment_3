/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import entity.Place;
import facades.PlaceFacade;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
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

    /**
     * Creates a new instance of PlaceResource
     */
    public PlaceResource() {

    }
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
    public String getPlace(@PathParam("id") int id) {
        
        Place p = pf.getPlaceByID(id);
        
        return new Gson().toJson(p);

    }

}
