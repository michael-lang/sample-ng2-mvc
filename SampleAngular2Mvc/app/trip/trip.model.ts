export class Trip {
    public tripId: string;
    public departureLocationId: string;
    public arrivalLocationId: string;
    public driverId: string;
    public seatCount: number;
    public departDate: string; //date
    public includesReturn: boolean;
    public returnDate: string; //date
}

export class TripCriteria {
    public nearDepartureLocationId: string;
    public nearArrivalLocationId: string;
    public nearMiles: number;
    public driverId: string;
    public departureDate: string; //date
    public returnDate: string; //date
}