export interface CostType {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  enabled: boolean;
  name: string;
  costTypes: CostType[];
}
