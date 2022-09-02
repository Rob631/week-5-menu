class Passengers{
    constructor(name, zone){
        this.name = name;
        this.zone = zone;
    }

    describe(){
        return `$(this.name) is in $(this.zone)`;
     }
}

class Flights{
    constructor(number){
        this.number = number;
        this.passengers = [];
    }

    addPassengers(passengers) {
        if (passengers instanceof Passengers){
            this.passengers.push(passengers);
        } else {
            throw new Error(`You can only add and instance of Passegers. Arugment is not a passenger: $(passenger)`);
        }
    }

    describe() {
        return `${this.name} has ${this.passengers.length} passengers.`;
    }
}

class Menu{
    constructor(){
        this.flights = [];
        this.selectedFlights = null;
    }

    start(){
        let selection = this.showMainMenuOption();
       
        while(selection != 0){
            switch(selection){
                case `1`:
                    this.createFlights();
                    break;
                case `2`:
                    this.viewFlights();
                    break;
                case `3`:
                    this.deleteFlihgts();
                    break;
                case `4`: 
                    this.displayFlights();
                    break;
                default:
                    selection = 0;

            }
            selection = this.showMainMenuOption();
        }

        alert(`Have a safe flight!`);
    }
    showMainMenuOption(){
        return prompt(`
        0) exit
        1) create new flight
        2) view flight
        3) delete flight
        4) display all flights
        `);
    }
    
    showFlightMenuOptions(flightInfo){
        return prompt(`
        0) back
        1) create passanger
        2) delete passanger
        -----------------------
        ${flightInfo}

        `);

    }

    displayFlights(){
        let flightsString = " ";
        for( let i = 0; i < this.flights.length; i++){
            flightsString += i + ') ' + this.flights[i].number + '\n';
        }
        alert(flightsString);
    }

    createFlights(){
        let number = prompt(`Enter a number for a new flight:`)
        this.flights.push(new Flights(number));
    }

    viewFlights(){
      let index = prompt(`Enter the index of the team you wish to view:`);
      if( index > -1 && index < this.flights.length) {
        this.selectedFlights = this.flights[index];
        let description = "Flight Number: " + this.selectedFlights.number + '\n';
        
        for(let i = 0; i < this.selectedFlights.passengers.length; i++){
            description += i + ') ' + this.selectedFlights.passengers[i].name 
            +  ' - ' + this.selectedFlights.passengers[i].zone  +  '\n';
        }
        
        let selection = this.showFlightMenuOptions(description);
        switch(selection){
            case `1`:
                this.createPassengers();
                break;
            case `2`:
                this.deletePassengers();
        }
      }  
    }

    deleteFlihgts(){
        let index = prompt(`Enter the index of the flight you wish to delete:`);
        if(index > -1 && index < this.flights.length){
            this.flights.splice(index, 1);
        }
    }

    createPassengers(){
        let name = prompt(`Enter the passengers name:`);
        let zone = prompt(`Enter the passangers zone:`);
        this.selectedFlights.passengers.push(new Passengers(name, zone));
    }

    deletePassengers(){
        let index = prompt(`Enter the name of the Passenger you wish to remove:`);
        if (index > -1 && index < this.selectedFlights.passengers.length){
            this.selectedFlights.passengers.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();