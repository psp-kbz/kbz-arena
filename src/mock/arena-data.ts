export type Game = "MLBB" | "PUBG";
export type RequestStatus = "Request Sent" | "Approved" | "Paid";

export type Tournament = {
  id: string;
  game: Game;
  title: string;
  badge: "Ongoing" | "Registration Open" | "Full";
  prizePool: string;
  date: string;
};

export type Team = {
  id: string;
  tournamentId: string;
  name: string;
  logo: string;
  slots: string;
  members: string[];
};

export type JoinRequest = {
  id: string;
  tournamentId: string;
  tournamentTitle: string;
  game: Game;
  teamName: string;
  status: RequestStatus;
  appliedAt: string;
};

export type ProfileData = {
  name: string;
  phone: string;
  avatar: string;
  savedGameIds: {
    mlbbIgn: string;
    mlbbServerId: string;
    pubgCharacterId: string;
  };
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  status: "Captain" | "Member";
};

export type MyTeamData = {
  name: string;
  game: Game;
  tournament: string;
  discordChannel: string;
  members: TeamMember[];
};

export const rolesByGame: Record<Game, string[]> = {
  MLBB: ["Jungler", "Roamer", "Mid", "Gold Lane", "EXP Lane"],
  PUBG: ["IGL", "Sniper", "Fragger", "Scout"],
};

export const tournaments: Tournament[] = [
  {
    id: "t1",
    game: "MLBB",
    title: "Mythic Clash Yangon",
    badge: "Registration Open",
    prizePool: "MMK 3,000,000",
    date: "Apr 05, 2026",
  },
  {
    id: "t2",
    game: "MLBB",
    title: "Golden Lane Showdown",
    badge: "Ongoing",
    prizePool: "MMK 2,000,000",
    date: "Apr 09, 2026",
  },
  {
    id: "t3",
    game: "PUBG",
    title: "Arena Survival Cup",
    badge: "Registration Open",
    prizePool: "MMK 4,000,000",
    date: "Apr 12, 2026",
  },
  {
    id: "t4",
    game: "PUBG",
    title: "Military Rush Squad",
    badge: "Full",
    prizePool: "MMK 1,500,000",
    date: "Apr 18, 2026",
  },
];

export const teams: Team[] = [
  {
    id: "m1",
    tournamentId: "t1",
    name: "Skybreakers",
    logo: "SB",
    slots: "3/5 members",
    members: ["AxlBlade", "HawkMid", "RuneTank"],
  },
  {
    id: "m2",
    tournamentId: "t1",
    name: "Abyss Echo",
    logo: "AE",
    slots: "4/5 members",
    members: ["ZedGold", "MinaRoam", "ShiroExp", "VoltMid"],
  },
  {
    id: "p1",
    tournamentId: "t3",
    name: "Rust Wolves",
    logo: "RW",
    slots: "2/4 members",
    members: ["GhostIGL", "NovaFrag"],
  },
  {
    id: "p2",
    tournamentId: "t3",
    name: "Green Havoc",
    logo: "GH",
    slots: "3/4 members",
    members: ["ScoutX", "LongShot", "ZoneKing"],
  },
];

export const joinRequests: JoinRequest[] = [
  {
    id: "r1",
    tournamentId: "t1",
    tournamentTitle: "Mythic Clash Yangon",
    game: "MLBB",
    teamName: "Skybreakers",
    status: "Approved",
    appliedAt: "Mar 27, 2026",
  },
  {
    id: "r2",
    tournamentId: "t3",
    tournamentTitle: "Arena Survival Cup",
    game: "PUBG",
    teamName: "Rust Wolves",
    status: "Request Sent",
    appliedAt: "Mar 28, 2026",
  },
  {
    id: "r3",
    tournamentId: "t2",
    tournamentTitle: "Golden Lane Showdown",
    game: "MLBB",
    teamName: "Abyss Echo",
    status: "Paid",
    appliedAt: "Mar 20, 2026",
  },
];

export const profile: ProfileData = {
  name: "Kyaw Phyo Arena",
  phone: "09 987 654 321",
  avatar: "KP",
  savedGameIds: {
    mlbbIgn: "KyawPhyoX",
    mlbbServerId: "11422",
    pubgCharacterId: "88210019",
  },
};

export const hasAcceptedSquad = joinRequests.some(
  (request) => request.status === "Approved" || request.status === "Paid",
);

export const myTeam: MyTeamData = {
  name: "Skybreakers",
  game: "MLBB" as Game,
  tournament: "Mythic Clash Yangon",
  discordChannel: "https://discord.gg/kbzarena-skybreakers",
  members: [
    { id: "tm1", name: "AxlBlade", role: "Jungler", status: "Captain" },
    { id: "tm2", name: "HawkMid", role: "Mid", status: "Member" },
    { id: "tm3", name: "RuneTank", role: "Roamer", status: "Member" },
    { id: "tm4", name: "KyawPhyoX", role: "Gold Lane", status: "Member" },
  ],
};
