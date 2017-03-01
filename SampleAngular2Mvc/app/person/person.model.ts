export class Person {
    public PersonId: string;
    public FirstName: string;
    public LastName: string;
    public ContactPhoneNumber: string;
}

export class PersonHolder {
    public Person: Person;
    public PlaceholderId: string;
    public isNew: boolean;
}

export class PersonCriteria {
    public term?: string;
}