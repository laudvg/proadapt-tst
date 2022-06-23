export interface weatherTypes {
    name: string;
    
    weather: [{
      id: number;
      main: string;
      description: string;
      icon: string;
    }];

    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };

    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
}