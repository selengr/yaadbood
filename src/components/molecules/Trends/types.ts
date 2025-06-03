export type ITrendTab = 'Crypto' | 'Forex' | 'Local';

export interface ICoinData {
    id: number;
    name: string;
    value: string;
    icon: string;
}

export interface ITrendsProps {
     coins: ICoinData[];
     defaultActiveTab?: ITrendTab;
     onTabChange?: (tab: ITrendTab) => void;
}
  