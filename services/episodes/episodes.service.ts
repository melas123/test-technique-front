import { getEpisodes, getEpisode, Episode, Info } from 'rickmortyapi';

class Episodes {
  public static async getListEpisodes({
    page,
  }: {
    page: number;
  }): Promise<Info<Episode[]>> {
    const response = await getEpisodes({ page });
    return response.data;
  }

  public static async getLocation(id: number): Promise<Episode> {
    const response = await getEpisode(id);
    return response.data;
  }
}

export default Episodes;
