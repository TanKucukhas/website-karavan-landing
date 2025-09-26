import { Node, Arc } from './TradeMap.types';

export const NODES: Node[] = [
  { 
    id:'TR-IST', 
    name:'Türkiye', 
    lon:28.9784, 
    lat:41.0082, 
    region:'TR', 
    status:'launching', 
    href:'/regions/turkey',
    topCategories:['Textiles','Machinery','Food'] 
  },
  { 
    id:'UZ-TAS', 
    name:'Uzbekistan', 
    lon:69.2401, 
    lat:41.2995, 
    region:'UZ', 
    status:'launching', 
    href:'/regions/uzbekistan',
    topCategories:['Agriculture','Textiles'] 
  },
  { 
    id:'KZ-ALM', 
    name:'Kazakhstan', 
    lon:76.885, 
    lat:43.2389, 
    region:'KZ', 
    status:'expanding' 
  },
  { 
    id:'AZ-BAK', 
    name:'Azerbaijan', 
    lon:49.8671, 
    lat:40.4093, 
    region:'AZ', 
    status:'expanding' 
  },
  { 
    id:'HU-BUD', 
    name:'Hungary', 
    lon:19.0402, 
    lat:47.4979, 
    region:'HU', 
    status:'expanding' 
  },
];

export const ARCS: Arc[] = [
  { id:'TR-UZ-1', from:'TR-IST', to:'UZ-TAS', strength:2, delayMs:0 },
  { id:'TR-KZ-1', from:'TR-IST', to:'KZ-ALM', strength:1, delayMs:300 },
  { id:'TR-AZ-1', from:'TR-IST', to:'AZ-BAK', strength:1, delayMs:600 },
  { id:'TR-HU-1', from:'TR-IST', to:'HU-BUD', strength:1, delayMs:900 },
  { id:'UZ-KZ-1', from:'UZ-TAS', to:'KZ-ALM', strength:1, delayMs:1200 },
  { id:'KZ-AZ-1', from:'KZ-ALM', to:'AZ-BAK', strength:1, delayMs:1500 },
];
