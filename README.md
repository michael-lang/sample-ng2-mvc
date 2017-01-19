# sample-ng2-mvc
An exploration of a few techniques to create an Angular2 application inside Visual Studio Community (or Pro), leveraging NPM and Gulp.

## requirements
Visual Studio Community edition with Update 3 (14.0.25431.01 or later).
Open acccess to NPM and NuGet to restore packages.

## setup
1. Add New Project - Class library (C#) project.  This will hold our fake (or real) server side application layer.
	* use Framework 4.5.2 or later
2. Add New Project - ASP.NET Web Application (.Net Framework C#).  
	* From the template chooser, pick 'MVC', and check the boxes to include folders for 'MVC' and 'Web API'.
	* use Framework 4.5.2 or later (same version for both projects)
