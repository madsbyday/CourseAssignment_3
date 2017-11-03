/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facades;

import entity.Place;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class PlaceFacade {

    private EntityManagerFactory emf;

    public PlaceFacade() {
        this.emf = Persistence.createEntityManagerFactory("pu_development");
    }

    public List<Place> getPlaces() {
        EntityManager em = emf.createEntityManager();

        List<Place> places;

        try {
            places = em.createQuery("SELECT p FROM Place p").getResultList();
        } finally {
            em.close();
        }
        return places;
    };

    public Place getPlaceByID(int id) {
        EntityManager em = emf.createEntityManager();

        Place p;

        try {
            em.getTransaction().begin();
            p = em.find(Place.class, id);
        } finally {
            em.close();
        }

        return p;

    }
}

