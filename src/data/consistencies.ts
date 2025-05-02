export interface ConsistencyOption {
  id: string;
  value: number;
  label: string;
  consistency: string;
}

export const CONSISTENCIES: ConsistencyOption[] = [
  {
    id: "usg-metal-casting",
    value: 145,
    label: "USG Metal Casting",
    consistency: "145",
  },
  {
    id: "usg-hydroperm",
    value: 100,
    label: "USG Hydroperm®",
    consistency: "100",
  },
  {
    id: "usg-1-pottery",
    value: 70,
    label: "USG #1 Pottery, White Art®",
    consistency: "70",
  },
  {
    id: "usg-1-moulding",
    value: 70,
    label: "USG #1 Moulding",
    consistency: "70",
  },
  {
    id: "usg-1-casting",
    value: 65,
    label: "USG #1 Casting",
    consistency: "65",
  },
  {
    id: "usg-puritan-pottery",
    value: 64,
    label: "USG Puritan® Pottery",
    consistency: "64",
  },
  { id: "usg-duramold", value: 60, label: "USG Duramold®", consistency: "60" },
  { id: "usg-tuf-cal", value: 50, label: "USG Tuf Cal®", consistency: "50" },
  {
    id: "usg-hydrocal-white-b-base",
    value: 45.7,
    label: "USG Hydrocal® White. B - Base",
    consistency: "45.7",
  },
  {
    id: "usg-hydrocal-a-11",
    value: 42,
    label: "USG Hydrocal® A-11",
    consistency: "42",
  },
  {
    id: "usg-hydrocal-b-11",
    value: 44,
    label: "USG Hydrocal® B-11",
    consistency: "44",
  },
  {
    id: "usg-statuary-ceramical-c-base",
    value: 40,
    label: "USG Statuary, Ceramical®, C- Base",
    consistency: "40",
  },
  {
    id: "usg-ultracal-30",
    value: 38,
    label: "USG Ultracal® 30",
    consistency: "33-38",
  },
  {
    id: "usg-densite-k-33",
    value: 36,
    label: "USG Densite® K-33 Plaster",
    consistency: "36",
  },
  {
    id: "usg-hydrostone",
    value: 32,
    label: "USG Hydrostone®",
    consistency: "32",
  },
  {
    id: "usg-tuf-stone",
    value: 32,
    label: "USG Tuf Stone®",
    consistency: "32",
  },
  {
    id: "usg-hydrostone-super-x",
    value: 22,
    label: "USG Hydrostone® Super X",
    consistency: "22",
  },
  {
    id: "usg-drystone",
    value: 20,
    label: "USG Drystone®",
    consistency: "18-20",
  },
  {
    id: "usg-k-55",
    value: 70,
    label: "GP K-55 Pottery Plaster",
    consistency: "70-75",
  },
  {
    id: "gp-k-58",
    value: 70,
    label: "GP K-58 Pottery Plaster",
    consistency: "70",
  },
  {
    id: "gp-k-59",
    value: 68,
    label: "GP K-59 Pottery Plaster",
    consistency: "68-70",
  },
  {
    id: "gp-k-60",
    value: 67,
    label: "GP K-60 Pottery Plaster",
    consistency: "67",
  },
  {
    id: "gp-k-62",
    value: 66,
    label: "GP K-62 Pottery Plaster",
    consistency: "66",
  },
  {
    id: "gp-k-63",
    value: 55,
    label: "GP K-63 Pottery Plaster",
    consistency: "55-57",
  },
  {
    id: "gp-denscal-tl",
    value: 45,
    label: "GP Denscal® TL Plaster",
    consistency: "45",
  },
  {
    id: "gp-densite-k-25",
    value: 40,
    label: "GP Densite® K-25 Plaster",
    consistency: "40",
  },
  {
    id: "gp-densite-k-40",
    value: 36,
    label: "GP Densite® K-40 Plaster, Ram Plaster",
    consistency: "36-40",
  },
  {
    id: "gp-densite-k-13",
    value: 36,
    label: "GP Densite® K-13 Plaster",
    consistency: "36-38",
  },
  {
    id: "gp-densite-k-12",
    value: 36,
    label: "GP Densite® K-12 Low Expansion Plaster",
    consistency: "36-37",
  },
  {
    id: "saint-gobain-formula-fine-casting",
    value: 70,
    label: "Saint-Gobain Formula Fine Casting Plaster",
    consistency: "70",
  },
  {
    id: "saint-gobain-casting-plaster",
    value: 68,
    label: "Saint-Gobain Casting Plaster",
    consistency: "68",
  },
  {
    id: "saint-gobain-formula-pottery-plaster",
    value: 68,
    label: "Saint-Gobain Formula Pottery Plaster",
    consistency: "68",
  },
  {
    id: "saint-gobain-molda-3-normal",
    value: 65,
    label: "Saint-Gobain Molda 3 Normal",
    consistency: "65",
  },
  {
    id: "saint-gobain-formula-newcast-96",
    value: 57,
    label: "Saint-Gobain Formula Newcast 96",
    consistency: "57",
  },
  {
    id: "saint-gobain-formula-keramicast",
    value: 36,
    label: "Saint-Gobain Formula Keramicast",
    consistency: "36",
  },
  {
    id: "saint-gobain-formula-crystacal-r",
    value: 35,
    label: "Saint-Gobain Formula Crystacal R",
    consistency: "35",
  },
];
