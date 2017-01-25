# sample-ng2-mvc
An exploration of a few techniques to create an Angular2 application inside Visual Studio Community (or Pro), leveraging NPM and Gulp.

## Requirements
Visual Studio Community edition with Update 3 (14.0.25431.01 or later).
Open acccess to NPM and NuGet to restore packages.

## Overview
An application with a tabbed interface per area of interest with search on the first tab, and any opened record appearing on another tab.
Also includes a plus button in the tab row to add a new tab as an item create.

This structure is relatively simple.  Each page component (location, person, trip) has the following:

1.	Detail view/edit component (ie. location-detail.component.ts & .html)
2.	Search component (ie. location-search.component.ts & .html)
	* Search form component (ie. location-search-form.component.ts & .html)
	* Search results component (ie. location-search-results.component.ts & .html)
3. a Service to get by id, search by criteria object (1 or more inputs), and save an item (new or existing)

Each of these components would have a similar boilerplate code for the component, with the view varying based on the data.  
Since much of the component code is boilerplate, we took advantage of now having generics in typescript to create a base 
class for each of these component types.  Also, since the rest service to support these components is similar, a base class 
was created to handle the 80% + case of these services with extension points for customizations.

Find an overview of generics in typescript here:
https://www.typescriptlang.org/docs/handbook/generics.html

The base class generic types you could reuse on other projects include:

1. `GenericService<C, T>`
	* `IGenericSearchService<C, T>`
		- search(criteria: C): T[] function
	* `IGenericItemService<T>`
		- get(id: string) function
		- save(item: T): T function
2. `GenericDetailComponent<T, S extends IGenericItemService<T>>`
This is a base class for any general view of a single item.  It contains the save() function usable from your derived 
component view.  ngOnInit() and save() calls the injected S type service for the Http operation.
3. `GenericSearchFormComponent<C>`
Only contains emitters for search and criteria reset
4. `GenericSearchResultsComponent<T>`
Only responsible for receiving the results data via a binding and emitting when an item is clicked.
5. `GenericSearchComponent<C, T>`
contains the controller logic to call the rest search service and pass the results down to the search results component.
It also subscribes to a result click and passes the emit onto a parent component to decide what to do with it (such as open it in a new tab).
6. `TabsetGenericPageComponent<T>`
All the coordination required to have a tabbed interface 
	* search as a static tab
	* each result clicked on opens in a new tab
	* a button to add a new tab for an item create
	* if duplicate result is clicked, the current open tab for it activates (no duplicate tabs for the same item)

Most of the work to derive from these base components is in laying out your view.  In your layout you can use any pipe you need for data formatting,
general layout decisions, as well as deciding any sub views that open by adding additional event bindings not in the base classes.

Your typescript can simple be a class definition that extends one of the generic classes above, or you can add additional features to your View
that is not built into the base class.  The generic classes are all loosely coupled such that you could pick and choose which ones you want to use,
versus creating something more complex.



## How to recreate a similar project
This project basic setup was inspired by Mithun Pattankar at http://www.mithunvp.com/using-angular-2-asp-net-mvc-5-visual-studio/
 * also see the repo: https://github.com/mithunvp/ng2Mvc5Demo
The C# code structure was influenced by other commercial projects I created using https://github.com/michael-lang/candor-common

His work helped me get a angular2 project started with NPM and Visual Studio.  This sample will build from his work into creating useful Application components.
The following instructions document the steps taken to create this project.

### Step 1 - Create the project
1. Add New Project - Class library (C#) project.  This will hold our fake (or real) server side application layer.
	* use Framework 4.5.2 or later
2. Add New Project - ASP.NET Web Application (.Net Framework C#).  
	* From the template chooser, pick 'MVC', and check the boxes to include folders for 'MVC' and 'Web API'.
	* use Framework 4.5.2 or later (same version for both projects)
3. Run project and ensure it works.  If not your tooling setup is incorrect.

### Step 2 - Setup project dependencies
1. Add New item (web project), template 'npm Configuration file', named 'package.json'
	* this will create a folder called 'node_modules'in your web project, but it won't be visible in the project unless you press the "show all files" icon in solution explorer.
	If this folder does not get created, then Update 3 is not properly applied to visual studio.
2. Open the package.json and add needed dependencies
	* devDependencies needed for building sass and typescript (build the project to restore these packages)
	* dependencies for angular2 and systemjs (systemjs bootstraps the project into the page)
	* With VS Update 3 installed, you don't need to ever run a command prompt to "npm install" like some workthrus mention, it happens automatically as you add to the package.json file.
3. Add a new 'app' folder at the root of the website project to hold all the Angular2 typescript, sass, and html templates.
4. Configure typescript to transpile the .ts files into javascript (ES5)
	* Add new item under the new 'app' folder, use template 'Typescript JSON Configuration file'.  Accept the default name 'tsconfig.json'
	* Open the tsconfig.json and edit the compile options
	* Create a dist folder to match the 'outDir' setting in tsconfig
	* Create a typings.json file at the root of the webproject to ensure that TypeScript understands all Angular 2 modules in respect to ES5 standard.
	* open a CMD prompt, cd to the web project folder and enter 'typings install'
5. Setup typescript build trigger and sass compilation to css using Gulp
	* Add a new file to the root of the web project, using template 'Gulp Configuration file' and keep the default name gulpfile.js
	* copy in the contents of the sample into gulpfile.js.
	* open window 'Task Runner Explorer' (TRE) and press the refresh button to see all the new tasks.  
		The first comment in the sample gulpfile.js will show some of those tasks linked to built in visual studio build steps,
		so to run the site all you do is press the usual green run button in visual studio and the build process will run the necassary gulp tasks to run your project.
	/// <binding BeforeBuild='dist-libs' AfterBuild='build' Clean='clean-libs' />
6. Build and run your web project (must be the startup project - shown in bold, then press run in the toolbar).
	You will see the clean-libs task run in TRE, then 'dist-libs' before the projects build, and then 'build' after the class library builds.

## Step 3 - Create your back-end model and API
This step is not necassarily part of the angular project work, and may be supplied by another team.  
Creation of C# code is beyondd the scope of explanation here, however a contrived example is included.
Even if another team is working on the back-end, you may need to create an interim front end mock for your anticipated data.

1. Create back-end model classes (or temporary mocks)
2. Create a Web API to interact with the data using typical C# MVC.Net techniques.
3. Create front end typescript classes to match the API layer model.
	* The Typescript front end version of the classes is the responsibility of the front-end team.
	* Structure your model types in folders based on the screen they will be used within.
	* refer to the Angular2 style guide for organizational questions.  https://angular.io/styleguide

## Step 4 - Create the Angular2 barebones app
1. Set the MVC backend to load your app route(s) into a cshtml page using systemjs to load your App.
	* HomeController.cs - add a route with the desired path, return a View.
	* In the view file, use systemjs to load the AppModule shown below.
2. The angular application code needs a way to bootstrap into the page.  Create an AppModule to define the base Application
	* also requires a top level AppComponent defining some markup and possibly application logic
	* this example creates additional 'chrome' named AppChromeModule, containing a header with navigation and a footer.
3. Create a module and component pair for each 'page' you want in the angular app.  (ex.  TripModule and TripComponent)
	* refer to the Angular2 style guide for naming and folder organization guidelines.
	* hold off on adding complexity to any page modules until the barebones outline runs and navigates between 'pages' (modules) properly.  
	This will help you debug getting the project setup.
4.  Add navigation using the angular RouterModule.
	* Define a route for each top level page with a module. (ie. TripRoutingModule)
	* Import your routing module into the page module. (ie. TripModule)
	* Then we gather these routes in a service (AppRouterMenuService) and build a menu structure then used by the AppHeaderComponent.
5. build and run the project and you should see menu items for your routed modules, with one of the pages defined as the default route and initially visible.
	* If you have problems, check versions of all packages to match this project exactly.  Only upgrade dependencies after you have a basic working app.
	* Also check if the typescript is set to build automatically, spot check your most recent changed ts files by looking at the compiled js files for the change.

## Step 5 - Create a Shared module for common components used by multiple modules
1. create a new folder 'app-shared' under the 'app' folder
2. Create a new module called AppSharedModule (file name 'app-shared.module.ts')
3. Add this module to the 'imports' list of the first page module that will use something from the shared module
	* Do not add the shared module as an import to the app module
4. Create a shared component under app-shared.  ie. tabset
5. use the shared component in the markup of the page component
6. build and test.