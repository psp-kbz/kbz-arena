import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import MobileLayout from "@/layouts/mobile-layout";
import { hasAcceptedSquad } from "@/mock/arena-data";
import { Splash } from "@/pages/auth/splash";
import Home from "@/pages/home/home";
import MyProfilePage from "@/pages/profile/my-profile";
import RequestHistoryPage from "@/pages/requests/request-history";
import RequestStatusPage from "@/pages/requests/request-status";
import MyTeamPage from "@/pages/team/my-team";
import TeamSelectionPage from "@/pages/tournaments/team-selection";

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<MobileLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/requests" element={<RequestHistoryPage />} />
          <Route
            path="/requests/:requestId/status"
            element={<RequestStatusPage />}
          />
          <Route
            path="/tournaments/:tournamentId/teams"
            element={<TeamSelectionPage />}
          />
          <Route path="/profile" element={<MyProfilePage />} />
          {hasAcceptedSquad && <Route path="/team" element={<MyTeamPage />} />}
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </MemoryRouter>
  );
}
