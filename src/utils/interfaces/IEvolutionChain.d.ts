export interface IChain {
  evolution_details: any[];
  evolves_to: IChain[];
  species: {
    name: string;
    url: string;
  };
  is_baby: boolean;
}

interface IEvolution {
  id: number;
  baby_trigger_item: any;
  chain: IChain;
}
