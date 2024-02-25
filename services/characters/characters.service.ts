import { getCharacters, getCharacter, Character, Info } from 'rickmortyapi';

class Characters {
  public static async getListCharacters({
    page,
  }: {
    page: number;
  }): Promise<Info<Character[]>> {
    const response = await getCharacters({ page });
    return response.data;
  }

  public static async getCharacter(id: number): Promise<Character> {
    const response = await getCharacter(id);
    return response.data;
  }
}

export default Characters;
