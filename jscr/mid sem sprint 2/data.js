// ============================================================
// ParkPoint – Parking Spots Data
// This is our fake database. Just an array of objects.
// Each object = one parking spot.
// ============================================================

var parkingSpots = [
  {
    id: "spot_001",
    name: "Bandra West Driveway",
    lat: 19.0544,
    lng: 72.8257,
    amenities: ["EV Charging", "CCTV", "Restroom"],
    basePrice: 150,
    sizeLimit: "SUV",
    hasEV: true,
    hasLargeAccess: true,
    locality: "Bandra West",
    rating: 4.5
  },
  {
    id: "spot_002",
    name: "Andheri East Garage",
    lat: 19.1136,
    lng: 72.8697,
    amenities: ["CCTV", "Covered Parking"],
    basePrice: 80,
    sizeLimit: "Sedan",
    hasEV: false,
    hasLargeAccess: false,
    locality: "Andheri East",
    rating: 4.0
  },
  {
    id: "spot_003",
    name: "Juhu Beach Parking",
    lat: 19.0883,
    lng: 72.8264,
    amenities: ["EV Charging", "24/7 Access", "Restroom"],
    basePrice: 200,
    sizeLimit: "SUV",
    hasEV: true,
    hasLargeAccess: true,
    locality: "Juhu",
    rating: 4.8
  },
  {
    id: "spot_004",
    name: "Powai Lake View Spot",
    lat: 19.1176,
    lng: 72.9060,
    amenities: ["Covered Parking", "CCTV"],
    basePrice: 60,
    sizeLimit: "Hatchback",
    hasEV: false,
    hasLargeAccess: false,
    locality: "Powai",
    rating: 3.8
  },
  {
    id: "spot_005",
    name: "Worli Sea-Link Driveway",
    lat: 19.0176,
    lng: 72.8152,
    amenities: ["EV Charging", "CCTV", "Valet"],
    basePrice: 250,
    sizeLimit: "SUV",
    hasEV: true,
    hasLargeAccess: true,
    locality: "Worli",
    rating: 4.9
  },
  {
    id: "spot_006",
    name: "Dadar TT Compact Spot",
    lat: 19.0178,
    lng: 72.8478,
    amenities: ["24/7 Access", "CCTV"],
    basePrice: 70,
    sizeLimit: "Hatchback",
    hasEV: false,
    hasLargeAccess: false,
    locality: "Dadar",
    rating: 3.5
  },
  {
    id: "spot_007",
    name: "Colaba Heritage Parking",
    lat: 18.9067,
    lng: 72.8147,
    amenities: ["Restroom", "Covered Parking", "24/7 Access"],
    basePrice: 180,
    sizeLimit: "Sedan",
    hasEV: false,
    hasLargeAccess: false,
    locality: "Colaba",
    rating: 4.3
  },
  {
    id: "spot_008",
    name: "Malad West EV Hub",
    lat: 19.1864,
    lng: 72.8484,
    amenities: ["EV Charging", "CCTV", "Covered Parking", "24/7 Access"],
    basePrice: 90,
    sizeLimit: "SUV",
    hasEV: true,
    hasLargeAccess: true,
    locality: "Malad West",
    rating: 4.2
  },
  {
    id: "spot_009",
    name: "Kurla BKC Driveway",
    lat: 19.0660,
    lng: 72.8690,
    amenities: ["CCTV", "Valet", "Restroom"],
    basePrice: 220,
    sizeLimit: "Sedan",
    hasEV: false,
    hasLargeAccess: false,
    locality: "BKC",
    rating: 4.6
  },
  {
    id: "spot_010",
    name: "Goregaon Film City Parking",
    lat: 19.1663,
    lng: 72.8526,
    amenities: ["24/7 Access", "Covered Parking"],
    basePrice: 100,
    sizeLimit: "SUV",
    hasEV: false,
    hasLargeAccess: true,
    locality: "Goregaon",
    rating: 3.9
  }
];
