import { getLocations, getLocation, Location, Info } from 'rickmortyapi';

class Locations {
  public static async getListLocations({
    page,
  }: {
    page: number;
  }): Promise<Info<Location[]>> {
    const response = await getLocations({ page });
    return response.data;
  }

  public static async getLocation(id: number): Promise<Location> {
    const response = await getLocation(id);
    return response.data;
  }
}

export default Locations;
