# sample-ng2-mvc
An exploration of a few techniques to create an Angular2 application inside Visual Studio Community (or Pro), leveraging NPM and Gulp.

## requirements
Visual Studio Community edition with Update 3 (14.0.25431.01 or later).
Open acccess to NPM and NuGet to restore packages.

## setup
This project was inspired by Mithun Pattankar at http://www.mithunvp.com/using-angular-2-asp-net-mvc-5-visual-studio/
 * also see the repo: https://github.com/mithunvp/ng2Mvc5Demo

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


