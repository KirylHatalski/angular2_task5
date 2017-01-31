interface IDataListItem {
  coord: IAnotherCoords;
  weather: Array<IIcons>;
  main: ITemperatyre;
  name: string;
}

interface IIcons {
  icon: string;
}

interface IAnotherCoords {
  lat: number;
  lon: number;
}

interface ITemperatyre {
  temp: number;
}
