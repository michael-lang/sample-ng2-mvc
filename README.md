# sample-ng2-mvc
An exploration of a few techniques to create an Angular2 application inside Visual Studio Community (or Pro), leveraging NPM and Gulp.

## Developer Requirements
Visual Studio Community edition with Update 3 (14.0.25431.01 or later).
Open acccess to NPM and NuGet to restore packages.

## Project Scope
This is a basic ride sharing admin application, as a sample showing how to create a similar app with angular.  
This application will start from the admin user side of the interface, with possibly a later addition for a slick end-user search interface.

The admin app has a tabbed interface per area of interest with search on the first tab, and any opened record appearing on another tab.  
Also includes a plus button in the tab row to add a new tab as an item create.

The app consists of planned trips, departure and arrival locations, and people that are driving and have space for others or people that 
need to catch a ride to a destination. This is primarily intended of for one off trips, such as a college student coming home over a weekend.  
Repeat ride-sharing such as for commuting is not the focus; A student may have the same destination each time but on an irregular schedule.

In the end this is meant as a sample application and may be rough around some corners for the sake of keeping the sample less complicated.

## Technology Overview
This structure is relatively simple.  This is a SPA (single page app) design.  A menu at the top of the page uses the `RoutingModule` to switch 
between those logical pages to be shown as current.  The current page content is defined in the main app layout using a `router-outlet`.

The pages use package '@ngrx/store' to keep state as you navigate through the site.  The state management simplifies the project by no longer using 
'bucket brigade' style of passing state down and events up through bindings, and instead components change the stored state and all components
listen to the store via observables to update themselves.  The added side benefit is state is not lost as you navigate between logical pages within
the SPA.

Each logical page component (location, person, trip) has the following:

1.	Detail view/edit component (ie. location-detail.component.ts & .html)
2.	Search component (ie. location-search.component.ts & .html)
	* Search form component (ie. location-search-form.component.ts & .html)
	* Search results component (ie. location-search-results.component.ts & .html)
3. a Service to get by id, search by criteria object (1 or more inputs), and save an item (new or existing)

### What about Microsoft MVC and Razor?
This project's 'app' folder is designed to work as part of any Angular2 project using any editor of choice.  The difference is where in the project the app folder is located.

In Microsoft MVC with Razor you can define views server side bound to your data before download to the client.  You can continue to do this for non-Angular pages in your
project.  This project demonstrates an About and Contact Us page that is not part of the angular project.  The MVC Web API controllers also create a Rest API that can be
used by both this Angular page and by any other consumer of Rest services.

If you wanted to break up your Angular project into more than one SPA application, such as to organize related features together without the overhead of the entire site, then you
can do that as well.  This however would vary your module structure to allow such an architecture.

