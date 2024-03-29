package com.wade.spring.demo.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.wade.spring.demo.backend.entity.Book;
import com.wade.spring.demo.backend.entity.Message;
import com.wade.spring.demo.backend.entity.Review;

@Configuration
public class SpringDataRestConfig implements RepositoryRestConfigurer {

  private String theAllowedOrigins = "http://localhost:3000";

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
      CorsRegistry cors) {
    HttpMethod[] theUnsupportedActions = {
        HttpMethod.POST,
        HttpMethod.PATCH,
        HttpMethod.DELETE,
        HttpMethod.PUT };

    config.exposeIdsFor(Book.class);
    disableHttpMethods(Book.class, config, theUnsupportedActions);

    config.exposeIdsFor(Review.class);
    disableHttpMethods(Review.class, config, theUnsupportedActions);

    config.exposeIdsFor(Message.class);
    disableHttpMethods(Message.class, config, theUnsupportedActions);

    /* Configure CORS Mapping */
    cors.addMapping(config.getBasePath() + "/**")
        .allowedOrigins(theAllowedOrigins);
  }

  private void disableHttpMethods(@SuppressWarnings("rawtypes") Class theClass,
      RepositoryRestConfiguration config,
      HttpMethod[] theUnsupportedActions) {
    config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure(
            (metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }
}