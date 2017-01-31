interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IPositionNavigator {
  coords: ICoordinates;
}

interface IWindow extends Window {
  googleResponse: Function;
}

interface ICoord {
  lat: number;
  lng: number;
}

interface IPositionCheck {
  status: string;
  results: Array<IResult>;
}

interface IResult {
  address_components: Array<IAddressComponents>;
  formatted_address: string;
  geometry: IGeometry;
  place_id: string;
  types: Array<string>;
}

interface IGeometry {
  bounds: IDirections;
  location: ICoord;
  location_type: string;
  viewport: IDirections;
}

interface IAddressComponents {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface IDirections {
  northeast: ICoord;
  southwest: ICoord;
}
