## Resusable base typescript classes using 'generics'

Each of the application pages would have a similar boilerplate code for the component, with the view varying based on the data.  
Since much of the component code is boilerplate, we took advantage of now having generics in typescript to create a base 
class for each of these component types.  Also, since the rest service to support these components is similar, a base class 
was created to handle the 80% + case of these services with extension points for customizations.

Find an overview of generics in typescript here:
https://www.typescriptlang.org/docs/handbook/generics.html

### Not intended for use with NgrxStore projects

These classses were designed with the 'bucket brigade' application architecture where state is passes down and events emitted up.
The main project was initially designed to use these and now uses NgrxStore instead.

### Overview of usage

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
Coordinates the seach form criteria and the results.
It contains the controller logic to call the rest search service and pass the results down to the search results component.
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

