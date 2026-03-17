export type CropEventType =
  | "播种"
  | "移栽"
  | "施肥"
  | "灌溉"
  | "除草"
  | "病虫害"
  | "采收";

export type CropEvent = {
  id: string;
  type: CropEventType;
  date: string; // ISO date
  note?: string;
  image?: string; // public path (photo uploaded with this event)
};

export type CropRecord = {
  id: string;
  name: string;
  variety?: string;
  plot: string;
  seasonYear: number;
  coverImage: string; // public path
  startedAt: string; // ISO date
  status: "进行中" | "已完成" | "暂停";
  tags: string[];
  events: CropEvent[];
  summary: string;
};

export const cropRecords: CropRecord[] = [
  {
    id: "crop-2026-tomato-a",
    name: "番茄",
    variety: "樱桃番茄",
    plot: "自留地 A-03",
    seasonYear: 2026,
    coverImage: "/the_farm.jpg",
    startedAt: "2026-03-18",
    status: "进行中",
    tags: ["露地", "堆肥", "滴灌"],
    summary: "以厨余堆肥改良土壤，观察花期与授粉昆虫活动。",
    events: [
      {
        id: "e1",
        type: "播种",
        date: "2026-03-18",
        note: "育苗盘 72 孔",
        image: "/the_farm.jpg",
      },
      {
        id: "e2",
        type: "移栽",
        date: "2026-04-20",
        note: "定植到 A-03",
        image: "/the_farm.jpg",
      },
      {
        id: "e3",
        type: "施肥",
        date: "2026-05-05",
        note: "堆肥+少量有机肥",
        image: "/the_farm.jpg",
      },
      {
        id: "e4",
        type: "病虫害",
        date: "2026-06-09",
        note: "蚜虫，喷洒肥皂水",
        image: "/the_farm.jpg",
      },
    ],
  },
  {
    id: "crop-2026-corn-b",
    name: "玉米",
    plot: "自留地 B-01",
    seasonYear: 2026,
    coverImage: "/the_farm.jpg",
    startedAt: "2026-04-08",
    status: "进行中",
    tags: ["混作", "生态篱"],
    summary: "与豆科混作，记录风害与土壤水分。",
    events: [
      { id: "e1", type: "播种", date: "2026-04-08", image: "/the_farm.jpg" },
      { id: "e2", type: "除草", date: "2026-05-02", image: "/the_farm.jpg" },
      {
        id: "e3",
        type: "灌溉",
        date: "2026-06-01",
        note: "连日高温",
        image: "/the_farm.jpg",
      },
    ],
  },
  {
    id: "crop-2025-sweetpotato-c",
    name: "红薯",
    plot: "自留地 C-02",
    seasonYear: 2025,
    coverImage: "/the_farm.jpg",
    startedAt: "2025-06-10",
    status: "已完成",
    tags: ["覆盖物", "低干预"],
    summary: "以覆盖物抑草，观察土壤动物与分解速度。",
    events: [
      { id: "e1", type: "移栽", date: "2025-06-10", image: "/the_farm.jpg" },
      {
        id: "e2",
        type: "除草",
        date: "2025-07-02",
        note: "局部补草",
        image: "/the_farm.jpg",
      },
      {
        id: "e3",
        type: "采收",
        date: "2025-10-18",
        note: "产量 18kg",
        image: "/the_farm.jpg",
      },
    ],
  },
];

